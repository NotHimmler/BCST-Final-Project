import React from "react";
import { Link } from "react-router-dom";

import GoalForm from '../components/GoalForm'
import GoalTable from '../components/GoalTable'
import GoalList from '../components/GoalList'


class PatientGoal extends React.Component {

    render() {
        return (
          <div>
            <h3 id="h3-goal"> Weekly Goal </h3>

            <GoalTable/>
            <GoalList/>
            <GoalForm/>




          </div>
        )
    }
}

export default PatientGoal;