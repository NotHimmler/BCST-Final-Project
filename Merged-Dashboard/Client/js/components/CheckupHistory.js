import React from "react";
import { Link } from "react-router-dom";
import {generateCheckupHistoryRows} from '../utils/CheckupHistoryUtils';
const moment = require('moment');

class CheckupHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            rows: [],
        }
    }

    componentDidMount() {
        this.getNotesForUser();
    }

    getNotesForUser() {
        let user = this.props.user;
        let mrn = this.props.mrn;
        let url = `/api/notes/getNotes/user/${user}/${mrn}`
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        fetch(url, options)
        .then(data => {
            return data.json();
        }).then(data => {
            if (data.data == undefined) return;
            let rowData = data.data;
            let rows = generateCheckupHistoryRows(rowData);
            this.setState({rows: rows})
        }).catch(err => {
            this.setState({
                rows: "Failed to retrieve checkup notes"
            })
        })
    }
    
    render() {
        return (
            <div id="chkup-notes-comp">
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                {this.state.rows}
            </div>
        )
    }
}

export default CheckupHistory;