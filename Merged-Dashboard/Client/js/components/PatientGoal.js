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
            goalList: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.receiveNewGoal = this.receiveNewGoal.bind(this);

    }

    updateState(option) {
        this.setState(option);
    }

    addGoal(goal) {
        let {goalList} = this.state;
        goalList.push(goal);
        this.setState({goalList});
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
            <GoalList  mrn={this.props.mrn} goalList={this.state.goalList} updateGoalState={this.updateState.bind(this)}/>
            <GoalModal mrn={this.props.mrn} show={this.state.showModal} onHide={this.handleClose} 
            handlegoal={this.receiveNewGoal} 
            addGoal={this.addGoal.bind(this)}/>
          </div>
        )
    }
}

export default PatientGoal;