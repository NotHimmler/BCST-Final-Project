import React from "react";
import { Link } from "react-router-dom";

const boxMargins = {
  "padding-left": "20px",
  "padding-right": "20px"
}

const defaultFormData = {
  exercise: "",
  sets: 0,
  sets_L: 0,
  sets_R: 0,
  reps: 0,
  reps_L: 0,
  reps_R: 0,
  dur: 0,
  is_completed: false
}

class AmountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      formData: {
        exercise: "",
        sets: 0,
        sets_L: 0,
        sets_R: 0,
        reps: 0,
        reps_L: 0,
        reps_R: 0,
        dur: 0,
        is_completed: false
      },
      rows: "No Data",
      isAdding: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let mrn = this.props.mrn;
    let endpoint = `/api/amount/mrn/${mrn}`;

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
      this.setState({data: data});
      this.generateAndSetRows(data);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let data = this.state.formData;
    data[name] = value;
    this.setState({
        formData: data
    })
}

  handleButtonClick(data, event) {
    event.preventDefault();
    
    let newState = false;
    if (!this.state.isAdding) {
      newState = true;
    } else if (data == "cancel") {
      newState = false;
    } else {
      if (this.state.formData.exercise == "") return;
      //Submit data to database
      let fetchEndpoint = "/api/amount/addLog/mrn/" + this.props.mrn;
      let formData = this.state.formData;
      formData["program"] = "Default";
      formData["date"] = new Date();
      fetch(fetchEndpoint, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.formData)
      }).then(res => {
        return res.json();
      }).then(res => {
        if (res.okay) {
          let newData = this.state.data;
          newData.push(formData);
          this.generateAndSetRows(newData);
          this.setState({data: newData, formData: defaultFormData})
        }
        console.log(data);
      })
    }
    this.setState({isAdding: newState})
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
    this.setState({rows: rows})
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
          <form className="row">
          {this.state.isAdding ? 
            <div className="row" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <label>Exercise Name:<input type="text" name="exercise" value={this.state.formData.exercise} placeholder="Exercise" onChange={this.handleInputChange}/></label><br />
                  <label>Sets:<input type="number" name="sets" value={this.state.formData.sets} placeholder="Sets" onChange={this.handleInputChange}/></label><br />
                  <label>Sets Left:<input type="number" name="sets_L" value={this.state.formData.sets_L} placeholder="Sets Left" onChange={this.handleInputChange}/></label><br />
                  <label>Sets Right:<input type="number" name="sets_R" value={this.state.formData.sets_R} placeholder="Sets Right" onChange={this.handleInputChange}/></label><br />
                  <label>Reps:<input type="number"  name="reps" value={this.state.formData.reps} placeholder="Reps" onChange={this.handleInputChange}/></label><br />
                  <label>Reps Left:<input type="number" name="reps_L" value={this.state.formData.reps_L} placeholder="Reps Left" onChange={this.handleInputChange}/></label><br />
                  <label>Reps Right:<input type="number" name="reps_R" value={this.state.formData.reps_R} placeholder="Reps Right" onChange={this.handleInputChange}/></label><br />
                  <label>Duration:<input type="number" name="dur" value={this.state.formData.dur} placeholder="Duration" onChange={this.handleInputChange}/></label><br />
                  <label>Completed:<input type="checkbox" name="is_completed" value={this.state.formData.is_completed} placeholder="Completed" onChange={this.handleInputChange}/></label><br />
            </div>
            : null }
            <div className="row" style={{display: "flex", justifyContent: "flex-end"}}>
            <button onClick={(e) => this.handleButtonClick("add", e)}>Add</button>
            {this.state.isAdding ? <button onClick={(e) => this.handleButtonClick("cancel", e)}>Cancel</button> : null }
            </div>
          </form>
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
              {this.state.rows}      
              </tbody>
            </table>
          </div>
          
        </div>
        }
      </div>
    );
  }
}

export default AmountTable;
