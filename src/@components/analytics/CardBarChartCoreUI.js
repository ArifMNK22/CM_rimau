import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody} from '@coreui/react';
import CanvasJSReact from '@lib/canvasjs/canvasjs.react';

export default (props) => {
    const { h, datakey, title } = props;
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        animationEnabled: true,
        theme: "light2",
        height: 120,
        // axisX:{
        //     valueFormatString: "MMM",
        //     crosshair: {
        //         enabled: true,
        //         snapToDataPoint: true
        //     }
        // },
        // axisY: {
        //     title: "Changes",
        //     // valueFormatString: "€##0.00",
        //     crosshair: {
        //         enabled: true,
        //         snapToDataPoint: true,
        //         labelFormatter: (e) => (CanvasJS.formatNumber(e.value, "##0.00"))
        //     }
        // },
        data: [{				
            type: "column",
            xValueFormatString: "MMM",
            yValueFormatString: "##0.00%",
            dataPoints: h[`${datakey}`].data
        }]
    };
    return (
        <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader>
                {title}
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

  