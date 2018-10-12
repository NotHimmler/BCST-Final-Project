import React from "react";
import { Link } from "react-router-dom";

class AddPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mrn: "",
            firstName: "",
            lastName: "",
            ward: "",
            amount: false,
            fitbit: false,
            watb: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        //Make a call to the back-end then redirect to patient page
    }

    render() {
        return (
            <div id="add-patient-form">
                <h2>Add New Patient</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>MRN:<br /><input type="text" name="mrn" value={this.state.mrn} onChange={this.handleInputChange}></input></label><br />
                    <label>Ward:<br /><input type="text" name="ward" value={this.state.ward} onChange={this.handleInputChange}></input></label><br />
                    <label>First Name:<br /><input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input></label><br />
                    <label>Last Name:<br /><input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input></label><br />
                    <br />
                    <label>Treatments:</label><br />
                    
                    <label><input type="checkbox" name="amount" checked={this.state.amount} onChange={this.handleInputChange}/> AMOUNT</label><br />
                    <label><input type="checkbox" name="fitbit" checked={this.state.fitbit} onChange={this.handleInputChange}/> Fitbit</label><br />
                    <label><input type="checkbox" name="watb" checked={this.state.watb} onChange={this.handleInputChange}/> WalkAroundTheBlock</label><br />
                    <br />
                    <div style={{"display":"flex", "justifyContent": "center", "width": "100%"}}>
                    <input type="submit" value="Submit"/>
                    </div>
                </form>

            </div>
        )
    }
}

export default AddPatient;