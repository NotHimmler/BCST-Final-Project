import React from "react";
import { Link } from "react-router-dom";

import FitbitTable from '../components/FitbitTable'
import WalkTable from '../components/WalkTable'
import AmountTable from '../components/AmountTable'
import WalkAppTable from '../components/WalkAppTable'

class PatientGraph extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <FitbitTable/>
                <AmountTable/>
                <WalkTable/>
                <WalkAppTable mrn={this.props.mrn} />
            </div>
        )
    }
}

export default PatientGraph;