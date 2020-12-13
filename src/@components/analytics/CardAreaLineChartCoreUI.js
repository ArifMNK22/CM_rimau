import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CButtonGroup} from '@coreui/react';
import CanvasJSReact from '@lib/canvasjs/canvasjs.react';
import moment from 'moment';
import _ from 'lodash';

export default (props) => {
  const { h, datakey, title } = props;
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  let dataPoints = [];
  switch (h.totalChanges_groupby) {
    case 'Day':
      dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(moment().year(), moment().month(),idx), y: xcp }));
      break;
    case 'Month':
      dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(moment().year(), idx), y: xcp }));
      break;
    case 'Year':
      // add logic here
      break;
  
    default:
      dataPoints = h[`${datakey}`].data?.map((xcp,idx) => ({ x: new Date(moment().year(), idx), y: xcp }));
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
      }]
  };
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
                 <CanvasJSChart options = {options} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
      );
  };
