import React from "react";
import { Link } from "react-router-dom";
global.fetch = global.fetch ? global.fetch : require("cross-fetch");
class StatusSettings extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      placeholder: "Loading..."
    };

    this.handleArchive = this.handleArchive.bind(this);
    this.handleReadmit = this.handleReadmit.bind(this);
  }
  changePatientStatus(mrn, is_archived) {
    let endpoint = "/api/patient/changePatientStatus";
    let patientInfo = {
      mrn: mrn,
      is_archived: is_archived
    };
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ patientInfo })
    };
    fetch(endpoint, option).then(res => {
      if (res.status !== 200) {
        return "Somethong goes wrong.";
      }
      return res.json();
    }).catch(err => {
      //Handle error here
    });
  }

  handleArchive() {
    if (window.confirm("Are you sure you wish to archive this patient?")) {
      // this.printProps()
      // this.onCancel();
      this.changePatientStatus(this.props.mrn, this.props.archived);
      window.location.reload();
    }
  }

  handleReadmit() {
    if (window.confirm("Are you sure you wish to re-admit this patient?")) {
      this.changePatientStatus(this.props.mrn, this.props.archived);
      window.location.reload();
      // this.printProps()
    }
  }

  printProps() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <div className="x_panel">
          <div className="x_title">
            <h2>Change Patient Status</h2>
            <div className="clearfix" />
          </div>
          <div className="x_content">
            {this.props.archived ? (
              <div
                id="readmit-btn"
                className="btn btn-success"
                onClick={this.handleReadmit}
              >
                Re-admit Patient
              </div>
            ) : (
              <div
                id="archive-btn"
                className="btn btn-success"
                onClick={this.handleArchive}
              >
                Archive Patient
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StatusSettings;
