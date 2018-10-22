import React from "react";
import { Link } from "react-router-dom";

import StatusSettings from '../components/StatusSettings'


class PatientSettings extends React.Component {
    
    render() {
        return (
            <div>
              <StatusSettings mrn={this.props.mrn} archived={this.props.archived}/>

            </div>
        )
    }
}

export default PatientSettings;