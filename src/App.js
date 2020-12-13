import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from '@pages/dashboard';
import Nav from '@navs';
import "@coreui/coreui/dist/css/coreui.css";

export default function App() {
  return (
    <Router>
      <div>
        
        <Nav />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}