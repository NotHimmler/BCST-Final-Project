import React from "react";
import moment from 'moment';

import GoalProgressBar from '../components/GoalProgressBar'

class GoalTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subgoals: [],
        }
    }

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
            console.log(`Getting subgoals for goal ${this.props.goal.goal_id}`);
            console.log(goals);
          this.setState({
            //loaded: true,
            subgoals: goals,
          });
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
                                            <th width="60%">Global Goal</th>
                                            <th width="20%">Progress</th>
                                            <th width="10%">Review Date</th>
                                        </tr>
                                    </thead>

                                    <tbody id = "global_goal">
                                        <tr>
                                        <td>{moment(this.props.goal.start).format('DD/MM/YY')}</td>
                                        <td>{this.props.goal.goal_string}</td>
                                        <td></td>
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
                                                    <th width="60%">Sub Goal(s)</th>
                                                    <th width="20%">Progress</th>
                                                    <th width="10%">Review Date</th>
                                                </tr>
                                            </thead>
                                            <tbody id="sub_goal">

                                            { this.state.subgoals.map(subgoal => (
                                                    <tr>
                                                        <td>{moment(subgoal.start).format('DD/MM/YY')}</td>
                                                        <td>{subgoal.goal_string}</td>
                                                        <td><GoalProgressBar 
                                                            rating={this.props.goal.rating}
                                                            id={this.props.goal.goal_id}/></td>
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