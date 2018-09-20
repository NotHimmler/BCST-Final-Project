import React from "react";
import { Link } from "react-router-dom";

class AmountTable extends React.Component {

    componentDidMount(){


    }
    
    render() {
        return (
          <div className="row col-lg-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>AMOUNT table: <strong>2 out of 5 completed</strong></h2>
                <ul className="nav navbar-right panel_toolbox">
                  <li><a className="close-link"><i className="fa fa-close"></i></a>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className="x_content">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Exercise title</th>
                      <th>Sets</th>
                      <th>Sets Left</th>
                      <th>Sets Right</th>
                      <th>Reps</th>
                      <th>Reps Right</th>
                      <th>Reps Left</th>
                      <th>Durn</th>
                      <th>Completed</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th scope="row">Bilateral calf raises</th>
                      <td>2</td>
                      <td></td>
                      <td></td>
                      <td>300</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>yes</td>
                    </tr>
                    <tr>
                      <th scope="row">Standing up and walking</th>
                      <td>20</td>
                      <td></td>
                      <td></td>
                      <td>5</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>no</td>
                    </tr>
                    <tr>
                      <th scope="row">Standing sideways against a wall</th>
                      <td>10</td>
                      <td></td>
                      <td></td>
                      <td>10</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>yes</td>
                    </tr>
                    <tr>
                      <th scope="row">Stepping to targets with hand support nearby</th>
                      <td></td>
                      <td></td>
                      <td>3</td>
                      <td></td>
                      <td></td>
                      <td>50</td>
                      <td></td>
                      <td>no</td>
                    </tr>
                    <tr>
                      <th scope="row">Bridging</th>
                      <td>2</td>
                      <td></td>
                      <td></td>
                      <td>90</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>no</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        )
    }
}

export default AmountTable;