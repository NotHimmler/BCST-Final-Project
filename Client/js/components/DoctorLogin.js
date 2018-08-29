import React from "react";
import { Link, withRouter } from "react-router-dom";
import SessionStore from "../stores/SessionStore";

class DoctorLogin extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sessionStore.setLoggedIn(true);
        this.props.history.push("physician");
    }

    render() {
        return (
            <div className="row d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                <h2 className="mb-3">Physiotherapist Login</h2>
                <form onSubmit={this.handleSubmit}>
                <div className="row d-flex justify-content-center">
                    <div className= "col-6 d-flex flex-column align-items-end pr-1">
                        <label htmlFor="email">Email Address:</label>
                        <label htmlFor="password">Password: </label>
                    </div>
                    <div className= "col-6 d-flex flex-column align-items-start pl-1">
                        <input type="text" name="email"></input>
                        <input type="password"></input>
                    </div>
                    <button id="doctor-login-submit" className="mt-2" type="submit" name="submit">Submit</button>
                </div>
                </form>
            </div>
        )
    }
}

export default DoctorLogin;