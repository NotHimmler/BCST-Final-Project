import React from "react";
import { Link } from "react-router-dom";

import DonutGraph from "../components/DonutGraph"

class Home extends React.Component {
    
    render() {
        return (
            <div>
                <DonutGraph/>

                <div className="col-sm-4">
                    <div className="x_panel">
                    <div className="x_title">
                    <h2><span class="fa fa-exclamation-circle"></span> Most Behind on Goals</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                    <ul class="list-unstyled top_profiles scroll-view">
                      <li class="media event">
                        <a class="pull-left border-aero profile_thumb">
                          <i class="fa fa-user aero"></i>
                        </a>
                        <div class="media-body">
                          <a class="title" href="#">Patient D05</a>
                          <p><strong>45% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-green profile_thumb">
                          <i class="fa fa-user green"></i>
                        </a>
                        <div class="media-body">
                          <Link to="/patient" class="title">Patient D01</Link>
                          <p><strong>34% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-blue profile_thumb">
                          <i class="fa fa-user blue"></i>
                        </a>
                        <div class="media-body">
                          <a class="title" href="#">Patient D02</a>
                          <p><strong>31% </strong> uncompleted</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-aero profile_thumb">
                          <i class="fa fa-user aero"></i>
                        </a>
                        <div class="media-body">
                          <a class="title" href="#">Patient D03</a>
                          <p><strong>29% </strong> uncompleted</p>

                        </div>
                      </li>

                      <li class="media event">
                        <a class="pull-left border-aero profile_thumb">
                          <i class="fa fa-user green"></i>
                        </a>
                        <div class="media-body">
                          <Link to="#" class="title">Patient D16</Link>
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
                    <h2><span class="fa fa-clock-o"></span> Longest Time Since Checkup</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                    <ul class="list-unstyled top_profiles scroll-view">
                      <li class="media event">
                        <a class="pull-left border-aero profile_thumb">
                          <i class="fa fa-user aero"></i>
                        </a>
                        <div class="media-body">
                          <a class="title" href="#">Patient D10</a>
                          <p><strong>29 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-green profile_thumb">
                          <i class="fa fa-user blue"></i>
                        </a>
                        <div class="media-body">
                          <Link to="/patient" class="title">Patient D09</Link>
                          <p><strong>17 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-blue profile_thumb">
                          <i class="fa fa-user aero"></i>
                        </a>
                        <div class="media-body">
                          <a class="title" href="#">Patient D18</a>
                          <p><strong>15 days </strong> since last checkup</p>

                        </div>
                      </li>
                      <li class="media event">
                        <a class="pull-left border-aero profile_thumb">
                          <i class="fa fa-user green"></i>
                        </a>
                        <div class="media-body">
                          <Link to="/patient" class="title">Patient D01</Link>
                          <p><strong>14 days </strong> since last checkup</p>

                        </div>
                      </li>

                    </ul>
                    </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;