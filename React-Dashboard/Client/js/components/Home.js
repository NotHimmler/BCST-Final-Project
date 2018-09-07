import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div className="row d-flex w-100 home-row">
                <div className="row d-flex flex-column text-center w-100">
                    <h1 className="d-block">Physio Dashboard</h1>
                    <br />
                    <p className="">Hello, everyone! This is the home page of the dashboard!</p> 
                 </div>
            </div>
        )
    }
}

export default Home;