import React from "react";
import { Link } from "react-router-dom";
const fetch = require('cross-fetch');

class GoalList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        placeholder: 'loading...'
      };
    }

    componentDidMount() {
      const mrn = this.props.mrn;
      const endpoint = `/api/goal/mrn/${mrn}`;
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
        this.setState({
          loaded: true
        });
        this.props.updateGoalState({goalList});
      }).catch( err => {
        //Do something with the error
      })
    }

    getGoalListTable() {
      const goalList = this.props.goalList;
      if(!goalList.length){
        return null;
      }
      let goalTableList = goalList.map((goal,index) => 
          <div key={index} className="panel panel-heading">
            <table className="table table-striped" id="long_term_table">
                <thead>
                  <tr>
                    <th width="10%">Date Set</th>
                    <th width="70%">Description</th>
                    <th width="10%">Goal</th>
                    <th width="10%">Progress</th>
                  </tr>
                </thead>
                <tbody className="global_goal">
                  <tr>
                    <td>{this.getDateSet(goal.start, goal.end)}</td>
                    <td>{goal.goal_string}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
            </table>
          </div>
      );
      return goalTableList; 
    }

    getDateSet(start, end) {
      if(!start || !end) {
        return "";
      }
      let startStr = new Date(start).toLocaleDateString();
      let endStr = new Date(end).toLocaleDateString();
      return `${startStr} - ${endStr}`
    }

    render() {
      const {loaded, placeholder} = this.state;
        return (
            <div>
              <div className="clearfix"></div>
              <div className="x_panel">
                <div className="x_title">
                <div className="row">
                <h2>Goals</h2>
                </div>
                  
                  <div className="row">
                    <p id="italics">Click to open subgoals</p>
                  </div>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content"></div>
                

                {/*start of accordion*/}
                <div className="accordion" id="accordion" role="tablist" aria-multiselectable="true">
                      <div className="panel">
                        <a className="panel-heading" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          {/* <h4 className="panel-title">Walking Goal</h4> */}
                          <table className="table table-striped" id="long_term_table">
                          <thead>
                      <tr>
                        <th width="10%">Date Set</th>
                        <th width="70%">Description</th>
                        <th width="10%">Goal</th>
                        <th width="10%">Progress</th>
                      </tr>
                    </thead>

                    <tbody id = "global_goal">
                    <tr>
                      <td></td>
                      <td>To walk independently to and from Bankstown train station from your home (~1km away) at least once per week to access community group activites within 5 months.</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                          </table>
                        </a>
                        <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                          <div className="panel-body">
                          <table className="table table-striped" id="long_term_table">


                  <thead>
                            <tr>
                              <th colSpan="4">Sub Goal(s)</th>
                            </tr>
                  </thead>

                  <thead>
                      <tr>
                        <th width="10%">Date Set</th>
                        <th width="70%">Description</th>
                        <th width="10%">Goal</th>
                        <th width="10%">Progress</th>
                      </tr>
                  </thead>

                  <tbody id="sub_goal">
                    <tr>
                      <td></td>
                      <td>To walk to the end of your stree and back without stopping on at least 3 days of the week measuring your walk using Runkeeper for the next 2 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To walk at least 6000 steps on at least 3 days of the week measured using your Fitbit for the next 2 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To play the WiiFit jogging plus game at least 3 times a week and complete the track in &lt; 8 minutes within 4 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To achieve a score of > ........ on the Xbox kinect “stomp it” game by stepping only on the purple and orange lights within 2 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To complete 50 repetitions without a rest using the Humac left right weight shift game in &lt; 5 minutes with a score > 80% within 1 week .</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To achieve a score of &gt; ....... on the Fysiogaming sideways walking game (difficulty level 5) within 2 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    
                  </tbody>

                  </table>
                            
                          </div>
                        </div>
                      </div>
                      <div className="panel">
                        <a className="panel-heading collapsed" role="tab" id="headingTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          {/* <h4 className="panel-title">Collapsible Group Items #2</h4> */}
                          <table className="table table-striped" id="long_term_table">
                          <thead>
                            <tr>
                              <th width="10%">Date Set</th>
                              <th width="70%">Description</th>
                              <th width="10%">Goal</th>
                              <th width="10%">Progress</th>
                            </tr>
                          </thead>

                          <tbody id = "global_goal">
                          <tr>
                            <td></td>
                            <td>To complete all your Ipad AMOUNT walking program exercises at least 5 times per week for the next 4 weeks.</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                        </table>
                        </a>
                        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                          <div className="panel-body">
                          <table className="table table-striped" id="long_term_table">


                        <thead>
                                  <tr>
                                    <th colSpan="4">Sub Goal(s)</th>
                                  </tr>
                                </thead>

                        <thead>
                            <tr>
                              <th width="10%">Date Set</th>
                              <th width="70%">Description</th>
                              <th width="10%">Goal</th>
                              <th width="10%">Progress</th>
                            </tr>
                        </thead>

                        <tbody id="sub_goal">
                        <tr>
                          <td></td>
                          <td>To complete 50 stepping exercises on the stepping tiles/Ipad stepping exercise with your right foot without using your hands within 2 weeks.</td>
                          <td></td>
                          <td></td>
                        </tr>
                          </tbody>
                          
                          </table>
                          </div>
                        </div>
                      </div>
                      {loaded ? this.getGoalListTable() : <p>{placeholder}</p>}
                    </div>
                     {/* end of accordion */}

              </div>


            </div>
        )
    }
}

export default GoalList;