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

const App = () => {
  return (
    <BrowserRouter>
      <div className="nav-md">
        <div class="container body">
          <div class="main_container">
            <Sidebar/>
            <Topnav/>
            <div class="right_col" role="main">
              <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/curPatients" render={(props) => {return (<CurPatients/>)}} />
                    <Route path="/disPatients" render={(props) => {return (<DisPatients/>)}} />
                    <Route path="/patient" render={(props) => {return (<ExamplePatient/>)}} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>

  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));