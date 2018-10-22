import React from "react";
import { Link } from "react-router-dom";

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
        let url = `/api/notes/addNote/mrn/${this.props.mrn}`
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
                    <button type="submit">Complete Checkup</button>
                </form>
            </div>
        )
    }
}

export default PatientCheckup;