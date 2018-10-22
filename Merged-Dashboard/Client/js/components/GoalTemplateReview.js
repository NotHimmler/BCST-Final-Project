import React from "react";
import { Link } from "react-router-dom";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class GoalTemplate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            goalString : "Edit goal here..."
        }
    }

    submitHandler() {

    }
    
    render() {
        return (
            <div>
                <p>Review goal</p>
                <form onSubmit={this.props.addGoalHandler}>
                    <FormGroup controlId="reviewGoal">
                        <FormControl
                            type="textarea"
                            placeholder="Edit goal ..."
                            value={this.props.goalString} 
                        />
                    </FormGroup>
                    <button className="btn btn-primary" type="submit" value="Submit">Add Goal</button>
                </form>
            </div>
        )
    }
}

export default GoalTemplate;