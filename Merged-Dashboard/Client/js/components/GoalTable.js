import React from "react";
import { Link } from "react-router-dom";

class GoalTable extends React.Component {

    render() {
        return (
            <div>
              <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Goal</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">9.17-9.23</th>
                  <td>
                    <div className="btn-group">
                      <button data-toggle="dropdown" className="btn btn-success dropdown-toggle btn-xs" type="button">Goals <span className="caret"></span>
                      </button>
                      <ul role="menu" className="dropdown-menu" id="1_week">
                        <li><a href="#">Side walking</a></li>
                        <li><a href="#">Keep lifting</a></li>
                        <li><a href="#">Sit to stand</a></li>
                        <li><a href="#">Dynamic balance</a></li>
                        <li><a href="#">Walk for 500 steps</a></li>
                      </ul>
                    </div>
                  </td>
                  <td id="situation_1">4/5</td>
                </tr>
                <tr>
                  <th scope="row">9.24-9.30</th>
                  <td>
                    <div className="btn-group">
                      <button data-toggle="dropdown" className="btn btn-success dropdown-toggle btn-xs" type="button">Goals <span className="caret"></span>
                      </button>
                      <ul role="menu" className="dropdown-menu" id="2_week">
                        <li><a href="#">Side walking</a></li>
                        <li><a href="#">Keep lifting</a></li>
                        <li><a href="#">Sit to stand</a></li>
                        <li><a href="#">Dynamic balance</a></li>
                        <li><a href="#">Walk for 500 steps</a></li>
                      </ul>
                    </div>
                  </td>
                  <td id="situation_2">4/5</td>
                </tr>
                <tr>
                  <th scope="row">10.1-10.7</th>
                  <td>
                    <div className="btn-group">
                      <button data-toggle="dropdown" className="btn btn-success dropdown-toggle btn-xs" type="button">Goals <span className="caret"></span>
                      </button>
                      <ul role="menu" className="dropdown-menu" id="3_week">
                        <li><a href="#">Side walking</a></li>
                        <li><a href="#">Keep lifting</a></li>
                        <li><a href="#">Sit to stand</a></li>
                        <li><a href="#">Dynamic balance</a></li>
                        <li><a href="#">Walk for 500 steps</a></li>
                      </ul>
                    </div>
                  </td>
                  <td id="situation_3">0/5</td>
                </tr>
                <tr>
                  <th scope="row">10.8-10.14</th>
                  <td>
                    <div className="btn-group">
                      <button data-toggle="dropdown" className="btn btn-success dropdown-toggle btn-xs" type="button">Goals <span className="caret"></span>
                      </button>
                      <ul role="menu" className="dropdown-menu" id="4_week">
                        <li><a href="#">Side walking</a></li>
                        <li><a href="#">Keep lifting</a></li>
                        <li><a href="#">Sit to stand</a></li>
                        <li><a href="#">Dynamic balance</a></li>
                        <li><a href="#">Walk for 500 steps</a></li>
                      </ul>
                    </div>
                  </td>
                  <td id="situation_4">0/5</td>
                </tr>
              </tbody>
              </table>
            </div>
        )
    }
}

export default GoalTable;