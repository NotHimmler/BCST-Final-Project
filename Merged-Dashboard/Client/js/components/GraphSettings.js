import React from "react";
import { Link } from "react-router-dom";

class GraphSettings extends React.Component {
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <p>Goal Settings here</p>
                <div class="form-group">
                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Select the data you want to view:
                    </label>

                    <div class="col-md-9 col-sm-9 col-xs-12">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value=""/> Fitbit Application data.
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value=""/> AMOUNT Application data.
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value=""/> WALKFORWARD Application data.
                            </label>
                        </div>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default GraphSettings;