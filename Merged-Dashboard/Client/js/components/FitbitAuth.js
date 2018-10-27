import React from "react";
import { Link } from "react-router-dom";
let $ = require('jquery');
const fetch = require('cross-fetch');

class FitbitAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authURL: false,
            mrn: this.props.match ? this.props.match.params.mrn : false,
            location: this.props.location ? this.props.location : false
        }
        if(!this.state.location) return;
        if (this.state.location.search != "") {
            let params = new URLSearchParams(this.props.location.search)
            let code = params.get('code');
            console.log(code);
            if(code) {
                this.getToken(code).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                })
            }
            
        } else if(this.state.mrn) {
            
            localStorage.fitbitAuthMrn = this.state.mrn;
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
        }).catch(err => {

        })
    }

    authURLDiv() {
        return (
            <div id="auth-url-box" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Hi!</h2> 
                <p style={{textAlign: "center"}}>Thanks for taking the time to connect your Fitbit Data to the dashboard.<br/>
                    With your Fitbit Data we can be more effective at helping you get the best treatment possible.
                </p>
                <p style={{textAlign: "center"}}>
                    To link your Fitbit, please click the button below and login to the fitbit website when asked.<br />
                    We only want access to your step data and active minutes. We're not snooping around, promise!
                </p>
                <a href={this.state.authURL}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "5px", backgroundColor: "#2A3F54", color: "white", width: "fit-content", borderRadius: "5px"}}>
                    <img src="/img/Fitbit_app_icon.png" style={{width: "30px", height: "30px"}}></img>
                    <span style={{padding: "5px"}}>Connect Your Fitbit</span>
                </div>
                </a>
            </div>
        )
    }

    thanksDiv() {
        return (
            <div id="auth-thanks-box" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Thank You!</h2> 
                <p style={{textAlign: "center"}}>Thanks for taking the time to connect your Fitbit Data to the dashboard.<br/>
                    With your Fitbit Data we can be more effective at helping you get the best treatment possible.
                </p>
            </div>
        )
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%"}}>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                {this.state.mrn ? (this.state.authURL ? this.authURLDiv() : null) : this.thanksDiv()}
            </div>
        )
    }
}

export default FitbitAuth;