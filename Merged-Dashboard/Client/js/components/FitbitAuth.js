import React from "react";
import { Link } from "react-router-dom";

class FitbitAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {token: "", steps: "Getting step data..."};
    }

    componentDidMount() {
        fetch("/getSteps")
        .then(response => response.json())
        .then( response => {
            this.setState({steps: response.steps});
        });
    }

    render() {
        return (
            <div className="row d-flex h-100 w-100 align-items-center justify-content-center">
                <span>Num Steps Today: {this.state.steps}</span>
            </div>
        )
    }
}

export default FitbitAuth;