import React from "react";
import { Link } from "react-router-dom";

import StatusSettings from '../components/StatusSettings'
import FitbitInvite from '../components/FitbitInvite'


class PatientSettings extends React.Component {
    
    render() {
        return (
            <div>
              <StatusSettings mrn={this.props.mrn} archived={this.props.archived}/>
              {this.props.archived
                ? null
                : <FitbitInvite mrn={this.props.mrn}/>}
            </div>
        )
    }
}

export default PatientSettings;