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
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    //console.log("Update height");
    //console.log(window.innerHeight);
  }

  updateStatus(option){
    this.setState(option);
    if (!option.isLoggedIn) {
      localStorage.clear("isLoggedIn");
      localStorage.clear("username");
    } else {
      localStorage.isLoggedIn = option.isLoggedIn;
      localStorage.username = option.username;
    }
    
  }

  render(){
    return (
      <BrowserRouter>
        <div className="nav-md">
        <div className="container body">
            <div className="main_container" style={{height: this.state.height}}>
              {this.state.isLoggedIn ? <Sidebar username={this.state.username} /> : null}
              {this.state.isLoggedIn ? <Topnav username={this.state.username} updateAppStatus={this.updateStatus.bind(this)} />  : null}
              <div className="right_col" style={{height: this.state.height-60}} role="main">
                <Switch>
                  {this.state.isLoggedIn ? 
                  <div>
                      <Route path="/" render={(props) => {return <Home {...props} username={this.state.username} />}} exact />
                      <Route path="/curPatients" render={(props) => {return (<CurPatients/>)}} />
                      <Route path="/disPatients" render={(props) => {return (<DisPatients/>)}} />
                      <Route path="/patient/:MRN" render={(props) => {return (<ExamplePatient {...props} username={this.state.username}/>)}} />
                      <Route path="/addPatient" render={(props) => {return (<AddPatient props={props}/>)}} />
                      <Route path="/register" render={(props) => {return (<Register updateAppStatus={this.updateStatus.bind(this)} />)}} />
                      <Route path="/login" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
                      <Route path="/walkAppTable" render={(props) => {return (<WalkAppTable mrn={80000001}/>)}} exact/>
                      <Route path="/test" render={(props) => {return (<Test/>)}} exact/>
                      <Route path="/fitbitAuth/:mrn" render={(props) => {return (<FitbitAuth {...props}/>)}} exact/>
                      <Route path="/fitbitAuth" render={(props) => {return (<FitbitAuth {...props}/>)}} exact/>
                      </div>
                      :
                      <div>
                      <Route path="/" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
                      <Route path="/login" render={(props) => {return (<Login updateAppStatus={this.updateStatus.bind(this)}/>)}} exact/>
                      <Route path="/register" render={(props) => {return (<Register updateAppStatus={this.updateStatus.bind(this)} />)}} exact/>
                      <Route path="/fitbitAuth/:mrn" render={(props) => {return (<FitbitAuth {...props}/>)}} exact/>
                      <Route path="/fitbitAuth" render={(props) => {return (<FitbitAuth {...props}/>)}} exact/>
                      </div>
                      }
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