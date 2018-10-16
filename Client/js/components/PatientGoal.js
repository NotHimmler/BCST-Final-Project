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
            showModal: false
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ showModal: false });
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

            <GoalModal show={this.state.showModal} onHide={this.handleClose}/>

          </div>
        )
    }
}

export default PatientGoal;