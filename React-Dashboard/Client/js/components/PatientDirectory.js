import React from "react";
import { Link } from "react-router-dom";

let patients = [
    {
        "mrn": "88124213",
        "firstName": "Elizabeth",
        "lastName": "Smith",
        "weeklySteps": "24937",
        "pctStepGoal": "36%",
        "weeklyWalk": "18.86km",
        "pctWalkGoal": "51%",
        "archived": false,
        "dateArchived": null
    }, 
    
    {
        "mrn": "88177742",
        "firstName": "John",
        "lastName": "Smith",
        "archived": true,
        "dateArchived": "29-03-2017"
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
                <th scope="row"><Link to={"/patient/"+this.props.patient.firstName+" "+this.props.patient.lastName}>{this.props.patient.mrn}</Link></th>
                <td scope="row">{this.props.patient.firstName}</td>
                <td scope="row">{this.props.patient.lastName}</td>
                <td scope="row">{this.props.patient.weeklySteps}</td>
                <td scope="row">{this.returnIconBasedOnPercentage(this.props.patient.pctStepGoal)}</td>
                <td scope="row">{this.props.patient.weeklyWalk}</td>
                <td scope="row">{this.returnIconBasedOnPercentage(this.props.patient.pctWalkGoal)}</td>
            </tr>
            : 
            <tr>
                <th scope="row"><Link to={"/patient/"+this.props.patient.firstName+" "+this.props.patient.lastName}>{this.props.patient.mrn}</Link></th>
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

class PatientDirectory extends React.Component {
    constructor() {
        super()
        this.state = {"archived": false, "patientRows": []}
        this.handleArchivedButton = this.handleArchivedButton.bind(this)
    }

    componentDidMount() {
        let rows = []
        for (let patient of patients) {
            
            if (patient.archived == this.state.archived) {
                rows.push(<PatientRow key={patient.mrn} patient={patient}/>)
            } 
        }
        this.setState({"patientRows": rows})
    }

    handleArchivedButton(evt) {
        console.log(evt.target)
        let rows = []
        for (let patient of patients) {
            if (patient.archived != this.state.archived) {
                rows.push(<PatientRow key={patient.mrn} patient={patient}/>)
            } 
        }
        this.setState({"archived": !this.state.archived, "patientRows": rows})
    }

    render() {
        return (
            <div>
                <div className="row d-flex w-100">
                <button onClick={this.handleArchivedButton} className="btn btn-ligh">
                    {this.state.archived ? "Show Active Patients" : "Show Archived Patients"}
                </button>
                </div>
                <br />
                <table className="table">
                    <thead className="thead-light">
                        { !this.state.archived ? activePatientHeader() : archivedPatientHeader()}
                        { this.state.patientRows }
                    </thead>
                </table>
            </div>
        )
    }
}

export default PatientDirectory