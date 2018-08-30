import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import FitbitAuth from "./components/FitbitAuth";
import Physician from "./components/Physician";
import Patient from "./components/Patient";
import Login from "./components/Login";
import SessionStore from "./stores/SessionStore";

let sessionStore = new SessionStore();

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav sessionStore={sessionStore}/>
        <div className="row d-flex w-100 h-100 justify-content-center">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/fitbitData" render={(props) => {return (<FitbitAuth {...props} sessionStore={sessionStore}/>)}} />
            <Route path="/physician" render={(props) => {return (<Physician {...props} sessionStore={sessionStore}/>)}} />
            <Route path="/patient" render={(props) => {return (<Patient {...props} sessionStore={sessionStore}/>)}} />
            <Route path="/login" render={(props) => {return (<Login {...props} sessionStore={sessionStore}/>)}} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));