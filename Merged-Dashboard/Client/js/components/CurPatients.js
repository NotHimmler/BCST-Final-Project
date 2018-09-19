import React from "react";
import { Link } from "react-router-dom";

import PatientCard from "../components/PatientCard";


class CurPatients extends React.Component {
    
    render() {
        return (
            <div>
            <div class="page-title">
                <div class="title_left">
                <h3>In Patients</h3>
                </div>

                <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..."/>
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">Go!</button>
                    </span>
                    </div>
                </div>
                </div>
            </div>

            <div class="clearfix"></div>
            <PatientCard/>
            </div>
        )
    }
}

export default CurPatients;