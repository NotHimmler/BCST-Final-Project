import React from "react";
import { Link } from "react-router-dom";
let $ = require('jquery');

class FitbitAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authURL: false
        }
        
        if (this.props.location.search != "") {
            let params = new URLSearchParams(this.props.location.search)
            let code = params.get('code');
            if(code) {
                this.getToken(code).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                })
            }
            
        } else if(this.props.match.params.mrn) {
            console.log("Waiting for auth code");
            localStorage.fitbitAuthMrn = this.props.match.params.mrn;
        }
    }

    getToken(code) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'/api/fitbit/addFitbitToken',
                type:"post",
                data: JSON.stringify({mrn: localStorage.fitbitAuthMrn, code: code}),
                contentType:"application/json;charset=utf-8",
                success: (data) => {
                    console.log("Data successfuly sent");
                },
                error: (data) => {
                    console.log("Error sending data to server");
                }
            })
        })
    }

    componentDidMount() {
        fetch('/api/fitbit/getAuthURL')
        .then(data => {
           return data.json();
        }).then(data => {
            this.setState({authURL: data.url}); 
        })
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                {this.state.authURL ? <a href={this.state.authURL}>Link</a> : null}
            </div>
        )
    }
}

export default FitbitAuth;