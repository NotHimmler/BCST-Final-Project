import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

//Import components
/*
import Nav from "./components/Nav";
import Home from "./components/Home";
import SessionStore from "./stores/SessionStore";
import Login from "./components/Login";
import Patient from "./components/Patient";
import Sidenav from "./components/Sidenav";
import PatientDirectory from "./components/PatientDirectory";
*/

//let sessionStore = new SessionStore();

import Test from "./components/Test";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";


const App = () => {
  return (
    <div className="nav-md">
      <div class="container body">
        <div class="main_container">
          <Topnav/>
          <Test/>
        </div>
      </div>
    </div>
    /*
    <BrowserRouter>
      <div className="row w-100">
        <Nav sessionStore={sessionStore}/>

        <div className="wrapper">
            <Sidenav/>

            
            <div id="content">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/patient/:name" render={(props) => {return (<Patient {...props} sessionStore={sessionStore}/>)}} />
                    <Route path="/login" render={(props) => {return (<Login {...props} sessionStore={sessionStore}/>)}} />
                    <Route path="/directory" render={(props) => {return (<PatientDirectory {...props} sessionStore={sessionStore}/>)}} />
                </Switch>
            </div>
        </div>
      </div>
    </BrowserRouter>*/
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));