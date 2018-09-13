import React from "react";
import { Link } from "react-router-dom";

import FitbitGraph from "./FitbitGraph";
import FitbitGraph2 from "./FitbitGraph2";

class Patient extends React.Component {

    render() {
        return (
            <div>
                <h1><span className="fas fa-user"></span><span className="patient-name">Elizabeth Smith</span></h1>
                <hr/>
                <h4>FitBit Data</h4>
                <FitbitGraph2/>
            </div>
        )
    }
}

export default Patient;