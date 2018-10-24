import React from "react";
import { Link } from "react-router-dom";
import browserHistory from "react-router";
var $ = require('jquery');
import fetch from "cross-fetch";

global.fetch = fetch;

class AddPatient extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mrn: "",
            firstName: "",
            lastName: "",
            ward: "",
            age: 0,
            gender: "F",
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

        //Call the passsed onSubmit function for testing
        if (this.props.onSubmit) this.props.onSubmit(this.state);
        //Make a call to the back-end then redirect to patient page
        let data = JSON.stringify({patientInfo: this.state});
        fetch('/api/patient/addPatient', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        }).then(data => {
            return data.json();
        }).then(data => {
            console.log(data);
            let error = data.error;
            if (error) {
                this.setState({
                    errorMessage:error
                });
            }else{
                this.setState({
                    redirect:true
                })
                window.location.href = `/patient/${this.state.mrn}`
            }
        }).catch(err => {
            //console.log(err);
        })
        /**
        $.ajax({
            url:'/api/patient/addPatient',
            type:"post",
            data:data,
            contentType:"application/json;charset=utf-8",
            success: (data)=>{
				console.log(data);
				let error = data.error;
                if (error) {
					this.setState({
						errorMessage:error
					});
                }else{
					this.setState({
						redirect:true
                    })
                    window.location.href = `/patient/${this.state.mrn}`
				}
            }
        });
        */
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
                    <label>Age:<br /><input type="number" name="age" value={this.state.age} onChange={this.handleInputChange}></input></label><br />
                    <label>Gender:<br />
                        <select name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        </select>
                    </label><br />
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