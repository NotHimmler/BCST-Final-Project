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
    }

    getGlobalRating() {
        let total = 0;
        for(let subgoal of this.state.subgoals) {
            total = total + subgoal.rating;
        }
        this.setState({ globalRating: (total/this.state.subgoals.length).toString()});
    }

/*     updateSubgoalRating(eventKey, goal_id){
        //Update global goal
        let newSubgoals = this.state.subgoals;
        for(let subgoal of newSubgoals) {
            if(subgoal.goal_id === goal_id){
                console.log(`Goal ${goal_id} needs to update`);
                subgoal.rating = ratingValue[eventKey];
            }
        }
        this.setState({subgoals: newSubgoals}, ()=>{this.getGlobalRating()});

        //Update database
        let endpoint = `/api/goal/update_rating`;
        let goalInfo = {
            goal_id: this.props.id,
            rating: ratingValue[eventKey]
        }
        let option = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({goalInfo})
          }
          fetch(endpoint, option)
          .then(response => {
            if (response.status !== 200) {
              return this.setState({ placeholder: "Something went wrong" });
            }
            console.log("Rating updated successfully");
            return response.json();
          })
          .then(data => {
            console.log(data);
          });
    } */

    componentDidMount() {
        // Get all global goals
        const id = this.props.goal.goal_id;
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
                            <a className="panel-heading" role="tab" id={`heading_${this.props.goal.goal_id}`} data-toggle="collapse" data-parent="#accordion" href={`#collapse_${this.props.goal.goal_id}`}>
                                <table className="table table-striped" id="long_term_table">
                                    <thead>
                                        <tr>
                                            <th width="10%">Date Goal Set</th>
                                            <th width="55%">Global Goal</th>
                                            <th width="25%">Progress</th>
                                            <th width="10%">Review Date</th>
                                        </tr>
                                    </thead>

                                    <tbody id = "global_goal">
                                        <tr>
                                        <td>{moment(this.props.goal.start).format('DD/MM/YY')}</td>
                                        <td>{this.props.goal.goal_string}</td>
                                        <td>{this.state.globalRating}</td>
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
                                                            rating={subgoal.rating}
                                                            id={subgoal.goal_id}
                                                            //updateSubgoalRating={this.updateSubgoalRating}
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GoalTable;