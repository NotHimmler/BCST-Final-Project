import React from "react";
import { Link } from "react-router-dom";
let $ = require("jquery");


let generateWalkTableRow = (data) => {
    return (
        <tr key={data.date}>
            <td>{(new Date(data.date*1000)).toDateString()}</td>
            <td>{data.numSteps}</td>
            <td>{data.distance}</td>
            <td>{data.duration}</td>
            <td>{data.goalType}</td>
            <td>{data.goalValue}</td>
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
        let data = JSON.stringify({"mrn": mrn});
        $.ajax({
            url: "/api/v1/getWalkData",
            type: "post",
            data: data,
            contentType:"application/json;charset=utf-8",
            success: (data) => {
                console.log(data)
                let rows = []
                for (let item in data){
                    rows.push(generateWalkTableRow(data[item]))
                }
                this.setState({rows: rows})
                console.log("Fetch succeeded")
            }, 
            error: data => {
                console.log("Fetch failed")
            }
        })
    }
    
    render() {

        return (
          <div>
              <table className="table">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Num Steps</th>
                    <th>Distance (meters)</th>
                    <th>Duration (minutes)</th>
                    <th>Goal</th>
                    <th>Goal Type</th>
                    </tr>
                    {this.state.rows}
                </thead>
              </table>
          </div>
        )
    }
}

export default WalkAppTable;