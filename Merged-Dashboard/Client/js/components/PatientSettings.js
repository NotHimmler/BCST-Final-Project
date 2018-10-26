import React from "react";
import { Link } from "react-router-dom";

import StatusSettings from '../components/StatusSettings'
import FitbitInvite from '../components/FitbitInvite'


class PatientSettings extends React.Component {
    
    render() {
        return (
            <div id="pat-set-comp">
              <StatusSettings mrn={this.props.mrn} archived={this.props.archived}/>
              {this.props.archived
                ? null
                : <div>
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Connect to Fitbit</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <FitbitInvite mrn={this.props.mrn} hasFitbitToken={this.props.hasFitbitToken}/>
                        </div>
                    </div>
                    </div>
                }
            </div>
        )
    }
}

export default PatientSettings;