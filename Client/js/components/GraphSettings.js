import React from "react";
import { Link } from "react-router-dom";

class GraphSettings extends React.Component {
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <div className="x_panel">
                <div className="x_title">
                    <h2>Data Settings</h2>
                    <div className="clearfix"></div>            
                </div>
                <div className="x_content">
                    <div className="form-group">
                        <label className="col-md-3 col-sm-3 col-xs-12 control-label">Select the data you want to view:
                        </label>

                        <div className="col-md-9 col-sm-9 col-xs-12">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/> Fitbit Application data.
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/> AMOUNT Application data.
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/> WALKFORWARD Application data.
                                </label>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>

              </div>

                
            </div>

        )
    }
}

export default GraphSettings;