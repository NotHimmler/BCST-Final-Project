import React from "react";
import { Link } from "react-router-dom";

import FitbitChart from '../components/Charts/FitbitChart'
import WalkTable from '../components/WalkTable'
import AmountTable from '../components/AmountTable'
import WalkAppTable from '../components/WalkAppTable'

class PatientGraph extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row w-100">
                <FitbitChart 
                    mrn={this.props.mrn} 
                    lastName={this.props.lastName} 
                    hasFitbitToken={this.props.hasFitbitToken}
                    onExpiredToken={this.props.onExpiredToken}
                />
                <AmountTable mrn={this.props.mrn} lastName={this.props.lastName}/>
                <WalkTable mrn={this.props.mrn} lastName={this.props.lastName}/>
                <WalkAppTable mrn={this.props.mrn} />
            </div>
        )
    }
}

export default PatientGraph;