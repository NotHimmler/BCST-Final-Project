import React from "react";
import { Link } from "react-router-dom";

import PatientGraph from '../components/PatientGraph'
import PatientGoal from '../components/PatientGoal'
import PatientSettings from '../components/PatientSettings'

//For testing
import TestChart from '../components/Charts/TestChart'


class ExamplePatient extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      content : "Data",
      lastCheckedup: ""
    };
  }

  componentWillMount() {
        $.ajax({
            url:`/api/v1/patient/lastCheckout?patientId=${this.props.username}`,
            type:"get",
            contentType:"application/json;charset=utf-8",
            success: (data)=>{
                console.log(data);
                let error = data.error;
                if (error) {
                  this.setState({
                    errorMessage:error
                  });
                } else {
                    this.setState({
                      lastCheckedup:data.lastChecked
                    });
                }
            }
        });
  }


    render() {
        return (
            <div>
              <div className="btn-group patient-toggle">
                <button type="button" className="btn btn-primary" 
                onClick={() => this.setState({content: 'Data'})}
                >Data</button>
                <button type="button" className="btn btn-primary" 
                onClick={() => this.setState({content: 'Goal'})}
                >Goals</button>
                <button type="button" className="btn btn-primary"
                onClick={() => this.setState({content: 'Settings'})}
                >Settings</button>
                <button type="button" className="btn btn-primary"
                onClick={() => this.setState({content: 'Test'})}
                >Test</button>
                <button type="button" className="btn btn-primary"
                onClick={() => window.print()}
                >Download</button>
                
              </div>
              <div className="">
                <div className="page-title">
                  <div className="title_left">
                    <h3>Elizabeth Smith</h3>
                    <p>MRN: 88124213</p>
                    <p><i>Last check up: {this.state.lastCheckedup}</i></p>
                  </div>
                </div>
                <div className="clearfix"></div>
                </div>

              {
                (this.state.content === "Data")
                    ? <PatientGraph/>
                    : null
              }

              {
                (this.state.content === "Goal")
                    ? <PatientGoal/>
                    : null
              }

              {
                (this.state.content === "Settings")
                    ? <PatientSettings archived={false}/>
                    : null
              }

              {/*For testing...*/}
              {
                (this.state.content === "Test")
                    ? <TestChart/>
                    : null
              }

            </div>
        )
    }
}

export default ExamplePatient;