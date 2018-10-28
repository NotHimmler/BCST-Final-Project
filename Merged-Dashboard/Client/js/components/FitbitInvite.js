import React from "react";

class FitbitInvite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inviting: false,
            inviteEmail: "",
            invited: false,
            inviteLink: "",
        }

        this.handleInviteButton = this.handleInviteButton.bind(this);
        this.handleInviteChange = this.handleInviteChange.bind(this);
    }

    handleInviteButton(data, event) {
        if (this.state.inviting && data == "cancel") {
          this.setState({inviting: false})
        } else if (this.state.inviting && data == "invite") {
          if (this.state.inviteEmail != "") {
            
          }
        } else {
    
        }
        this.setState({inviting: !this.state.inviting})
      }
    
    handleInviteChange(event) {
    let host = window.location.host
    let start = "http://"
    if (host == "soft3413-physio-dashboard.herokuapp.com") {
        start = "https://"
    }
    let url = `${start}${host}/fitbitAuth/${this.props.mrn}`
    let href = `mailto:${event.target.value}?subject=Please%20Allow%20Us%20To%20View%20Your%20Fitbit%20Data&body=Hi%2C%0A%0AIn%20order%20to%20better%20help%20you%20with%20your%20needs%2C%20it%20would%20be%20great%20if%20you%20could%20allow%20us%20to%20see%20some%20of%20your%20Fitbit%20data.%20We%20only%20want%20to%20see%20your%20steps%20and%20active%20minutes.%20If%20you'd%20like%20to%20do%20so%2C%20please%20go%20to%20the%20link%20below%20and%20then%20click%20the%20button%20to%20authenticate%20with%20Fitbit.%0A%0A${url}`
    this.setState({inviteEmail: event.target.value, inviteLink: href})
    }
    
    render() {
        return (
            <div>
                { this.props.hasFitbitToken
                    ? <p>Patient is already connected to Fitbit</p>
                    : <div>
                        {this.state.inviting 
                            ? <input autoComplete={"off"} type="email" name="email" value={this.state.inviteEmail} onChange={this.handleInviteChange} placeholder="Patient Email Address" style={{marginRight: "5px", minWidth: "300px"}}/> 
                            : null}
                        <button className="btn btn-success" onClick={() => this.handleInviteButton("cancel")}>
                            {this.state.inviting && this.state.inviteEmail != "" 
                                ? <a href={this.state.inviteLink} style={{color: "white"}}>Send Email</a> 
                                : "Send Patient Invite"}
                        </button> 
                        {this.state.inviting 
                            ? <button className="btn btn-danger" onClick={() => this.handleInviteButton("cancel")}>Cancel</button> 
                            : null} 
                    </div>
                }
            </div>
        )
    }
}

export default FitbitInvite;