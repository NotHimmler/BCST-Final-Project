import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div className="row d-flex w-100 home-row">
                <div className="row d-flex flex-column text-center bg-dark w-100">
                    <h1 className="text-white d-block">Health Dashboard</h1>
                    <br />
                    <p className="text-white">Hello, everyone! This is the home page of the dashboard!</p> 
                 </div>
          
                <div className="row w-100 mt-1">
                    <div className="col-md-6">
                        <Link to="/physiotherapistLogin">
                        <img href="#" src = "/img/doctor.jpg" className = "rounded-circle img-circle" />
                        <p className="text-center word">Physiotherapist</p>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/patientLogin">
                        <img href="#" src = "/img/patient.jpg" className = "rounded-circle img-circle" />
                        <p className="text-center word">Patient</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;