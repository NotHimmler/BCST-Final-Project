import React from "react";
import { Link } from "react-router-dom";

import DonutGraph from "../components/DonutGraph"

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      patientList: [],
      placeholder: "Loading..."
    }
  }

  getLastCheckupList() {
    const { patientList,loaded, placeholder } = this.state;
    if (!patientList.length) {
      return null;
    }
    
    const listItem = patientList.map(patient => <li key={patient.MRN} className="media event">
          <a className="pull-left border-aero profile_thumb">
            <i className="fa fa-user aero"></i>
          </a>
        <div className="media-body">
          <Link className="title" to={`/patient/${patient.MRN}`}>{`${patient.first_name} ${patient.last_name}`}</Link>
          <p><strong>{this.getDayLeft(patient.last_checkup_date)}</strong> since last checkup</p>
        </div>
    </li>
    );
    return loaded? <ul>{listItem}</ul> : <p>{placeholder}</p> 
  }

  getDayLeft(date) {
    const timestamps = new Date().getTime() - new Date(date).getTime();
    const dayLeft = parseInt(timestamps/1000/60/60/24);
    const day = dayLeft>1 ? ' days': ' day'
    return dayLeft + day;
  }

  componentDidMount() {
    let endpoint = "api/patient/longestTimeSinceCheckup";

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
        this.setState({loaded: true, patientList: data});
    });   
    
}
    
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
        {/* { loaded ? */}
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
                          <Link to="/patient/80000001" className="title">Elizabeth Smith</Link>
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
        {/* : <p>{placeholder}</p> } */}
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
                {/* loaded ?
                   /* <ul className="list-unstyled top_profiles scroll-view">
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
                          <Link to="/patient/80000001" className="title">Elizabeth Smith</Link>
                          <p><strong>14 days </strong> since last checkup</p>

                        </div>
                      </li>

                </ul>*/
                // : <p>{placeholder}</p> */
                }
                
                {this.getLastCheckupList()}
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