import React from "react";
import { Link } from "react-router-dom";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: "#"};
        fetch("/getAuthUrl").then(res => res.json())
        .then(res => {
            this.setState({url : res.url});
        })
    }

    render() {
        return (
            <div className="row w-100 d-flex justify-content-center text-center">
            <h1 className="">Patient</h1>
            <div className="row d-flex w-100 h-100 flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column"><a href={this.state.url}>
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