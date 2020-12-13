import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { endpoints } from '@configs/endpoints';
import { csvJSON } from '@helpers/csvMutator';
import { isMonthMatch } from '@helpers/dateChecker';

import _ from 'lodash';
import moment from 'moment';
export default () => {
    const [is_loading, set_is_loading] = useState(false);
    const history = useHistory();
    
    const [allProgress, set_allProgress] = useState([]);
    const [emergencyByDepartment, set_emergencyByDepartment] = useState({});
    const [emergencyMonthly, set_emergencyMonthly] = useState({});
    const [totalChanges, set_totalChanges] = useState([]);
    const [totalChangesFiltered, set_totalChangesFiltered] = useState({});
    const [totalChanges_groupby, set_totalChanges_groupby] = useState('Month');
    const [data, set_data] = useState({});
    const [data_headers, set_data_headers] = useState([]);

    // Use Effect For data Cleaning (removing problematic date, rows, etc..)
    useEffect(() => {
        const cleanedChanges  = _.filter(data,eachchange => {
            return moment(eachchange['Planned Start'])._isValid;
        }).map(cData => ({...cData,date:moment(cData['Planned Start'], 'MM/DD/YY')}));
        set_totalChanges(cleanedChanges);
    }, [data]);
    // END Use Effect For data Cleaning (removing problematic date, rows, etc..)

    // Use Effect For Data Constructing
    useEffect(() => {
        // Setup Emergency by Dept
        const emergencyTRUE = _.filter(totalChanges, (n)=> n.Emergency === 'TRUE')
        const emDeptColl = _.groupBy(emergencyTRUE,'Department')
        const emByDept = _.map(emDeptColl,(eachDept,idx)=>({name: idx,value:eachDept?.length}))
        set_emergencyByDepartment({
            labels: ['Name', 'Total'],
            data: emByDept,
        })
        // END Setup Emergency by Dept

        // Setup Monthly Emergency 
        const MonthlyEm = [...Array(12)].map((emArr,idx)=>({x: new Date(`${moment().year()}-${idx+1}`), y: 0}))
        emergencyTRUE.forEach(n => {
            MonthlyEm[parseInt(n.date.format('M'))-1].y = MonthlyEm[parseInt(n.date.format('M'))-1].y? 
            MonthlyEm[parseInt(n.date.format('M'))-1].y+ 1 : 1;
            console.log('MonthlyEm',MonthlyEm)
        });
        set_emergencyMonthly({
            labels: moment.months(),
            data: MonthlyEm,
        })
        // END Setup Monthly Emergency 

        // Setup Total Changes
        switch (totalChanges_groupby) {
            case 'Day':
                const groupDayData = {};
                const totalDays = moment(`${moment().year()}-${moment().month()+1}`).daysInMonth();
                for (let eachday = 1; eachday < totalDays+1; eachday++) {
                    const dataThisYearAndMonthAndDay = _.filter(totalChanges, (n)=>(
                        eachday === parseInt(n.date.format('DD') )
                        && moment().year() === parseInt(n.date.format('YYYY')) 
                        && moment().month()+1 === parseInt(n.date.format('M'))));
                    groupDayData[eachday] = dataThisYearAndMonthAndDay.length;
                }
                set_totalChangesFiltered({labels: Object.keys(groupDayData), data: Object.values(groupDayData)});
                break;
            case 'Month':
                const groupMonthData = {};
                moment.months().forEach((eachmonth,monthInNum) => {
                    const dataThisYearAndMonth = _.filter(totalChanges, (n)=>isMonthMatch(monthInNum+1,n.date));
                    groupMonthData[eachmonth] = dataThisYearAndMonth.length;
                })
                set_totalChangesFiltered({labels: Object.keys(groupMonthData), data: Object.values(groupMonthData)});
                break;
        }
        // END Setup Total Changes

        // Setup Progress Card (NOT COMPLETE YET)
        set_allProgress([
            {name: 'Total Changes', value: 44},
            {name: 'Emergency/Urgent', value: 30},
            {name: 'Failed Fallback', value: 70},
            {name: 'Non Compliant', value: 50},
        ]);
        // END Setup Progress Card
    }, [totalChanges_groupby, totalChanges]);
    // END Use Effect For Data Constructing

    //   this is use effect for initialization (run once) (change your data source here) (change the t= value just incase it cache)
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
    },[])
    //   END this is use effect for initialization (run once)

    return {
        data,
        data_headers,
        totalChanges,
        totalChangesFiltered,
        totalChanges_groupby,
        set_totalChanges_groupby,
        emergencyByDepartment,
        emergencyMonthly,
        allProgress,
    };
};
