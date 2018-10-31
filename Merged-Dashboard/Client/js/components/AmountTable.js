import React from "react";
import { Link } from "react-router-dom";
import fetch from "cross-fetch";

global.fetch = fetch;


const boxMargins = {
  "paddingLeft": "10px",
  "paddingRight": "10px"
}

const defaultFormData = {
  program: "-",
  exercise: "-",
  sets: 0,
  sets_L: 0,
  sets_R: 0,
  reps: 0,
  reps_L: 0,
  reps_R: 0,
  dur: 0,
  dur_L: 0,
  dur_R: 0,
  is_completed: false
}

class AmountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formData: {
        program: "-",
        exercise: "-",
        sets: 0,
        sets_L: 0,
        sets_R: 0,
        reps: 0,
        reps_L: 0,
        reps_R: 0,
        dur: 0,
        dur_L: 0,
        dur_R: 0,
        is_completed: false
      },
      rows: "No Data",
      isAdding: false,
      progOptions: [],
      progVal: "-",
      exOptions: [],
      exVal: "-",
      totals: false,
      dateRange: "No Data"
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
  }

  reactAddForm() {
    return (
      <div className="row" style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                  <label>Program: <select onChange={this.handleProgramChange} value={this.state.formData.program}>{this.state.progOptions}</select></label>
                  {this.state.programSelected ? 
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                  <label>Exercise Name:<select onChange={this.handleExerciseChange} value={this.state.formData.exercise}>{this.state.exOptions}</select></label><br />
                    {this.state.exerciseSelected ? 
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                      <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
                  <label>Sets:<input type="number" name="sets" value={this.state.formData.sets} placeholder="Sets" onChange={this.handleInputChange}/></label>
                  <label>Sets Left:<input type="number" name="sets_L" value={this.state.formData.sets_L} placeholder="Sets Left" onChange={this.handleInputChange}/></label>
                  <label>Sets Right:<input type="number" name="sets_R" value={this.state.formData.sets_R} placeholder="Sets Right" onChange={this.handleInputChange}/></label>
                  </div>
                  <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
                  <label>Reps:<input type="number"  name="reps" value={this.state.formData.reps} placeholder="Reps" onChange={this.handleInputChange}/></label>
                  <label>Reps Left:<input type="number" name="reps_L" value={this.state.formData.reps_L} placeholder="Reps Left" onChange={this.handleInputChange}/></label>
                  <label>Reps Right:<input type="number" name="reps_R" value={this.state.formData.reps_R} placeholder="Reps Right" onChange={this.handleInputChange}/></label>
                  </div>
                  <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
                  <label>Duration:<input type="number" name="dur" value={this.state.formData.dur} placeholder="Duration" onChange={this.handleInputChange}/></label>
                  <label>Duration Left:<input type="number" name="dur_L" value={this.state.formData.dur_L} placeholder="Duration Left" onChange={this.handleInputChange}/></label>
                  <label>Duration Right:<input type="number" name="dur_R" value={this.state.formData.dur_R} placeholder="Duration Right" onChange={this.handleInputChange}/></label>
                  </div>
                  <label>Completed:<input type="checkbox" name="is_completed" value={this.state.formData.is_completed} placeholder="Completed" onChange={this.handleInputChange}/></label><br />
                  </div>
                  : null}
                  </div>
                  : null}
            </div>
    )
  }

  componentDidMount() {
    let mrn = this.props.mrn;
    let endpoint = `/api/amount/mrn/${mrn}`;
    this.getPrograms();
    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
      if (data.length == 0) return
      let sorted = data.sort((a,b) => {
        let aDate = moment(a.date).valueOf()
        let bDate = moment(b.date).valueOf();
        return bDate - aDate;
      })
      let endDate = moment(sorted[0].date)
      let startDate = moment(sorted[0].date).subtract(6, "days");
      let dateRange = `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
      let dataRows = sorted.filter(item => {
        if (moment(item.date).valueOf() <= endDate.valueOf() && moment(item.date).valueOf() >= startDate.valueOf()){
          return item;
        }
      })
      this.setState({data: data, dateRange: dateRange, startDate: startDate.valueOf(), endDate: endDate.valueOf()});
      this.generateAndSetRows(dataRows);
    }).catch(err => {
      
    })
  }

  setLatestWeekRows(data) {
    if (data.length == 0) return
      let sorted = data.sort((a,b) => {
        let aDate = moment(a.date).valueOf()
        let bDate = moment(b.date).valueOf();
        return bDate - aDate;
      })
      let endDate = moment(sorted[0].date)
      let startDate = moment(sorted[0].date).subtract(6, "days");
      let dateRange = `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
      let dataRows = sorted.filter(item => {
        if (moment(item.date).valueOf() <= endDate.valueOf() && moment(item.date).valueOf() >= startDate.valueOf()){
          return item;
        }
      })
      this.setState({dateRange: dateRange, startDate: startDate.valueOf(), endDate: endDate.valueOf()});
      this.generateAndSetRows(dataRows);
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
      this.setState({formData: defaultFormData});
      newState = false;
    } else {
      if (this.state.formData.exercise == "-") return;
      //Submit data to database
      let fetchEndpoint = "/api/amount/addLog/mrn/" + this.props.mrn;
      let formData = this.state.formData;
      formData["program"] = "Default";
      formData["date"] = moment().format("YYYY-MM-DD");
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
          this.setState({data: newData, formData: defaultFormData}, () => {
            this.setLatestWeekRows(newData);
          })
        }
      }).catch(err => {

      })
    }
    this.setState({isAdding: newState})
  }

  generateAndSetRows(data) {
    let i = 0;
    let rows = data.map((rowData) => {
      let j = i + 1;
      i++;
      return (
        <tr key={j}>
          <th scope="row">{rowData.exercise}</th>
          <td>{rowData.sets}</td>
          <td>{rowData.sets_L}</td>
          <td>{rowData.sets_R}</td>
          <td>{rowData.reps}</td>
          <td>{rowData.reps_L}</td>
          <td>{rowData.reps_R}</td>
          <td>{rowData.dur}</td>
          <td>{rowData.dur_L}</td>
          <td>{rowData.dur_R}</td>
          <td>{rowData.is_completed ? "Yes" : "No"}</td>
          {!this.state.totals ? <td>{rowData.date}</td>:null}
        </tr>
      )
    })
    this.setState({rows: rows})
  }

  handleProgramChange(event) {
    let programSelected = event.target.value != "-";
    if (programSelected) this.getExercisesForProgram(event.target.value);
    let formData = this.state.formData;
    formData.program = event.target.value;
    this.setState({programSelected: programSelected, formData: formData})
  }

  handleExerciseChange(event) {
    let exerciseSelected = event.target.value != "-";
    let formData = this.state.formData;
    formData.exercise = event.target.value;
    this.setState({exerciseSelected: exerciseSelected, formData: formData});
  }

  handleWeekChange(data) {
    let endDate, startDate;
    if(data == "left") {
      endDate = moment(this.state.startDate)
      startDate = moment(endDate).subtract(6, 'days')
    } else {
      startDate = moment(this.state.endDate).add(1, 'days');
      endDate = moment(startDate).add(6, 'days');
    }

    let dataRows = this.state.data.filter(item => {
      if (moment(item.date).valueOf() <= endDate.valueOf() && moment(item.date).valueOf() >= startDate.valueOf()){
        return item;
      }
    });

    //No data in the new date range
    if (dataRows.length == 0) return;
    let dateRange = `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
    this.setState({dateRange: dateRange, startDate: startDate.valueOf(), endDate: endDate.valueOf()});
    this.generateAndSetRows(dataRows);
  }

  getExercisesForProgram(program) {
    fetch(`/api/amount/programs/exercises/${program}`)
    .then(data => {
      return data.json();
    })
    .then(data => {
      if (data.okay) {
        let exOptions = [];
        exOptions = data.exercises.map(item => {
          return (<option value={item}>{item}</option>)
        })
        exOptions.push(<option value="-">{"-"}</option>);
        this.setState({exOptions: exOptions})
      }
    }).catch(err => {

    })
  }

  getPrograms() {
    fetch('/api/amount/programs')
    .then(data => {
      return data.json();
    })
    .then(data => {
      if (data.okay) {
        let progOptions = [];
        progOptions = data.programs.map(item => {
          return (<option value={item}>{item}</option>)
        })
        progOptions.push(<option value="-">{"-"}</option>);
        this.setState({progOptions: progOptions})
      }
    }).catch(err => {
      
    })
  }

  render() {
    return (
      <div className="row w-100" style={boxMargins}>
        <div className="x_panel">
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
            this.reactAddForm()
            : null }
            <div className="row" style={{display: "flex", justifyContent: "flex-end", padding: "0 10px"}}>
            <button className="btn btn-success" id="add-log-button" onClick={(e) => this.handleButtonClick("add", e)}>Add New Log</button>
            {this.state.isAdding ? <button className="btn btn-danger" onClick={(e) => this.handleButtonClick("cancel", e)}>Cancel</button> : null }
            </div>
          </form>
          <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div>
              <button onClick={() => this.handleWeekChange("left")}><i className="fas fa-chevron-left"></i></button>
              <span style={{paddingRight: "5px"}}>{this.state.dateRange}</span>
              <button onClick={() => this.handleWeekChange("right")}><i className="fas fa-chevron-right"></i></button>
            </div>
            <div>

            </div>
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
                  <th>Duration</th>
                  <th>Duration Left</th>
                  <th>Duration Right</th>
                  <th>Completed</th>
                  {!this.state.totals ? <th>Date</th> : null}
                </tr>
              </thead>

              <tbody>
              {this.state.rows}      
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    );
  }
}

export default AmountTable;
