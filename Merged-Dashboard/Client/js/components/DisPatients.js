import React from "react";
import { Link } from "react-router-dom";

import PatientList from "../components/PatientList";


class DisPatients extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keywords: ''
        };
      }

    render() {
        return (
            <div>
            <div className="page-title">
                <div className="title_left">
                <h3>Discharged Patients</h3>
                </div>

                <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <div className="input-group">
                    <input id="patient-search-box" type="text" className="form-control" placeholder="Search for..."
                    value={this.state.keywords} onInput={
                        data => this.setState({keywords: data.target.value})}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                    </span>
                    </div>
                </div>
                </div>
            </div>

            <div className="clearfix"></div>
            <PatientList archived={true} searchKeywords={this.state.keywords}/>
            </div>
        )
    }
}

export default DisPatients;