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
    let href = `mailto:${this.state.inviteEmail}?subject=Please Connect Your Fitbit For Therapist&body=http://localhost:8080/fitbitAuth/${this.props.mrn}`
    this.setState({inviteEmail: event.target.value, inviteLink: href})
    }
    
    render() {
        return (
            <div>
                { this.props.hasFitbitToken
                    ? <p>Patient is already connected to Fitbit</p>
                    : <div>
                        {this.state.inviting 
                            ? <input autoComplete={"off"} type="email" name="email" value={this.state.inviteEmail} onChange={this.handleInviteChange} /> 
                            : null}
                        <button className="" onClick={() => this.handleInviteButton("cancel")}>
                            {this.state.inviting && this.state.inviteEmail != "" 
                                ? <a href={this.state.inviteLink}>Send Email</a> 
                                : "Send Patient Invite"}
                        </button> 
                        {this.state.inviting 
                            ? <button className="" onClick={() => this.handleInviteButton("cancel")}>Cancel</button> 
                            : null} 
                    </div>
                }
            </div>
        )
    }
}

export default FitbitInvite;