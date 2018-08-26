import React from "react";
import { Link } from "react-router-dom";

class AddFitbit extends React.Component {
    render() {
        return (
            <div className="row d-flex justify-content-center align-items-cetner">
                <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CYWW&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fphysio-dashboard&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
                    Login with fitbit
                </a>
            </div>
        )
    }
}

export default AddFitbit;