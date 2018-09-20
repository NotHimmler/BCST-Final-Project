import React from "react";
import { Link } from "react-router-dom";

import DonutGraph from "../components/DonutGraph"

class Home extends React.Component {
    
    render() {
        return (
            <div>
                <div className="row">
                <DonutGraph/>


                

                <div className="col-sm-4">
                    <div className="x_panel">
                    <div className="x_title">
                    <h2><span className="fa fa-exclamation-circle"></span> Most Behind on Goals</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                    <ul className="list-unstyled top_profiles scroll-view">
                      <li className="media event">
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                          <a className="title" href="#">Patient D05</a>
                          <p><strong>45% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-green profile_thumb">
                          <i className="fa fa-user green"></i>
                        </a>
                        <div className="media-body">
                          <Link to="/patient" className="title">Patient D01</Link>
                          <p><strong>34% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-blue profile_thumb">
                          <i className="fa fa-user blue"></i>
                        </a>
                        <div className="media-body">
                          <a className="title" href="#">Patient D02</a>
                          <p><strong>31% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                          <a className="title" href="#">Patient D03</a>
                          <p><strong>29% </strong> uncompleted</p>

                        </div>
                      </li>

                      <li className="media event">
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user green"></i>
                        </a>
                        <div className="media-body">
                          <Link to="#" className="title">Patient D16</Link>
                          <p><strong>22% </strong> uncompleted</p>

                        </div>
                      </li>

                    </ul>
                    </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="x_panel">
                    <div className="x_title donut">
                    <h2><span className="fa fa-clock-o"></span> Longest Time Since Checkup</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                    <ul className="list-unstyled top_profiles scroll-view">
                      <li className="media event">
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                          <a className="title" href="#">Patient D10</a>
                          <p><strong>29 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-green profile_thumb">
                          <i className="fa fa-user blue"></i>
                        </a>
                        <div className="media-body">
                          <Link to="/patient" className="title">Patient D09</Link>
                          <p><strong>17 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-blue profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                          <a className="title" href="#">Patient D18</a>
                          <p><strong>15 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li className="media event">
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user green"></i>
                        </a>
                        <div className="media-body">
                          <Link to="/patient" className="title">Patient D01</Link>
                          <p><strong>14 days </strong> since last checkup</p>

                        </div>
                      </li>

                    </ul>
                    </div>
                    </div>
                </div>

                </div>



                <div className="row">

{/*  Start to do list  */}
                <div className="col-sm-4 to_do">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>To Do List </h2>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                      <div className="">
                        <ul className="to_do">
                          <li>
                              <p>
                              <input type="checkbox" className="flat"/> Patient D01 report due</p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Plan a meeting </p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Patient D02 report due</p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Patient D03 report due</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  End to do list */}

                

                </div>
                

                

                

                
                

            </div>
        )
    }
}

export default Home;