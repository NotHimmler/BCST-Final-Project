import React from "react";
import { Link } from "react-router-dom";

class Physician extends React.Component {
    render() {
        return (
            <div className="row d-flex flex-column w-100 h-100">
            <div className="patients">
            <h3 className="text-center">Current Patients</h3>
            <div className="btn-group-vertical">
                <button type="button" className="btn btn-dark">Patient 1</button>
                <button type="button" className="btn btn-dark">Patient 2</button>
                <button type="button" className="btn btn-dark">Patient 3</button>
                <button type="button" className="btn btn-dark">Patient 4</button>
                <button type="button" className="btn btn-dark">Patient 5</button>
                <button type="button" className="btn btn-dark">Patient 6</button>
                <button type="button" className="btn btn-dark">+</button>
            </div>
            <h3 className="text-center">Patients Completed</h3>
            <div className="btn-group-vertical">
                <button type="button" className="btn btn-dark">Patient 1</button>
                <button type="button" className="btn btn-dark">Patient 2</button>
                <button type="button" className="btn btn-dark">Patient 3</button>
                <button type="button" className="btn btn-dark">Patient 4</button>
                <button type="button" className="btn btn-dark">Patient 5</button>
                <button type="button" className="btn btn-dark">Patient 6</button>
                <button type="button" className="btn btn-dark">+</button>
            </div>
            </div>

            <div className = "doctor-home">
                <img src = "../img/doctor-home.jpg" />
            </div>

            <div className = "technology">
                <h3 className="text-center">Technology</h3>
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-dark">Fitbit</button>
                    <button type="button" className="btn btn-dark">Garmin</button>
                    <button type="button" className="btn btn-dark">ActivPAL</button>
                    <button type="button" className="btn btn-dark">Fysiogaming</button>
                    <button type="button" className="btn btn-dark">AMOUNT APP</button>
                    <button type="button" className="btn btn-dark">Walkforward APP</button>
                    <button type="button" className="btn btn-dark">Runkeeper APP</button>
                    <button type="button" className="btn btn-dark">+ ADD TECHNOLOGY</button>
                </div>
            </div>
            </div>
        )
    }
}

export default Physician;