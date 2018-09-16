import React from "react";
import { Link } from "react-router-dom";

//NOTES//
//Implement className="navbar nav_title" style="border: 0;"
//Links

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-3 left_col">
              <div className="left_col scroll-view">

                {/* Sidebar title */}
                <div className="navbar nav_title">
                  <a href="#home" className="site_title"><i className="fa fa-paw"></i> <span>Dashboard</span></a>
                </div>
                {/* /Sidebar title */}

                <div class="clearfix"></div>

                {/* Sidebar profile quick info */}
                <div className="profile clearfix">
                  <div className="profile_pic">
                    <img src="../img/leanne_icon.jpg" alt="..." className="img-circle profile_img"/>
                  </div>
                  <div className="profile_info">
                    <span>Welcome,</span>
                    <h2>Leanne Hassett</h2>
                  </div>
                </div>
                {/* /Sidebar profile quick info */}

                <br/>

                {/* Sidebar menu */}
                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                  <div className="menu_section">
                    <h3>General</h3>
                    <ul className="nav side-menu">
                      <li><a href="home.html"><em className="fa fa-home"></em> Home <span  className="label label-success pull-right"></span></a></li>
                      <li><a><i className="fa fa-edit"></i> Patients <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="contacts.html">Current Patient</a></li>
                          <li><a href="out.html">Archived Patient</a></li>
                        </ul>
                      </li>
                      <li><a href="calendar.html"><i className="fa fa-desktop"></i> Calendar <span className="label label-success pull-right"></span></a></li>
                    </ul>
                  </div>
                </div>
                {/* /Sidebar menu */}
     
              </div>
            </div>
        )
    }
}

export default Sidebar;