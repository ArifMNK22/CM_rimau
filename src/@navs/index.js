import React from 'react';
import { useHistory } from 'react-router-dom';
import { CNavbar,CToggler,CNavbarBrand,CCollapse,CNavbarNav,CNavLink,CButton,CForm,CInput,CDropdownToggle,CDropdownItem, CDropdownMenu,CDropdown  } from '@coreui/react';
// import useHook from './hook';

export default (props) => {
//   const h = useHook();
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();
  return (
    <div>
      <CNavbar expandable="sm" color="rgb(16, 42, 68)" >
        <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
        <CNavbarBrand>
            <img src="/logo192.png" height="50"/>
        </CNavbarBrand>
        <CCollapse show={isOpen} navbar>
          <CNavbarNav>
            <CNavLink onClick={()=>history.push('/dashboard')}>Dashboard</CNavLink>
          </CNavbarNav>
          <CNavbarNav className="ml-auto">
            <CForm inline>
              <CInput
                className="mr-sm-2"
                placeholder="Search"
                size="sm"
              />
              <CButton color="light" className="my-2 my-sm-0" type="submit">Search</CButton>
            </CForm>
            <CDropdown
              inNav
            >
              <CDropdownToggle color="primary">
                Lang
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>EN</CDropdownItem>
                <CDropdownItem>ES</CDropdownItem>
                <CDropdownItem>RU</CDropdownItem>
                <CDropdownItem>FA</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown
              inNav
            >
              <CDropdownToggle color="primary">
                User
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Account</CDropdownItem>
                <CDropdownItem>Settings</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavbarNav>
        </CCollapse>
      </CNavbar>
    </div>
  )
};
