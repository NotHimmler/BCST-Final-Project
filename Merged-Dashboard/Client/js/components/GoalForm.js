import React from "react";
import { Link } from "react-router-dom";

class GoalForm extends React.Component {

    render() {
        return (
            <div>
                <div className="clearfix"></div>
                    <div className="x_panel">
                    <div className="x_title">
                      <h2>Goals Setting</h2>
                      <div className="clearfix"></div>
                      </div>
                    <div className="x_content">
                    <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">

            	  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="select_weekly">Select <span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <select className="form-control" id="select_weekly" name="select_weekly">
                        	<option>Weekly</option>
                            <option>Monthly</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="date_goal_set">Date Goal Set <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input type="date" id="date_goal_set" name="date_goal_set" required="required" className="form-control col-md-7 col-xs-12"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="goal_type">Select Goal type <span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <select className="form-control" id="goal_type" name="goal_type">
                        	<option>Global Goal</option>
                            <option>Sub Goal</option>
                        </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="goal_statement">Goal Statement <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input type="text" id="goal_statement" name="goal_statement" required="required" className="form-control col-md-7 col-xs-12"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="review_date">Review Date <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input type="date" id="review_date" name="review_date" required="required" className="form-control col-md-7 col-xs-12"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-9 col-md-offset-3">
                      <button type="submit" className="btn btn-primary">Cancel</button>
                      <button type="button" className="btn btn-success" /* onClick="" */>Submit</button>
                    </div>
                  </div>

                  </form>
                    </div>
                    </div>
                </div>
        )
    }
}

export default GoalForm;