import React from "react";
import { Link } from "react-router-dom";

import DonutGraph from "../components/DonutGraph"
import TodoList from "../components/TodoList"
import { get } from "https";

const fetch = global.fetch ? global.fetch : require('cross-fetch');
global.fetch = fetch;

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      patientList: [],
      patientList2: [],
      placeholder: "Loading..."
    }
  }

  getDayLeft(date) {
    const timestamps = new Date().getTime() - new Date(date).getTime();
    const dayLeft = parseInt(timestamps/1000/60/60/24);
    const day = dayLeft>1 ? ' days': ' day'
    return dayLeft + day;
  }

  getRateString(rate) {
    let original = 100-rate;
    let string = Math.round(original*100)/100;
    return (string+"%")
  }

  componentDidMount() {
    let endpoint = "api/patient/longestTimeSinceCheckup";
    let endpoint2 = "api/goal/mostBehindGoals2";

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
        this.setState({patientList: data});
    }).catch(err => {
      //Do seomthing with the error
    }); 

    fetch(endpoint2)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
        this.setState({patientList2: data, loaded:true});
    }).catch(err => {
      //Do seomthing with the error
    })
  }
    
    render() {
        return (
            <div>
                <div className="row">
                <DonutGraph/>
                <div id="most-behind-box" className="col-sm-4">
                    <div className="x_panel">
                    <div className="x_title">
                    <h2><span className="fa fa-exclamation-circle"></span> Most Behind on Goals</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                    <ul className="list-unstyled top_profiles scroll-view">
                    { (this.state.loaded)
                    ? this.state.patientList2.map(patient=>{
                      if(patient.rate >= 100) return;
                      return <li className="media event" key={patient.MRN}>
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                        <Link className="title" to={`/patient/${patient.MRN}`}>{`${patient.first_name} ${patient.last_name}`}</Link>
                          <p><strong>{this.getRateString(patient.rate)}</strong> uncompleted</p>
                        </div>
                      </li>            
                    })
                      : <p>{this.state.placeholder}</p>
                      }
                    </ul>
        {/* : <p>{placeholder}</p> } */}
                  </div>
                    </div>
                </div>

                <div id="longest-time-box" className="col-sm-4">
                    <div className="x_panel">
                    <div className="x_title donut">
                    <h2><span className="fa fa-clock-o"></span> Longest Time Since Checkup</h2>
                    <div className="clearfix"></div>
                    </div>
                    <div className="x_content"> 
                    <ul className="list-unstyled top_profiles scroll-view">
                    { (this.state.loaded)
                    ? this.state.patientList.map(patient=>{
                      return <li className="media event" key={patient.MRN}>
                        <a className="pull-left border-aero profile_thumb">
                          <i className="fa fa-user aero"></i>
                        </a>
                        <div className="media-body">
                        <Link className="title" to={`/patient/${patient.MRN}`}>{`${patient.first_name} ${patient.last_name}`}</Link>
                        <p><strong>{this.getDayLeft(patient.last_checkup_date)}</strong> since last checkup</p>                        </div>
                      </li>            
                    })
                      : <p>{this.state.placeholder}</p>
                      }
                    </ul>

                    </div>
                    </div>
                </div>

                </div>



                <div className="row">

{/*  Start to do list  */}
                <TodoList username={this.props.username}/>
                {/*  End to do list */}
                </div>
            </div>
        )
    }
}

export default Home;