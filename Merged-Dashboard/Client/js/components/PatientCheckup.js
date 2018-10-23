import React from "react";
import { Link } from "react-router-dom";
const moment = require('moment');

class PatientCheckup extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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
                this.props.checkupUpdate(this.props.mrn);
                this.props.setContent("Data");
            }
        })
    }

    handleInputChange(event) {
        const noteValue = event.target.value;
        this.setState({note: noteValue});
    }
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                <h2>Patient Checkup</h2>
                <h4>{(new Date()).toLocaleDateString()}</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Checkup Notes<br />
                    <textarea name="notes" style={{width: "100%"}} onChange={this.handleInputChange} value={this.state.note}></textarea>
                    </label>
                    <button type="submit">Complete Checkup</button> <button onClick={() => this.props.setContent("Data")}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PatientCheckup;