import React from "react";
import { Link } from "react-router-dom";
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
        console.log(this.props.user);
        this.getNotesForUser();
    }

    getNotesForUser() {
        let user = this.props.user;
        let url = `/api/notes/getNotes/user/${user}`
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
            let rows = data.data.map(item => {
                return (<div style={{border: "1px solid #73879C", borderRadius: "5px", margin: "5px 0"}}>
                    <div style={{backgroundColor: "#73879C", color: "white", padding: "5px"}}><h4 style={{display: "inline-block"}}>{moment(Number(item.date)).format("dddd, MMM Do YYYY")}</h4> by <h5 style={{display: "inline-block"}}>{item.user}</h5><br/></div>
                    <div style={{padding: "5px"}}>{item.note}</div>
                    </div>)
            })
            this.setState({rows: rows})
        })
    }
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                {this.state.rows}
            </div>
        )
    }
}

export default CheckupHistory;