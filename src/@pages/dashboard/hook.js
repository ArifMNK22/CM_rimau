import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { endpoints } from '@configs/endpoints';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';

export default () => {
    const [is_loading, set_is_loading] = useState(false);
    const history = useHistory();
    const [emergencyByDepartment, set_emergencyByDepartment] = useState({});
    const [emergencyMonthly, set_emergencyMonthly] = useState({});
    const [totalChanges, set_totalChanges] = useState([]);
    const [totalChangesFiltered, set_totalChangesFiltered] = useState({});
    const [totalChanges_groupby, set_totalChanges_groupby] = useState('Month');
    const [data, set_data] = useState({});
    const [data_headers, set_data_headers] = useState([]);

    useEffect(() => {
        const cleanedChanges  = _.filter(data,eachchange => {
            return moment(eachchange['Planned Start'])._isValid;
        }).map(cData => ({...cData,date:moment(cData['Planned Start'], 'MM/DD/YY')}));
        set_totalChanges(cleanedChanges);
    }, [data]);
    useEffect(() => {
        console.log('vtotalChanges',totalChanges)
        switch (totalChanges_groupby) {
            case 'Day':
                const groupDayData = {};
                const totalDays = moment(`${moment().year()}-${moment().month()+1}`).daysInMonth();
                console.log('vvday',totalChanges)
                for (let eachday = 1; eachday < totalDays+1; eachday++) {
                    const dataThisYearAndMonthAndDay = _.filter(totalChanges, (n)=>{
                        console.log(eachday,n.date.format('DD'),)
                        return (
                        eachday === parseInt(n.date.format('DD') )
                        && moment().year() === parseInt(n.date.format('YYYY')) 
                        && moment().month()+1 === parseInt(n.date.format('M')))});
                    groupDayData[eachday] = dataThisYearAndMonthAndDay.length;
                }
                console.log('vv',{labels: Object.keys(groupDayData), data: Object.values(groupDayData)})
                set_totalChangesFiltered({labels: Object.keys(groupDayData), data: Object.values(groupDayData)});
                break;
            case 'Month':
                const groupMonthData = {};
                moment.months().forEach((eachmonth,monthInNum) => {
                    const dataThisYearAndMonth = _.filter(totalChanges, (n)=>(
                        monthInNum+1 === parseInt(n.date.format('M')) 
                    && moment().year() === parseInt(n.date.format('YYYY'))));
                    groupMonthData[eachmonth] = dataThisYearAndMonth.length;
                })
                set_totalChangesFiltered({labels: Object.keys(groupMonthData), data: Object.values(groupMonthData)});
                break;
        }
    }, [totalChanges_groupby, totalChanges]);
  const csvJSON = (csv) => {
    const lines = csv.split('\n')
    const rows = []
    const headers = lines[0].split(',')
    
    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        rows.push(obj)
    }
    return {headers,rows}
  }
  useEffect(()=>{
    const endpoint =  endpoints.getStaticData();
    console.log('endpoint',endpoint[1])
    fetch(`${endpoint[1]}Monthly Copy - Raw.csv?t=asdasdasad`, { method: endpoint[0]})
    .then(response => response.text())
    .then(result => {
        const {headers, rows} = csvJSON(result)
        set_data_headers(headers);
        set_data(rows);
    })
    .catch(error => console.log('error', error));
    set_emergencyByDepartment({
        labels: ['Name', 'Total'],
        data: [
            {name: 'Core Banking', value: 5752},
            {name: 'Digital Banking', value: 6550},
            {name: 'IT Security', value: 7250},
            {name: 'Group Technology', value: 4320},
        ],
    })
    set_emergencyMonthly({
        labels: moment.months(),
        data: [
            { x: new Date("2018-01"), y: 85.3},
            { x: new Date("2018-02"), y: 83.97},
            { x: new Date("2018-03"), y: 83.49},
            { x: new Date("2018-04"), y: 84.16},
            { x: new Date("2018-05"), y: 84.86},
            { x: new Date("2018-06"), y: 84.97},
            { x: new Date("2018-07"), y: 85.13},
            { x: new Date("2018-08"), y: 85.71},
            { x: new Date("2018-09"), y: 84.63},
            { x: new Date("2018-10"), y: 84.17},
            { x: new Date("2018-11"), y: 85.12},
            { x: new Date("2018-12"), y: 85.12},
          ],
    })
  },[])
  console.log('totalChangesFiltered',totalChangesFiltered)
  return {
    data,
    data_headers,
    totalChanges,
    totalChangesFiltered,
    totalChanges_groupby,
    set_totalChanges_groupby,
    emergencyByDepartment,
    emergencyMonthly,
  };
};
