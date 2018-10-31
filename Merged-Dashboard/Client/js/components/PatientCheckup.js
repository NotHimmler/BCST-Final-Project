import React from "react";
import { Link } from "react-router-dom";
const moment = require('moment');

class PatientCheckup extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateLastCheckup = this.updateLastCheckup.bind(this);

        this.state = {
            note: "",
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.note == "") return;
        let url = `/api/notes/addNote/mrn/${this.props.mrn}`
        
        let body = {note: this.state.note, date: moment().valueOf(), mrn: this.props.mrn, user: this.props.user}
        console.log(body);
        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(data => {
           return data.json()
        }).then(data => {
            if (data.okay) {
                this.updateLastCheckup(this.props.mrn);
                this.props.setContent("Data");
                this.props.updateCheckup(new Date());
            }
        }).catch(err => {
            //Handle error here
        })
    }

    handleInputChange(event) {
        const noteValue = event.target.value;
        this.setState({note: noteValue});
    }

    // Update last checkup
    updateLastCheckup(mrn) {
        if (this.state.note == "") return;
        let endpoint = `/api/patient/updateLastCheckup`;
        let patientInfo = {
        username: this.props.user,
        mrn
        }
        let option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({patientInfo})
        }
        fetch(endpoint,option)
        .then(response => {
        if (response.status !== 200) {
            return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
        })
        .then(data => {
        console.log(data);
        }).catch(err => {
            //Handle error here
        });
    }
    
    render() {
        return (
            <div id="pat-chckup-comp">
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                <h2>Patient Checkup</h2>
                <h4>{(new Date()).toLocaleDateString()}</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Checkup Notes<br />
                    <textarea name="notes" style={{width: "100%"}} onChange={this.handleInputChange} value={this.state.note}></textarea>
                    </label>
                    <button className="btn btn-success" type="submit" disabled={this.state.note == ""}>Complete Checkup</button> <button className="btn btn-danger" id="chkup-cancel-btn" onClick={() => this.props.setContent("Data")}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PatientCheckup;