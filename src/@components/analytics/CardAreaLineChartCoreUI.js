import React, { useEffect } from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CButtonGroup} from '@coreui/react';
import CanvasJSReact from '@lib/canvasjs/canvasjs.react';
import { CChart } from '@coreui/react-chartjs';
import LineChart from './coreUi/LineChart';
import moment from 'moment';
import _ from 'lodash';
import { getStyle, hexToRgba } from '@coreui/utils';

const brandSuccess = getStyle('success') || '#4dbd74';
const brandInfo = getStyle('info') || '#20a8d8';
const brandDanger = getStyle('danger') || '#f86c6b';
export default (props) => {
    const { h, datakey, title } = props;
  const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    let dataPoints = [];
    switch (h.totalChanges_groupby) {
      case 'Day':
        console.log(h[`${datakey}`].data)
        dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(2016, moment().month(),idx), y: xcp }));
        break;
        case 'Month':
          dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(2016, idx), y: xcp }));
          break;
    
      default:
        dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(2016, idx), y: xcp }));
        break;
    }
    const options = {
        animationEnabled: true,
        theme: "light2",
        height: 200,
        // axisX: {
        //   valueFormatString: "MMM"
        // },
        // axisY: {
        //   prefix: "$",
        //   labelFormatter: addSymbols
        // },
        data: [{
          type: "area",
          name: "Date",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints,
          // [
          //   { x: new Date(2016, 0), y: 5000 },
          //   { x: new Date(2016, 1), y: 7000 },
          //   { x: new Date(2016, 2), y: 6000},
          //   { x: new Date(2016, 3), y: 30000 },
          //   { x: new Date(2016, 4), y: 20000 },
          //   { x: new Date(2016, 5), y: 15000 },
          //   { x: new Date(2016, 6), y: 13000 },
          //   { x: new Date(2016, 7), y: 20000 },
          //   { x: new Date(2016, 8), y: 15000 },
          //   { x: new Date(2016, 9), y:  10000},
          //   { x: new Date(2016, 10), y: 19000 },
          //   { x: new Date(2016, 11), y: 22000 }
          // ]
        }]
    };
    console.log('h.totalChangesFiltered',h.totalChangesFiltered)
    return (
        <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader>
              <CButtonGroup className="float-left ml-3">
                  {title}
                </CButtonGroup>
                <CButtonGroup className="float-right mr-3">
                    {
                    ['Day', 'Month', 'Year'].map(value => (
                        <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === h.totalChanges_groupby}
                        onClick={()=>h.set_totalChanges_groupby(value)}
                        >
                        {value}
                        </CButton>
                    ))
                    }
                </CButtonGroup>
              </CCardHeader>
              <CCardBody>
                {/* <LineChart 
                    style={{height: '300px', marginTop: '40px'}} 
                    datasets={datasets}
                    labels={h[`${datakey}`].labels}
                /> */}
                 {/* <CChart type="line" datasets={line.datasets} options={options} labels={h[`${datakey}`].labels} /> */}
                 <CanvasJSChart options = {options} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
      );
  };
