import React from "react";
import { Link } from "react-router-dom";

import FitbitGraph from "./FitbitGraph";

class Patient extends React.Component {

    render() {
        return (
            <div>
                <h1><span className="fas fa-user"></span><span className="patient-name">{this.props.match.params.name}</span></h1>
                <hr/>
                <FitbitGraph/>
            </div>
        )
    }
}

export default Patient;