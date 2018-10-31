import React from "react";
import { Link } from "react-router-dom";

class Topnav extends React.Component {

  constructor(props) {
    super(props);
  }

  logOutHandler(e) {
    if (e) e.preventDefault();
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
                    <ul style={{width: 150}} className="dropdown-menu dropdown-usermenu pull-right">
                      {/* <li>
                        <a href="javascript:;">
                          <span className="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                      </li>
                      <li><a href="javascript:;">Help</a></li> */}
                      <li><Link to="/" onClick={this.logOutHandler.bind(this)}><i className="fa fa-sign-out pull-right"></i> Log Out</Link></li>
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