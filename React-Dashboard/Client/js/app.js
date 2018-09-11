import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

//Import components
import Nav from "./components/Nav";
import Home from "./components/Home";
import SessionStore from "./stores/SessionStore";
import Login from "./components/Login";
import Patient from "./components/Patient";

let sessionStore = new SessionStore();

const App = () => {
  return (
    <BrowserRouter>
      <div className="row w-100">
        <Nav sessionStore={sessionStore}/>

        <div className="wrapper">
            <nav id="sidenav">
                <div className="sidebar-header">
                    <input type="text" class="form-control" id="search-patients" placeholder="Search patients..."/>
                </div>
                <hr/>
                <div className="navbar-nav">
                    <a className="nav-dark nav-item nav-link" href="/"><i className="fas fa-home nav-icon"></i>Home</a>
                    <a className="nav-dark nav-item nav-link" href="#"><i className="fas fa-inbox nav-icon"></i>Inbox</a>
                    <a className="nav-dark nav-item nav-link" href="#"><i className="fas fa-address-book nav-icon"></i>Patient Directory</a>
                    <hr id="hr210"/>
                    <a className="nav-dark nav-item nav-link" href="/patient"><i className="fas fa-user nav-icon"></i>Elizabeth Smith</a>
                </div>
            </nav>

            
            <div id="content">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/patient" render={(props) => {return (<Patient {...props} sessionStore={sessionStore}/>)}} />
                    <Route path="/login" render={(props) => {return (<Login {...props} sessionStore={sessionStore}/>)}} />
                </Switch>
            </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));