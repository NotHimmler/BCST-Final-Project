import React from "react";
import { Link, withRouter } from "react-router-dom";
import DoctorLogin from "./DoctorLogin";
import PatientLogin from "./PatientLogin";

class Login extends React.Component {
    constructor(props) {
        super(props);
        //Set default login type to be therapist
        this.state = {"loginType": "therapist"}
        this.handlePatientTypeLogin = this.handlePatientTypeLogin.bind(this);
        this.handleTherapistTypeLogin = this.handleTherapistTypeLogin.bind(this);
    }

    handlePatientTypeLogin() {
        this.setState({"loginType": "patient"});
    }

    handleTherapistTypeLogin() {
        this.setState({"loginType": "therapist"});
    }

    generateClassForActiveLoginTab() {
        let classTags = "col-6 text-center bg-dark text-white";

        return classTags;
    }

    render() {
        return (
            <div className="row d-flex flex-column h-100 justify-content-center align-items-center">
                <h2>Who wants to login?</h2>
                <div className="row w-100 mb-2">
                    <div className={ this.state.loginType == "therapist" ? this.generateClassForActiveLoginTab() : "col-6 text-center"} onClick={this.handleTherapistTypeLogin} style={{cursor: "pointer"}}>Therapist</div>
                    <div className={ this.state.loginType == "patient" ? this.generateClassForActiveLoginTab() : "col-6 text-center"} onClick={this.handlePatientTypeLogin} style={{cursor: "pointer"}}>Patient</div>
                </div>
                <div className="row">
                    { this.state.loginType == "therapist" ? <DoctorLogin sessionStore={this.props.sessionStore} history={this.props.history}/> : <PatientLogin sessionStore={this.props.sessionStore}  history={this.props.history}/>}
                </div>
            </div>
        )
    }
}

export default Login;