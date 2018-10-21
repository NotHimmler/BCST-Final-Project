import React from "react";
import { Link } from "react-router-dom";

const boxMargins = {
  "padding-left": "20px",
  "padding-right": "20px"
}

class AmountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      rows: "No Data"
    }
  }

  componentDidMount() {
    let endpoint = `/api/amount/mrn/${mrn}`;

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({data: data});
      this.generateAndSetRows(data);
    });
  }

  generateAndSetRows(data) {
    let rows = data.map((rowData) => {
      return (
        <tr>
          <th scope="row">{rowData.exercise}</th>
          <td>{rowData.sets}</td>
          <td>{rowData.sets_L}</td>
          <td>{rowData.sets_R}</td>
          <td>{rowData.reps}</td>
          <td>{rowData.reps_L}</td>
          <td>{rowData.reps_R}</td>
          <td>{rowData.dur}</td>
          <td>{rowData.is_completed}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="row w-100" style={boxMargins}>
      {this.props.lastName == "Test" ? 
        <div className="x_panel" style={boxMargins}>
          <div className="x_title">
            <h2>Exercise Logs</h2>
            <ul className="nav navbar-right panel_toolbox">
              <li>
                <a className="close-link">
                  <i className="fa fa-close" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
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
                  <td />
                  <td />
                  <td>300</td>
                  <td />
                  <td />
                  <td />
                  <td>yes</td>
                </tr>
                <tr>
                  <th scope="row">Standing up and walking</th>
                  <td>20</td>
                  <td />
                  <td />
                  <td>5</td>
                  <td />
                  <td />
                  <td />
                  <td>no</td>
                </tr>
                <tr>
                  <th scope="row">Standing sideways against a wall</th>
                  <td>10</td>
                  <td />
                  <td />
                  <td>10</td>
                  <td />
                  <td />
                  <td />
                  <td>yes</td>
                </tr>
                <tr>
                  <th scope="row">
                    Stepping to targets with hand support nearby
                  </th>
                  <td />
                  <td />
                  <td>3</td>
                  <td />
                  <td />
                  <td>50</td>
                  <td />
                  <td>no</td>
                </tr>
                <tr>
                  <th scope="row">Bridging</th>
                  <td>2</td>
                  <td />
                  <td />
                  <td>90</td>
                  <td />
                  <td />
                  <td />
                  <td>no</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : 
        <div className="x_panel" style={boxMargins}>
          <div className="x_title">
            <h2>Exercise Logs</h2>
            <ul className="nav navbar-right panel_toolbox">
              <li>
                <a className="close-link">
                  <i className="fa fa-close" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
          {this.state.rows}
        </div>
        }
      </div>
    );
  }
}

export default AmountTable;
