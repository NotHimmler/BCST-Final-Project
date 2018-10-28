import React from "react";
import { Link } from "react-router-dom";

import PatientGraph from '../components/PatientGraph'
import PatientGoal from '../components/PatientGoal'
import PatientSettings from '../components/PatientSettings'
import PatientCheckup from '../components/PatientCheckup'

//For testing
import FitbitChart from '../components/Charts/FitbitChart'
import CheckupHistory from "./CheckupHistory";

const boxMargins = {
  "paddingLeft": "20px",
  "paddingRight": "20px"
}

class ExamplePatient extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      content : "Data",
      lastCheckedup: "",
      lastCheckupString: "",
      data : {},
      loaded: false,
      placeholder: "Loading...",
      hasFitbitToken: false,
      mrn: this.props.match ? this.props.match.params.MRN : 80000001
    };

    this.setContent = this.setContent.bind(this);
    this.onExpiredToken = this.onExpiredToken.bind(this);
  }

  componentWillMount() {
    const mrn = this.state.mrn
    let endpoint = `/api/patient/details/mrn/${mrn}`;

    // Get general patient details (e.g. age/sex/ward)
    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
      let hasToken = false;
      (data.token) ? hasToken=true : hasToken=false;
      this.setState({data: data, lastCheckupString: this.getLastCheckupString(data.last_checkup_date, data.last_checkup_by), loaded:true, hasFitbitToken: hasToken});
    }).catch(err => {
      
    })
  }

  setContent(contentType) {
    this.setState({"content": contentType});
  }

  // Get a string for last checkup
  getLastCheckupString(date, by){
    const lastCheckupDate = date
    if(lastCheckupDate == null){
      return "No last checkup";
    } else {
      let string = new Date(lastCheckupDate).toDateString()+ " by "+ by;
      return string;
    }
  }

  updateCheckupDate(date) {
    let checkupString = this.getLastCheckupString(date, this.props.username)
    this.setState({lastCheckupString: checkupString})
  }

  onExpiredToken() {
    this.setState({hasFitbitToken:false});
  }

    render() {
      const {data, loaded, placeholder} = this.state;
        return (
            <div className="row" style={boxMargins}>
              <div className="btn-group patient-toggle">
                <button id="data-btn" type="button" className="btn btn-primary" 
                onClick={() => this.setState({content: 'Data'})}
                >Data</button>
                <button id="goal-btn" type="button" className="btn btn-primary" 
                onClick={() => this.setState({content: 'Goal'})}
                >Goals</button>
                <button id="chkup-notes-btn" type="button" className="btn btn-primary" 
                onClick={() => this.setState({content: 'Notes'})}
                >Checkup Notes</button>
                <button id="pat-set-btn" type="button" className="btn btn-primary"
                onClick={() => this.setState({content: 'Settings'})}
                >Settings</button>
                {/* <button type="button" className="btn btn-primary"
                onClick={() => this.setState({content: 'Test'})}
                >Test</button> */}
                <button id="print-btn" type="button" className="btn btn-primary"
                onClick={() => {
                  window.print()
                }}
                >Print/Save Page</button>
                
              </div>
              <div className="row">
                <div className="page-title">
                  <div className="title_left">
                    <h3>{loaded?data.first_name + " " + data.last_name:placeholder}</h3>
                    <p>{data.is_archived?" (This patient has been archived)":""}</p>
                    <h4>MRN: {loaded?data.MRN:placeholder}</h4>
                    <h5 className="last_checkup"><i>Last check up: {loaded
                          ? this.state.lastCheckupString
                          : placeholder}</i></h5>
                    <button id="chkup-btn" className="btn btn-danger" onClick={() => this.setState({content: "Checkup"})}>Perform Checkup</button>
                    <table id="pat-info-tab" className="table">
                      <thead>
                        <tr>
                          <th scope="col">Age</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Ward</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{loaded?data.age:placeholder}</td>
                          <td>{loaded?data.sex:placeholder}</td>
                          <td>{loaded?data.ward:placeholder}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="clearfix"></div>
                </div>

              {
                (this.state.content === "Data" && this.state.loaded)
                    ? <PatientGraph 
                        mrn={this.state.mrn} 
                        lastName={this.state.data.last_name}
                        hasFitbitToken={this.state.hasFitbitToken}
                        onExpiredToken={this.onExpiredToken}
                      />
                    : null
              }

              {
                (this.state.content === "Goal")
                    ? <PatientGoal mrn={this.state.mrn}/>
                    : null
              }

              {
                (this.state.content === "Settings")
                    ? <PatientSettings 
                        mrn={this.state.mrn} 
                        archived={data.is_archived}
                        hasFitbitToken={this.state.hasFitbitToken}/>
                    : null
              }

              {
                (this.state.content === "Notes")
                ? <CheckupHistory user={this.props.username} mrn={this.state.mrn}/>
                : null
              }

              {
                (this.state.content === "Checkup") ? <PatientCheckup mrn={this.state.mrn} setContent={this.setContent} user={this.props.username} updateCheckup={this.updateCheckupDate.bind(this)}/> : null
              }


              {/*For testing...*/}
              {/*
                (this.state.content === "Test" && this.state.loaded)
                    ? <FitbitChart mrn={this.state.mrn} lastName={this.state.data.last_name}/>
                    : null
              */}

            </div>
        )
    }
}

export default ExamplePatient;