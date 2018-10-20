import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Import components

import Test from "./components/Test";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import Home from "./components/Home";
import CurPatients from "./components/CurPatients";
import DisPatients from "./components/DisPatients";
import ExamplePatient from "./components/ExamplePatient";
import Login from "./components/Login";
import Register from "./components/Register";
import AddPatient from "./components/AddPatient";
import WalkAppTable from "./components/WalkAppTable";
import FitbitAuth from "./components/FitbitAuth";

class App extends React.Component {
  constructor(props){
    super(props);
    const loggedIn = localStorage.isLoggedIn ? localStorage.isLoggedIn : false;
    this.state = {
      isLoggedIn: loggedIn,
      username: localStorage.username? localStorage.username : "Log In",
      whichSwitch: null
    }
  }
  
  componentDidMount() {
    this.setState({whichSwitch: this.state.isLoggedIn ? this.getHomePage() : this.getLoginPage})
  }

  updateStatus(option){
    this.setState(option);
    localStorage.isLoggedIn = option.isLoggedIn;
    localStorage.username = option.username;
    if (option.isLoggedIn) {
      this.setState({whichSwitch: this.getHomePage()})
    } else {
      this.setState({whichSwitch: this.getLoginPage()})
    }
  }

  getLoginPage(){
    return (
      <div>
      <Switch>
            <Route path="/" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
            <Route path="/login" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
            <Route path="/register" render={(props) => {return (<Register updateAppStatus={this.updateStatus.bind(this)} />)}} exact/>
            <Route path="/fitbitAuth/:mrn" render={(props) => {return (<FitbitAuth {...props}/>)}} />
            <Route path="/fitbitAuth/" render={(props) => {return (<FitbitAuth {...props}/>)}} />
            <Route render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} />
      </Switch>
      </div>
    );
  }
  
  getHomePage(){
    return (
      <div className="container body">
            <div className="main_container">
              <Sidebar username={this.state.username} />
              <Topnav username={this.state.username} updateAppStatus={this.updateStatus.bind(this)} />
              <div className="right_col" role="main">
                <Switch>
                      <Route path="/" component={Home} exact />
                      <Route path="/curPatients" render={(props) => {return (<CurPatients/>)}} />
                      <Route path="/disPatients" render={(props) => {return (<DisPatients/>)}} />
                      <Route path="/patient/:MRN" render={(props) => {return (<ExamplePatient {...props} username={this.state.username}/>)}} />
                      <Route path="/addPatient" render={(props) => {return (<AddPatient props={props}/>)}} />
                      <Route path="/register" render={(props) => {return (<Register updateAppStatus={this.updateStatus.bind(this)} />)}} />
                      <Route path="/login" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
                      <Route path="/walkAppTable" render={(props) => {return (<WalkAppTable mrn={80000001}/>)}} exact/>
                      <Route path="/test" render={(props) => {return (<Test/>)}} exact/>
                      <Route path="/fitbitAuth/:mrn" render={(props) => {return (<FitbitAuth {...props}/>)}} />
                      <Route path="/fitbitAuth/" render={(props) => {return (<FitbitAuth {...props}/>)}} />
                </Switch>
              </div>
            </div>
          </div>
    )
  }

  render(){
    return (
      <BrowserRouter>
        <div className="nav-md">
          {this.state.whichSwitch }
        </div>
      </BrowserRouter>

    );
  }
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));