import React from "react";
import { Link } from "react-router-dom";

import FitbitTable from '../components/FitbitTable'

class ExamplePatient extends React.Component {

    render() {
        return (
            <div>
              <div className="btn-group patient-toggle">
                <button type="button" className="btn btn-primary" id="summary">Summary</button>
                <button type="button" className="btn btn-primary" id="graphs">Graphs</button>
                <button type="button" className="btn btn-primary" id="goals">Goals</button>
              </div>
              <div className="">
                <div className="page-title">
                  <div className="title_left">
                    <h3>Patient D01 | Overview</h3>
                  </div>
                </div>
                <div className="clearfix"></div>
                </div>

                {/*FITBIT TABLE*/}
                <FitbitTable/>


            </div>
        )
    }
}

export default ExamplePatient;