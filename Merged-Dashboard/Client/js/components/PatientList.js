import React from "react";
import { Link } from "react-router-dom";

class PatientRow extends React.Component {
  returnIconBasedOnPercentage(percentString) {
      
      const num = Number(percentString.replace("%", ""))
      if (num < 50) {
          return <span>{percentString}<i className="text-danger fas fa-exclamation-circle"></i></span>
      } else if (num >= 50 && num < 80) {
          return <span>{percentString}<i className="text-warning fas fa-exclamation-triangle"></i></span>
      } else if (num >= 80) {
          return <span>{percentString}<i className="text-success fas fa-check-circle"></i></span>
      }

  }

  getDate(d) {
      let date = new Date(d);
      console.log(date);
      return (date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());
  }

  render() {
      
      return(
        !this.props.patient.is_archived ?
          <tr>
              <th scope="row"><Link to={"/patient"+`/${this.props.patient.MRN}`}>{this.props.patient.MRN}</Link></th>
              <td scope="row">{this.props.patient.ward}</td>
              <td scope="row">{this.props.patient.first_name}</td>
              <td scope="row">{this.props.patient.last_name}</td>
              <td scope="row">{this.props.patient.age}</td>
              <td scope="row">{this.props.patient.sex}</td>
              <td scope="row">{this.props.patient.health_condition}</td>
          </tr>
          : 
          <tr>
              <th scope="row"><Link to={"/patient"+`/${this.props.patient.MRN}`}>{this.props.patient.MRN}</Link></th>
              <td scope="row">{this.props.patient.first_name}</td>
              <td scope="row">{this.props.patient.last_name}</td>
              <td scope="row">{this.props.patient.age}</td>
              <td scope="row">{this.props.patient.sex}</td>
              <td scope="row">{this.props.patient.health_condition}</td>
              <td scope="row">{this.getDate(this.props.patient.date_archived)}</td>
          </tr>
      )
  }
}

const activePatientHeader  = () => {
  return(
      <tr>
          <th scope="col">{"MRN"}</th>
          <th scope="col">{"Ward"}</th>
          <th scope="col">{"First Name"}</th>
          <th scope="col">{"Last Name"}</th>
          <th scope="col">{"Age"}</th>
          <th scope="col">{"Sex"}</th>
          <th scope="col">{"Health Condition"}</th>
      </tr>
  )
}

const archivedPatientHeader  = () => {
  return(
      <tr>
          <th scope="col">{"MRN"}</th>
          <th scope="col">{"First Name"}</th>
          <th scope="col">{"Last Name"}</th>
          <th scope="col">{"Age"}</th>
          <th scope="col">{"Sex"}</th>
          <th scope="col">{"Health Condition"}</th>
          <th scope="col">{"Date Archived"}</th>
      </tr>
  )
}

class PatientList extends React.Component {

  constructor() {
    super()
    this.state = {
        "archived": false, 
        "patientRows": [],
        loaded: false,
        placeholder: "Loading..."
    }
  }

  componentDidMount() {
    this.setState({"archived": this.props.archived});
    let endpoint = "";
    this.props.archived ? endpoint = "api/patient/archived" : endpoint = "api/patient/current";

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
        let rows = []
        for (let patient of data) {
            console.log(patient);
            rows.push(<PatientRow key={patient.MRN} patient={patient}/>)
        } 
        this.setState({"patientRows": rows, loaded: true})
    });   
    
}
    
    render() {

        const { loaded, placeholder } = this.state;

        return (
          <div>
            <div className='x_panel'>

              <div className='x_content'>

{ loaded ?
              <table className="table">
                    <thead className="thead-light">
                        { !this.state.archived ? activePatientHeader() : archivedPatientHeader()}
                        { this.state.patientRows  }
                    </thead>
                </table>
                : <p>{placeholder}</p>
}

              </div>

            </div>

          </div>
        )
    }
}

export default PatientList;