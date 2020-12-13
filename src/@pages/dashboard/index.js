import React from 'react';
import { CContainer, CRow, CCol} from '@coreui/react';
import CardAreaLineChart from '@components/analytics/CardAreaLineChart';
import CardAreaLineChartCoreUI from '@components/analytics/CardAreaLineChartCoreUI';
import CardTable from '@components/analytics/CardTable';
import CardProgress from '@components/analytics/CardProgress';

import CardItemValueList from '@components/analytics/CardItemValueList';

import useHook from './hook';
import CardBarChartCoreUI from '@components/analytics/CardBarChartCoreUI';

export default () => {
  const h = useHook();
  return (
    <CContainer>
    <CRow>
      <CCol lg="7" className="py-3">
        <CardAreaLineChartCoreUI h={h} datakey={'totalChangesFiltered'} title={'Total Changes'}/>
      </CCol>
      <CCol md="5" className="py-3">
        <CardProgress h={h}  title={'Past Year Changes'}/>
      </CCol>
    </CRow>
    <CRow>
      <CCol lg="12" className="py-3">
        <CardTable h={h}  title={'Latest Changes'}/>
      </CCol>
    </CRow>
    <CRow>
      <CCol lg="5" className="py-3">
        <CardItemValueList h={h} datakey={'emergencyByDepartment'} title={'Emergency By Department'}/>
      </CCol>
      <CCol md="7" className="py-3">
        <CardBarChartCoreUI h={h} datakey={'emergencyMonthly'} title={'Monthly Emergency'}/>
      </CCol>
    </CRow>
  </CContainer>
  );
};
