import React from 'react';
import { CCollapse, CDataTable, CBadge, CCardBody, CButton} from '@coreui/react';
import Card from './Card';

export default (props) => {
  const { h, title } = props;
  const usersData = h.totalChanges;
  const [details, setDetails] = React.useState([])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'Change ID', _style: { width: '25%'} },

    { key: 'RFC No', _style: { width: '10%'} },
    { key: 'Opened By', _style: { width: '15%'} },
    { key: 'Planned Start', _style: { width: '10%'} },
    { key: 'Planned End', _style: { width: '10%'} },
    { key: 'Assignee', _style: { width: '10%'} },
    { key: 'status', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const Table = () => (
    <CDataTable
      items={usersData}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        'status':
          (item)=>(
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
        'show_details':
          (item, index)=>{
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{toggleDetails(index)}}
                >
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
              )
          },
        'details':
            (item, index)=>(
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  {Object.keys(item).map((keys,idx)=>
                  (<p key={idx} className="text-muted">{keys}: {(typeof item[keys] === 'object')? JSON.stringify(item[keys]): item[keys]}</p>)
                  )}
                </CCardBody>
              </CCollapse>
            )
      }}
    />
  )
  return <Card Header={title} Body={Table} />;
  };

  