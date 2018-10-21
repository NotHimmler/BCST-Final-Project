import React from "react";
import { Link } from "react-router-dom";
let $ = require('jquery');

class FitbitAuth extends React.Component {
    constructor(props) {
        super(props);
        
        
        if (this.props.location.search != "") {
            let params = new URLSearchParams(this.props.location.search)
            let code = params.get('code');
            if(code) {
                this.getAuthBasic().then(data => {
                    console.log(data);
                    this.getToken(code, data).then(data => {
                        const token = data.access_token;
                        const refreshToken = data.refresh_token;
                        this.sendTokenToServer(token, refreshToken);
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else if(token) {

            }
            
            
        } else if(this.props.match.params.mrn) {
            console.log("Waiting for auth code");
            localStorage.fitbitAuthMrn = this.props.match.params.mrn;
        }
    }

    sendTokenToServer(token, refreshToken) {
        $.ajax({
            url:'/api/fitbit/addFitbitToken',
            type:"post",
            data: JSON.stringify({mrn: localStorage.fitbitAuthMrn, token: token, refreshToken: refreshToken}),
            contentType:"application/json;charset=utf-8",
            success: (data) => {
                console.log("Data successfuly sent");
            },
            error: (data) => {
                console.log("Error sending data to server");
            }
        })
    }

    getAuthBasic() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'/api/fitbit/getAuthBasic',
                type: 'get',
                contentType:"application/json;charset=utf-8",
                success: (data) => {
                    resolve(data);
                },
                error: (data) => {
                    reject({error: "Error"})
                }
            })
        })
    }

    getToken(code, basicAuth) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.fitbit.com/oauth2/token?clientId=22CZMN&grant_type=authorization_code&redirect_uri=http://localhost:8080/fitbitAuth/&code=" + code,
                type: "POST",
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Basic " + basicAuth)
                },
                contentType: "application/x-www-form-urlencoded",
                success: (data) => {
                    resolve(data)
                },
                error: (data) => {
                    reject(data);
                }
            })
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
                <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CZMN&redirect_uri=http://localhost:8080/fitbitAuth/&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">Link</a>
            </div>
        )
    }
}

export default FitbitAuth;