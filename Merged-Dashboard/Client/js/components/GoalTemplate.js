import React from "react";
import { Link } from "react-router-dom";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import $ from "jquery";

class GoalTemplate extends React.Component {

    constructor(props) {
        super(props);
    }

    submitHandler(e) {
        e.preventDefault();
        let formItemIdList = ['start', 'end', 'activity', 'measurement', 'freq_val', 'freq_unit', 'per'];
        let requestOption = this.getRequestOption(formItemIdList);
        console.log(requestOption);
    }

    getRequestOption(formItemIdList) {
        let option = {};
        formItemIdList.forEach(id => {
            let inputValue = $(`#${id}`).val();
            if (inputValue) {
                option[id] = inputValue;
            }
        });
        return option;
    }

    getGoalFreqStr() {

    }
    
    render() {
        return (
            <div>
                <p>Create a goal using the goal template</p>
                <form onSubmit={this.submitHandler.bind(this)}>
                    <FormGroup controlId="start">
                        <ControlLabel>Goal Start*</ControlLabel>
                        <FormControl
                            type="date"
                        />
                    </FormGroup>
                    <FormGroup controlId="end">
                        <ControlLabel>Goal End*</ControlLabel>
                        <FormControl
                            type="date"
                        />
                    </FormGroup>
                    <FormGroup controlId="activity">
                        <ControlLabel>Goal Activity*</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="To ..."
                        />
                    </FormGroup>

                    <FormGroup controlId="goalMeasurement">
                        <ControlLabel>Goal Measurement</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="none">-</option>
                            <option value="select">at least</option>
                            <option value="other">in under</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="measurement">
                        <FormControl
                            type="text"
                            placeholder="Enter value here"
                        />
                    </FormGroup>

                    <FormGroup controlId="goalMeasurement3">
                        <FormControl componentClass="select" placeholder="select">
                            <option value="none">-</option>
                            <option value="times">time(s)</option>
                            <option value="steps">step(s)</option>
                            <option value="ms">metre(s)</option>
                            <option value="kms">kilometre(s)</option>
                            <option value="secs">second(s)</option>
                            <option value="pts">point(s)</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="goalFrequency">
                        <ControlLabel>Goal Frequency</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="none">-</option>
                            <option value="select">at least</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="freq_val">
                        <FormControl
                            type="text"
                            placeholder="Enter value here"
                        />
                    </FormGroup>

                    <FormGroup controlId="freq_unit">
                        <FormControl componentClass="select" placeholder="select">
                            <option value="none">-</option>
                            <option value="times">time(s)</option>
                            <option value="days">day(s)</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="per">
                        <p>per</p>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="none">-</option>
                            <option value="day">day</option>
                            <option value="week">week</option>
                            <option value="month">month</option>
                        </FormControl>
                    </FormGroup>
                    <button className="btn btn-primary" type="submit" value="Submit">Review Goal</button>
                </form>
            </div>
        )
    }
}

export default GoalTemplate;