import React from "react";
import { Link } from "react-router-dom";

class Topnav extends React.Component {

  constructor(props) {
    super(props);
  }

  logOutHandler(e) {
    e.preventDefault();
    this.props.updateAppStatus({isLoggedIn: false, username: null})
    //window.location.href = "/";
  }

  render() {
        return (
          <div className="top_nav">
            <div className="nav_menu">
              <nav>
                <div className="nav toggle">
                  <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>
  
                <ul className="nav navbar-nav navbar-right">
                  <li className="">
                    <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <img src="../img/leanne_icon.jpg" alt=""/>{this.props.username}
                      <span className=" fa fa-angle-down"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-usermenu pull-right">
                      <li><a href="javascript:;"> Profile</a></li>
                      <li>
                        <a href="javascript:;">
                          <span className="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                      </li>
                      <li><a href="javascript:;">Help</a></li>
                      <li><Link to="/" onClick={this.logOutHandler.bind(this)}><i className="fa fa-sign-out pull-right"></i> Log Out</Link></li>
                    </ul>
                  </li>

                  <li role="presentation" className="dropdown">
                  <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-bell-o"></i>
                    <span className="badge bg-green">4</span>
                  </a>
                  <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                    <li>
                      <a>
                        <span className="image"><img src="../img/leanne_icon.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>{this.props.username}</span>
                          <span className="time">15/Sep</span>
                        </span>
                        <span className="message">
                          Patient D01 report due
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src="../img/leanne_icon.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>{this.props.username}</span>
                          <span className="time">17/Sep</span>
                        </span>
                        <span className="message">
                          Patient D02 report due
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src="../img/leanne_icon.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>{this.props.username}</span>
                          <span className="time">18/Sep</span>
                        </span>
                        <span className="message">
                          Patient D03 report due
                        </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src="../img/leanne_icon.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>{this.props.username}</span>
                          <span className="time">19/Sep</span>
                        </span>
                        <span className="message">
                           Patient D04 report due
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="text-center">
                        <a>
                          <strong>See All Alerts</strong>
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                </ul>

              </nav>
            </div>
          </div>
        )
    }
}

export default Topnav;