import React from "react";
import { Link } from "react-router-dom";

import PatientSidebar from "../components/PatientSidebar";
const $ = require('jquery');
//NOTES//
//Implement className="navbar nav_title" style="border: 0;"

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      active: window.location.pathname,
    };
    this.updateSidebar = this.updateSidebar.bind(this);
  }

  updateSidebar() {
    var CURRENT_URL = window.location.pathname,
          $BODY = $('body'),
          $SIDEBAR_MENU = $('#sidebar-menu');

    // Sidebar
    $SIDEBAR_MENU.find('a').on('click', function(ev) {
          var $li = $(this).parent();
  
          if ($li.is('.active')) {
              $li.removeClass('active active-sm');
              $('ul:first', $li).slideUp(function() {
                  //setContentHeight();
              });
          } else {
              // prevent closing menu if we are on child menu
              if (!$li.parent().is('.child_menu')) {
                  $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                  $SIDEBAR_MENU.find('li ul').slideUp();
              }else
              {
          if ( $BODY.is( ".nav-sm" ) )
          {
            $li.parent().find( "li" ).removeClass( "active active-sm" );
            $li.parent().find( "li ul" ).slideUp();
          }
        }
              $li.addClass('active');
  
              $('ul:first', $li).slideDown(function() {
                  //setContentHeight();
              });
          }
      });
  
    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    //console.log("Current URL: " + CURRENT_URL);
  
    $SIDEBAR_MENU.find('a').filter(function () {
      return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
      //setContentHeight();
    }).parent().addClass('active');
    
    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
      $('.menu_fixed').mCustomScrollbar({
        autoHideScrollbar: true,
        theme: 'minimal',
        mouseWheel:{ preventDefault: true }
      });
  };
  // /Sidebar

  }

    componentDidMount() {
      this.updateSidebar();
      
}

    render() {

      //Update active page
      var currentPath = window.location.pathname;
      //console.log(currentPath);
      //console.log(currentPath.includes("patient"));

      function updateActive() {
        //console.log("update: " + window.location.pathname);

        $('#sidebar-menu').find('a').filter(function () {
          var $li = $(this).parent();
          if ($li.is('.current-page')) {
            $li.removeClass('current-page');}

            if ($li.is('.active')) {
              $li.removeClass('active');
            }
            //console.log("Href: "+ $(this).attr("href"));
          return $(this).attr("href") == window.location.pathname;
        }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
        }).parent().addClass('active');;
      }

      updateActive();

        return (
            <div className="col-md-3 left_col">
              <div className="left_col scroll-view">

                {/* Sidebar title */}
                <div className="navbar nav_title">
                  <Link to="/" className="site_title"><i className="fa fa-paw"></i> <span>Dashboard</span></Link>
                </div>
                {/* /Sidebar title */}

                <div className="clearfix"></div>

                {/* Sidebar profile quick info */}
                <div className="profile clearfix">
                  <div className="profile_pic">
                    <img src="../img/leanne_icon.jpg" alt="..." className="img-circle profile_img"/>
                  </div>
                  <div className="profile_info">
                    <span>Welcome,</span>
                    <h2>{this.props.username}</h2>
                  </div>
                </div>
                {/* /Sidebar profile quick info */}

                <br/>

                {/* Sidebar menu */}
                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                  <div className="menu_section">
                    <h3>General</h3>
                    <ul className="nav side-menu">
                      <li><Link id="sidebar-home-link" to="/"><em className="fa fa-home"></em> Home <span  className="label label-success pull-right"></span></Link></li>
                      <li><a><i className="fa fa-edit"></i> Patients <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><Link id="sidebar-curr-link" to="/curPatients">Current Patients</Link></li>
                          <li><Link id="sidebar-dis-link" to="/disPatients">Discharged Patients</Link></li>
                        </ul>
                      </li>
                      <li><Link id="sidebar-add-pat" to="/addPatient"><i className="fas fa-user-plus"></i> Add New Patient</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Sidebar menu */}

                {currentPath.includes('patient')
                    ? <PatientSidebar/> 
                    : null }
     
              </div>
            </div>
        )
    }
}

export default Sidebar;