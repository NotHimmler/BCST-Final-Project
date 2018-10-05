import React from "react";
import { Link } from "react-router-dom";

let patients = [
  {
      "mrn": "88124213",
      "ward": "F9",
      "firstName": "Elizabeth",
      "lastName": "Smith",
      "weeklySteps": "24937",
      "pctStepGoal": "86%",
      "weeklyWalk": "18.86km",
      "pctWalkGoal": "87%",
      "archived": false,
      "dateArchived": null
  }, 

  {
    "mrn": "83940584",
    "ward": "A1",
    "firstName": "Nicole",
    "lastName": "Pearson",
    "weeklySteps": "45678",
    "pctStepGoal": "90%",
    "weeklyWalk": "18.86km",
    "pctWalkGoal": "89%",
    "archived": false,
    "dateArchived": null
}, 
{
    "mrn": "87123012",
    "ward": "B3",
    "firstName": "Jonathon",
    "lastName": "McIntyre",
    "weeklySteps": "13895",
    "pctStepGoal": "45%",
    "weeklyWalk": "9.05km",
    "pctWalkGoal": "42%",
    "archived": false,
    "dateArchived": null
},
{
    "mrn": "87123012",
    "ward": "E3",
    "firstName": "Alyson",
    "lastName": "Hannigon",
    "weeklySteps": "22328",
    "pctStepGoal": "79%",
    "weeklyWalk": "15.7km",
    "pctWalkGoal": "75%",
    "archived": false,
    "dateArchived": null
},  
  
  {
      "mrn": "88177742",
      "firstName": "John",
      "lastName": "Smith",
      "archived": true,
      "dateArchived": "29-03-2017"
  },
  {
        "mrn": "85639445",
        "firstName": "Mary",
        "lastName": "Smith",
        "archived": true,
        "dateArchived": "20-01-2018"
    },
    {
        "mrn": "85765622",
        "firstName": "Test",
        "lastName": "Test",
        "archived": true,
        "dateArchived": "20-01-2018"
    }
]

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

  render() {
      
      return(
        !this.props.patient.archived ?
          <tr>
              <th scope="row"><Link to={"/patient"}>{this.props.patient.mrn}</Link></th>
              {/* <th scope="row"><Link to={"/patient/"+this.props.patient.firstName+" "+this.props.patient.lastName}>{this.props.patient.mrn}</Link></th> */}
              <td scope="row">{this.props.patient.ward}</td>
              <td scope="row">{this.props.patient.firstName}</td>
              <td scope="row">{this.props.patient.lastName}</td>
              <td scope="row">{this.props.patient.weeklySteps}</td>
              <td scope="row">{this.returnIconBasedOnPercentage(this.props.patient.pctStepGoal)}</td>
              <td scope="row">{this.props.patient.weeklyWalk}</td>
              <td scope="row">{this.returnIconBasedOnPercentage(this.props.patient.pctWalkGoal)}</td>
          </tr>
          : 
          <tr>
              <th scope="row"><Link to={"/patient"}>{this.props.patient.mrn}</Link></th>
              {/* <th scope="row"><Link to={"/patient/"+this.props.patient.firstName+" "+this.props.patient.lastName}>{this.props.patient.mrn}</Link></th> */}
              <td scope="row">{this.props.patient.firstName}</td>
              <td scope="row">{this.props.patient.lastName}</td>
              <td scope="row">{this.props.patient.dateArchived}</td>
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
          <th scope="col">{"Weekly Fitbit Steps"}</th>
          <th scope="col">{"Fitbit Goal Attained %"}</th>
          <th scope="col">{"Weekly Walkforward Distance"}</th>
          <th scope="col">{"Walkforward Goal Attained %"}</th>
      </tr>
  )
}

const archivedPatientHeader  = () => {
  return(
      <tr>
          <th scope="col">{"MRN"}</th>
          <th scope="col">{"First Name"}</th>
          <th scope="col">{"Last Name"}</th>
          <th scope="col">{"Date Archived"}</th>
      </tr>
  )
}

class PatientList extends React.Component {

  constructor() {
    super()
    this.state = {"archived": false, "patientRows": []}
  }

  componentDidMount() {
    this.setState({"archived": this.props.archived});

    let rows = []
    for (let patient of patients) {
        
        if (patient.archived == this.props.archived) {
            rows.push(<PatientRow key={patient.mrn} patient={patient}/>)
        } 
    }
    this.setState({"patientRows": rows})
    
}
    
    render() {

        return (
          <div>
            <div className='x_panel'>

              <div className='x_content'>

              <table className="table">
                    <thead className="thead-light">
                        { !this.state.archived ? activePatientHeader() : archivedPatientHeader()}
                        { this.state.patientRows }
                    </thead>
                </table>


              </div>

            </div>

          </div>
        )
    }
}

export default PatientList;