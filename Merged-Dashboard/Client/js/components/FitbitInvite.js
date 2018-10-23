import React from "react";

class FitbitInvite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasToken: false,
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

    componentDidMount() {
        let endpoint = `/api/tokens/mrn/${this.props.mrn}`
        fetch(endpoint)
            .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
            })
            .then(data => {
                if(!data.error){
                    this.setState({hasToken:true});
                }
            })
    }
    
    render() {
        return (
            <div>
                <div className="x_panel">

                    <div className="x_title">
                        <h2>Connect to Fitbit</h2>
                        <div className="clearfix"></div>
                    </div>

                    <div className="x_content">
                        { this.state.hasToken
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
                </div>
            </div>
        )
    }
}

export default FitbitInvite;