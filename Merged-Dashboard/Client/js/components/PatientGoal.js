import React from "react";
import { Link } from "react-router-dom";

import GoalForm from '../components/GoalForm'
import GoalTable from '../components/GoalTable'
import GoalList from '../components/GoalList'
import GoalModal from '../components/GoalModal'

class PatientGoal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            newGoal: {},
        };

        this.handleClose = this.handleClose.bind(this);
        this.receiveNewGoal = this.receiveNewGoal.bind(this);

    }

    handleClose() {
        this.setState({ showModal: false });
    }

    receiveNewGoal(val) {
        this.setState({ newGoal: val });
        console.log("New goal has been received:");
        console.log(val);
    }

    render() {
        return (
          <div>
            <button 
              className="btn btn-primary"
              onClick={() => this.setState({ showModal: true })}
            >
              Add Goal
            </button>
            <GoalTable/>
            <GoalList/>
            <GoalForm/>

            <GoalModal show={this.state.showModal} onHide={this.handleClose} handlegoal={this.receiveNewGoal}/>
          </div>
        )
    }
}

export default PatientGoal;