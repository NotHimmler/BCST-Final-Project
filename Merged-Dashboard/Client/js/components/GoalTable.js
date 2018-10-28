import React from "react";
import moment from 'moment';

import GoalProgressButton from './GoalProgressButton'

class GoalTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subgoals: [],
            globalRating: null
        }

        this.getGlobalRating = this.getGlobalRating.bind(this);
        this.updateSubgoalRating = this.updateSubgoalRating.bind(this);
    }

    getGlobalRating() {
        let total = 0;
        let globalRating = 0;
        for(let subgoal of this.state.subgoals) {
            total = total + subgoal.rating;
        }
        if(this.state.subgoals.length!== 0)
            globalRating = total/this.state.subgoals.length
        this.setState({ globalRating: (globalRating).toString()});
        console.log("Global rating is..");
        console.log(globalRating.toString());
        return globalRating;
    }

    updateSubgoalRating(updatedGoal) {        
        let currentList = this.state.subgoals;
        for(let goal of currentList){
            if(goal.goal_id === updatedGoal.goal_id) {
                goal.rating = updatedGoal.rating;
            }
        }
        this.setState({subgoals: currentList},()=>{this.getGlobalRating()});
    }

    componentDidMount() {
        const id = this.props.goal.goal_id;
        // Get all global goals
        const endpoint = `/api/goal/subgoals/goal_id/${id}`;
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
        .then(goals => {
          this.setState({
            subgoals: goals,
          }, ()=>{this.getGlobalRating()});
        });
    }

    
    render() {
        return (
            <div className="x_panel">
                <div className="x_content">
                    <div className="accordion" id="accordion" role="tablist">
                        <div className="panel">
                        <GoalProgressButton
                            goalType="global"
                            goal={this.props.goal}
                            updateGlobalGoal={this.updateSubgoalRating}
                            getGlobalRating={this.getGlobalRating}
                            />
                            <a className="panel-heading" role="tab" id={`heading_${this.props.goal.goal_id}`} data-toggle="collapse" data-parent="#accordion" href={`#collapse_${this.props.goal.goal_id}`}>
                                <table className="table table-striped" id="long_term_table">
                                    <thead>
                                        <tr>
                                            <th width="10%">Date Goal Set</th>
                                            <th width="80%">Global Goal</th>
                                            <th width="10%">Review Date</th>
                                        </tr>
                                    </thead>

                                    <tbody id = "global_goal">
                                        <tr>
                                        <td>{moment(this.props.goal.start).format('DD/MM/YY')}</td>
                                        <td>{this.props.goal.goal_string}</td>
                                        <td>{moment(this.props.goal.end).format('DD/MM/YY')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </a>

                            <div id={`collapse_${this.props.goal.goal_id}`} className="panel-collapse collapse" role="tabpanel">
                                <div className="panel-body">
                                    {(this.state.subgoals.length > 0)
                                        ?<table className="table table-striped" id="long_term_table">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Date Goal Set</th>
                                                    <th width="55%">Sub Goal(s)</th>
                                                    <th width="25%">Progress</th>
                                                    <th width="10%">Review Date</th>
                                                </tr>
                                            </thead>
                                            <tbody id="sub_goal">

                                            { this.state.subgoals.map(subgoal => (
                                                    <tr key={subgoal.goal_id}>
                                                        <td>{moment(subgoal.start).format('DD/MM/YY')}</td>
                                                        <td>{subgoal.goal_string}</td>
                                                        <td><GoalProgressButton 
                                                            goalType="sub"
                                                            goal={subgoal}
                                                            updateGlobalGoal={this.updateSubgoalRating}
                                                            /></td>
                                                        <td>{moment(subgoal.end).format('DD/MM/YY')}</td>
                                                    </tr>            
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                        : <p>No sub goals</p>
                                    }
                                </div>
                            </div>

                            {/* <button className="btn btn-add-subgoal">Add sub goal</button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GoalTable;