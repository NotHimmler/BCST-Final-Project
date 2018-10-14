import React from "react";
import { Link } from "react-router-dom";

class StatusSettings extends React.Component {
    
    render() {
        return (
            <div>
              <div className="x_panel">
                <div className="x_title">
                  <h2>Change Patient Status</h2>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content">
                {
                  this.props.archived
                  ? <div className="btn btn-success" 
                    onClick={() => { if (window.confirm('Are you sure you wish to re-admit this patient?')) this.onCancel(item) } }>
                      Re-admit Patient</div>
                  : <div className="btn btn-success"
                  onClick={() => { if (window.confirm('Are you sure you wish to archive this patient?')) this.onCancel(item) } }>
                      Archive Patient</div>
                }
                  
                </div>
              </div>
            </div>
        )
    }
}

export default StatusSettings;