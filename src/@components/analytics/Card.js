import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';

export default (props) => {
    const { Header, Body } = props;
  return (
    <CContainer fluid>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            {Header}
          </CCardHeader>
          <CCardBody>
            <Body />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>
  )
  };

  