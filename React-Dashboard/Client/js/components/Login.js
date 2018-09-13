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
                <h2>Log In</h2>
                <DoctorLogin sessionStore={this.props.sessionStore} history={this.props.history}/>
            </div>
        )
    }
}

export default Login;