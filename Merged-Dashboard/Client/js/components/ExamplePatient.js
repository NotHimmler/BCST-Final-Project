import React from "react";
import { Link } from "react-router-dom";

import PatientGraph from '../components/PatientGraph'
import PatientGoal from '../components/PatientGoal'
import PatientSettings from '../components/PatientSettings'

//For testing
import TestChart from '../components/Charts/TestChart'
import WalkAppTable from "./WalkAppTable";


class ExamplePatient extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      content : "Data",
      lastCheckedup: "",
      data : {},
      loaded: false,
      placeholder: "Loading...",
    };
  }

  componentWillMount() {
    const mrn = this.props.match.params.MRN;
    console.log(mrn);
    let endpoint = `/api/patient/mrn/${mrn}`;

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({data: data, loaded:true})
    });

    /* $.ajax({
        url:"/api/patient/archived",
        type:"get",
        contentType:"application/json;charset=utf-8",
        success: (data)=>{
            console.log(data);
            let error = data.error;
            if (error) {
              this.setState({
                errorMessage:error
              });
            }
        }
    }); */
  }


    render() {
      const {loaded, placeholder} = this.state;
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
                    <h3>{loaded?this.state.data.first_name + " " + this.state.data.last_name:placeholder}</h3>
                    <h4>MRN: {loaded?this.state.data.MRN:placeholder}</h4>
                    <h5><i>Last check up: {loaded?this.state.data.last_checkup_date:placeholder}</i></h5>
                  </div>
                </div>
                <div className="clearfix"></div>
                </div>

              {
                (this.state.content === "Data" && this.state.loaded)
                    ? <PatientGraph mrn={this.props.match.params.MRN}/>
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