import React from "react";
import { Link } from "react-router-dom";
let $ = require("jquery");
const boxMargins = {
    "paddingLeft": "10px",
    "paddingRight": "10px"
  }
//Source - https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss/5539081#5539081
function secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

let generateWalkTableRow = (data) => {
    return (
        <tr key={data.dateMillis}>
            <td>{(new Date(data.dateMillis*1000)).toDateString()}</td>
            <td>{data.numSteps}</td>
            <td>{data.distance}</td>
            <td>{secondsToHms(data.duration)}</td>
            <td>{data.goalValue} 
            {data.GoalType == "distance" ? " meters" : null} 
            {data.goalType == "steps" ? " steps" : null} 
            {data.goalType == "minutes" ? " minutes" : null}
            </td>
            <td>{((data.duration)*100/(data.goalValue*60.0)).toFixed(2)}%</td>
        </tr>
    )
}

class WalkAppTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        rows: []
    }
  }

  componentDidMount() {
      
      this.getWalkData()
    }

    getWalkData() {
        if (this.props.getWalkData) this.props.getWalkData();
        let mrn = this.props.mrn;
        $.ajax({
            url: "/api/watb/mrn/"+mrn,
            type: "get",
            contentType:"application/json;charset=utf-8",
            success: (data) => {
                let rows = []
                for (let item in data){
                    rows.push(generateWalkTableRow(data[item]))
                }
                this.setState({rows: rows})
            }, 
            error: data => {
                
            }
        })
    }
    
    render() {

        return (
            <div className="row w-100" style={boxMargins}>
            <div className="x_panel">
              <div className="x_title">
              <div className="col-md-4"><h2 id="overflow">WalkAroundTheBlock Logs</h2></div>
              <table className="table">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Num Steps</th>
                    <th>Distance (meters)</th>
                    <th>Duration (minutes)</th>
                    <th>Goal</th>
                    <th>Goal Achieved %</th>
                    </tr>
                    {this.state.rows}
                </thead>
              </table>
          </div>
          </div>
          </div>
        )
    }
}

export default WalkAppTable;