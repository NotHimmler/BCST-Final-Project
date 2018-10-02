import React from "react";
import { Link } from "react-router-dom";

class PatientSidebar extends React.Component {

  componentDidMount() {
    $('a').filter(function () {
      var $li = $(this).parent();
      if ($li.is('.current-page')) {
        $li.removeClass('current-page');}
        console.log("Href: "+ $(this).attr("href"));
      return $(this).attr("href") == window.location.pathname;
    }).parent('li').addClass('current-page');
  }

  render() {

    function updateActive() {
      console.log("update: " + window.location.pathname);

      $('a').filter(function () {
        var $li = $(this).parent();
        if ($li.is('.current-page')) {
          $li.removeClass('current-page');}
          console.log("Href: "+ $(this).attr("href"));
        return $(this).attr("href") == window.location.pathname;
      }).parent('li').addClass('current-page');
    }

    updateActive();
    
      return (
        <div>
          <hr id="sidebar-hr" ></hr>
          <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
          <div className="menu_section">
            <ul className="nav side-menu">
            <li>
              <Link to="patient">
              <i className="fa fa-bar-chart-o"></i> Patient Data 
              </Link>
              </li>

              {/* <li><Link to="patient-goal"><i className="fa fa-table"></i> Goals </Link>
                  </li> */}

            </ul>
          </div>
        </div>
        </div>
        
      )
    
  }
}
export default PatientSidebar;