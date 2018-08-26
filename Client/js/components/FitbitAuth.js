import React from "react";
import { Link } from "react-router-dom";

class FitbitAuth extends React.Component {
    render() {
        let code = this.props.location.search;
        code = code.replace("?code=", "");
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic MjJDWVdXOjM5YzVkMmQwYWU2NDAwMjQ5MjgyOGIyYzczMDgyZmYy');
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var myInit = { method: 'POST',
               headers: myHeaders
             };
        console.log(code);
        fetch("https://api.fitbit.com/oauth2/token?clientId=22CYWW&grant_type=authorization_code&redirect_uri=http://localhost:8080/physio-dashboard&code="+code, myInit).then(function(response) {
            console.log(response);    
        });
        /*
        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
        fetch("https://api.fitbit.com/1/user/-/profile.json", myInit).then(function(response) {
            console.log(response);    
        });
        */
        return (
            <div className="row">

            </div>
        )
    }
}

export default FitbitAuth;