import React from "react";
import { Link } from "react-router-dom";

import GraphSettings from '../components/GraphSettings'
import StatusSettings from '../components/StatusSettings'


class PatientSettings extends React.Component {
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <GraphSettings/>
              <StatusSettings mrn={this.props.mrn} archived={this.props.archived}/>

            </div>
        )
    }
}

export default PatientSettings;