import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

//Import components

import Test from "./components/Test";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import Home from "./components/Home";
import CurPatients from "./components/CurPatients";
import DisPatients from "./components/DisPatients";
import ExamplePatient from "./components/ExamplePatient";
import GraphSettings from './components/GraphSettings';
import Login from "./components/Login";
import Register from "./components/Register";

class App extends React.Component {
  
  getUserName(){
    let search = decodeURI(window.location.search);
    let index = search.indexOf('username=');
    let username = search.substr(index+9);
    return username || "Log in";
  }

  render(){
    var username = this.getUserName();
    return (
      <BrowserRouter>
        <div className="nav-md">
          <div className="container body">
            <div className="main_container">
              <Sidebar username={username}/>
              <Topnav username={username}/>
              <Switch>
                  <Route path="/" render={(props) => {return (<Login/>)}} exact/>
                  <Route path="/login" render={(props) => {return (<Login/>)}} />
                  <Route path="/register" render={(props) => {return (<Register/>)}} />
              </Switch>
              <div className="right_col" role="main">
                <Switch>
                      <Route path="/home" component={Home} exact />
                      <Route path="/curPatients" render={(props) => {return (<CurPatients/>)}} />
                      <Route path="/disPatients" render={(props) => {return (<DisPatients/>)}} />
                      <Route path="/patient" render={(props) => {return (<ExamplePatient/>)}} />
                      <Route path="/patientsettings" render={(props) => {return (<GraphSettings/>)}} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>

    );
  }
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));