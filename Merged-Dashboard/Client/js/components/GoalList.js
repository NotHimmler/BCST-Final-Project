import React from "react";
import { Link } from "react-router-dom";

class GoalList extends React.Component {

    render() {
        return (
            <div>
              <div className="clearfix"></div>
              <div className="x_panel">
                <div className="x_title">
                  <h2>Goals</h2>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content"></div>
                  <table className="table table-striped" id="long_term_table">
                    <thead>
                      <tr>
                      <th>Date goal set</th>
                        <th>Global Goals</th>
                        <th>Rating</th>
                        <th>Progress/Comments</th>
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

                  <thead>
                      <tr>
                        <th>Date goal set</th>
                        <th>Subgoal(s)</th>
                        <th>Rating</th>
                        <th>Progress/Comments</th>
                      </tr>
                  </thead>

                  <tbody id="sub_goal">
                  	<tr>
                      <td></td>
                      <td>To complete all your Ipad AMOUNT walking program exercises at least 5 times per week for the next 4 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To walk to the end of your stree and back without stopping on at least 3 days of the week measuring your walk using Runkeeper for the next 2 weeks.</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>To complete all your Ipad AMOUNT walking program exercises at least 5 times per week for the next 4 weeks.</td>
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
        )
    }
}

export default GoalList;