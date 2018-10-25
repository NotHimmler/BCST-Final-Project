import React from "react";
import moment from 'moment';

import GlobalGoal from '../components/GoalTable'
import GoalModal from '../components/GoalModal'

const testGoal = {
    start: moment("2018-10-04"),
    activity: "To walk independently to and from Bankstown train station from your home (~1km away) at least once per week to access community group activites within 5 months.",
    end: moment("2018-11-04"),
}

class PatientGoal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            loaded: false,
            placeholder: 'loading...',
            newGoal: {},
            goalList: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.receiveNewGoal = this.receiveNewGoal.bind(this);
    }

    componentDidMount() {
        // Get all global goals
        const mrn = this.props.mrn;
        const endpoint = `/api/goal/global/mrn/${mrn}`;
        // Get goal list
        fetch(endpoint)
        .then(response => {
          if (response.status !== 200) {
            return this.setState({
              loaded: true,
              placeholder: "Something went wrong" 
              });
          }
          return response.json();
        })
        .then(goalList => {
            console.log(goalList);
          this.setState({
            loaded: true,
            goalList: goalList,
          });
        });
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
            <br/>
            {(this.state.loaded) ?
                this.state.goalList.map(goal => {
                    return <GlobalGoal key={goal.goal_id} goal={goal}/>
                })
                : <p>{this.state.placeholder}</p>
            }
            {/* <GoalList  mrn={this.props.mrn} goalList={this.state.goalList} updateGoalState={this.updateState.bind(this)}/> */}
            <GoalModal mrn={this.props.mrn} show={this.state.showModal} onHide={this.handleClose} 
                handlegoal={this.receiveNewGoal} 
                 addGoal={this.addGoal.bind(this)}/>
          </div>
        )
    }
}

export default PatientGoal;