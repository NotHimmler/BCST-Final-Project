import React from "react";
import { Link } from "react-router-dom";

class Sidenav extends React.Component {

    render() {
        return (
            <div id = "wrapper">
                <nav id="sidenav">
                    <div className="sidebar-header">
                        <input type="text" className="form-control" id="search-patients" placeholder="Search patients..."/>
                    </div>
                    <hr/>
                    <div className="navbar-nav">
                        <a className="nav-dark nav-item nav-link" href="#"><i className="fas fa-home nav-icon"></i>Home</a>
                        <a className="nav-dark nav-item nav-link" href="#"><i className="fas fa-inbox nav-icon"></i>Inbox</a>
                        <a className="nav-dark nav-item nav-link" href="#"><i className="fas fa-address-book nav-icon"></i>Patient Directory</a>
                    </div>
                    <hr/>
                </nav>
            </div>


        );
    }

}
export default Sidenav;