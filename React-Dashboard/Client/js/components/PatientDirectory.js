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

    render() {
        return(
            <tr>
                <th scope="row"><Link to={"/patient/"+this.props.firstName+" "+this.props.lastName}>{this.props.mrn}</Link></th>
                <td scope="row">{this.props.firstName}</td>
                <td scope="row">{this.props.lastName}</td>
                <td scope="row">{this.props.weeklySteps}</td>
                <td scope="row">{this.returnIconBasedOnPercentage(this.props.pctStepGoal)}</td>
                <td scope="row">{this.props.weeklyWalk}</td>
                <td scope="row">{this.returnIconBasedOnPercentage(this.props.pctWalkGoal)}</td>
            </tr>
        )
    }
}

class PatientDirectory extends React.Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">{"MRN"}</th>
                            <th scope="col">{"First Name"}</th>
                            <th scope="col">{"Last Name"}</th>
                            <th scope="col">{"Weekly Fitbit Steps"}</th>
                            <th scope="col">{"% Fitbit Goal Attained"}</th>
                            <th scope="col">{"Weekly Walkforward Distance"}</th>
                            <th scope="col">{"% Walkforward Goal Attained"}</th>
                        </tr>
                        <PatientRow mrn="881236123" firstName="Elizabeth" lastName="Smith" weeklySteps="24937" pctStepGoal="36%" weeklyWalk="18.86km" pctWalkGoal="51%"/>
                    </thead>
                </table>
            </div>
        )
    }
}

export default PatientDirectory