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
        let formItemIdList = ['start', 'end', 'activity', 'parent_goal', 'measurement', 'freq_val', 'freq_unit', 'per'];
        let option = this.getRequestOption(formItemIdList);
        let {start, end} = option;
        if(!this.verifyOption(option)){
            return;
        }
        console.log(option);
        option.goal_string = this.getGoalString(option);
        option.start = new Date(start);
        option.end = new Date(end);
        this.props.reviewGoal(option);
    }

    verifyOption(option) {
        let {start, end, activity} = option;
        if(!start || !end || !activity){
            return false;
        } 
        return true;
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

    getGoalString(option) {
        let str = option.activity;
        var goalMeasurement = $('#goalMeasurement').val();
        let measurement = option.measurement;
        var goalMeasurementUnit = $('#goalMeasurementUnit').val();
        if(goalMeasurement && goalMeasurementUnit && measurement) {
            str += ` ${goalMeasurement} ${measurement} ${goalMeasurementUnit}`;
        }
        
        let goalFrequency = $('#goalFrequency').val();
        let freqVal = option.freq_val;
        let freqUnit = option.freq_unit;
        let per = option.per;
        if(goalFrequency && freqVal && freqUnit){
            str += ` ${goalFrequency} ${freqVal} ${freqUnit}`;
        }
        if(per){
            str += ` per ${per}`
        }
        //str += ` from ${option.start} to ${option.end}`;
        
        return str;
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
                    <FormGroup controlId="parent_goal">
                        <ControlLabel>Global Goal</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="">-</option>
                            {
                                this.props.globalGoals.map(goal=>{
                                    return <option className="option-overflow" value={goal.goal_id}><p>{goal.goal_string}</p></option>
                                })
                            }
                        </FormControl>
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
                            <option value="">-</option>
                            <option value="at least">at least</option>
                            <option value="in under">in under</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="measurement">
                        <FormControl
                            type="text"
                            placeholder="Enter value here"
                        />
                    </FormGroup>

                    <FormGroup controlId="goalMeasurementUnit">
                        <FormControl componentClass="select" placeholder="select">
                            <option value="">-</option>
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
                            <option value="">-</option>
                            <option value="at least">at least</option>
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
                            <option value="">-</option>
                            <option value="times">time(s)</option>
                            <option value="days">day(s)</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="per">
                        <p>per</p>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="">-</option>
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