import React from "react";
import { Link } from "react-router-dom";

class Patient extends React.Component {
    render() {
        return (
            <div className="row w-100 d-flex justify-content-center text-center">
            <h1 className="">Patient</h1>
            <div className="row d-flex w-100 h-100 flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column"><a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CYWW&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fphysio-dashboard&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
                    <img className="fitbit-logo" src="https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/112015/fitbit_logo.png" />
                    <br />
                    Login with fitbit
                </a></div>
            </div>
            </div>
        )
    }
}

export default Patient;