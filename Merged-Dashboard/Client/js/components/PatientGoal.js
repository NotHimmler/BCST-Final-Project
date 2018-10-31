import React from "react";
import moment from "moment";

import GlobalGoal from "../components/GoalTable";
import GoalModal from "../components/GoalModal";

const testGoal = {
  start: moment("2018-10-04"),
  activity:
    "To walk independently to and from Bankstown train station from your home (~1km away) at least once per week to access community group activites within 5 months.",
  end: moment("2018-11-04")
};

class PatientGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loaded: false,
      placeholder: "loading...",
      newGoal: {},
      goalList: [],
      goalRate: null
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
          goalList: goalList
        });
      }).catch(err => {
          //Handle error here
      });

    fetch(`/api/goal/all/mrn/${mrn}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Something went wront");
          return;
        }
        return response.json();
      })
      .then(goals => {
        let total = 0;
        for (let goal of goals) {
          if (goal.rating) total = total + goal.rating;
        }
        if (goals && goals.length > 0) {
          let original = total / goals.length;
          let average = Math.round(original * 100) / 100;
          this.setState({ goalRate: average.toString() });
        } else {
          this.setState({ goalRate: null });
        }
      }).catch(err => {
          //Handle error here
      });
  }

  addGoal(goal) {
    if (!goal.parent_goal) {
      let { goalList } = this.state;
      goalList.push(goal);
      this.setState({ goalList });
    }
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  receiveNewGoal(val) {
    this.setState({ newGoal: val });
    console.log("New goal has been received:");
    console.log(val);
  }

  /* getGoalRate() {
        let total = 0;
        let rate = 0;
        for(let goal of this.state.goalList) {
            total = total + goal.rating;
        }
        if(this.state.goalList && this.state.goalList.length> 0){
            let original = total/this.state.goalList.length
            rate = Math.round(original*100)/100;
            this.setState({goalRate: rate});
        } else {
            this.setState({goalRate: "N/A"});
        }
    } */

  render() {
    return (
      <div>
        <button
          id="add-goal"
          className="btn btn-primary"
          onClick={() => this.setState({ showModal: true })}
        >
          Add Goal
        </button>
        <div className="x_panel">
          <div className="x_content">
            <h4>
              Overall goal completion rate:{" "}
              {this.state.loaded &&
                (this.state.goalRate ? `${this.state.goalRate}%` : "N/A")}
            </h4>
            <p>(Average rating of all global goals and sub goals)</p>
          </div>
        </div>
        <br />
        {this.state.loaded ? (
          this.state.goalList.map(goal => {
            return <GlobalGoal key={goal.goal_id} goal={goal} />;
          })
        ) : (
          <p>{this.state.placeholder}</p>
        )}
        <GoalModal
          mrn={this.props.mrn}
          show={this.state.showModal}
          onHide={this.handleClose}
          handlegoal={this.receiveNewGoal}
          addGoal={this.addGoal.bind(this)}
          globalGoals={this.state.goalList}
        />
      </div>
    );
  }
}

export default PatientGoal;
