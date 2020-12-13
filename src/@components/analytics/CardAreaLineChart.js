import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody} from '@coreui/react';
import CanvasJSReact from '@lib/canvasjs/canvasjs.react';

export default () => {
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        animationEnabled: true,
        theme: "light2",
        axisX:{
            valueFormatString: "MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Changes",
            // valueFormatString: "€##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: (e) => (CanvasJS.formatNumber(e.value, "##0.00"))
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "DD MMM",
            yValueFormatString: "##0.00",
            dataPoints: [
              { x: new Date("2018-01-01"), y: 85.3},
              { x: new Date("2018-02-02"), y: 83.97},
              { x: new Date("2018-03-05"), y: 83.49},
              { x: new Date("2018-04-06"), y: 84.16},
              { x: new Date("2018-05-07"), y: 84.86},
              { x: new Date("2018-06-08"), y: 84.97},
              { x: new Date("2018-07-09"), y: 85.13},
              { x: new Date("2018-08-12"), y: 85.71},
              { x: new Date("2018-09-13"), y: 84.63},
              { x: new Date("2018-10-14"), y: 84.17},
              { x: new Date("2018-11-15"), y: 85.12},
              { x: new Date("2018-12-15"), y: 85.12},
            ]
        }]
    };
    return (
        <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader>
                Total Changes
              </CCardHeader>
              <CCardBody>
                <CanvasJSChart options = {options} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
      );
  };

  