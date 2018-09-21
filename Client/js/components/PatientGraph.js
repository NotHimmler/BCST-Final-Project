import React from "react";
import { Link } from "react-router-dom";

import FitbitTable from '../components/FitbitTable'
import WalkTable from '../components/WalkTable'
import AmountTable from '../components/AmountTable'

class PatientGraph extends React.Component {

    render() {
        return (
            <div>
                <FitbitTable/>
                <AmountTable/>
                <WalkTable/>

            </div>
        )
    }
}

export default PatientGraph;