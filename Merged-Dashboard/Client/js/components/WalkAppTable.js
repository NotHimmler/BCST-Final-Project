import React from "react";
import { Link } from "react-router-dom";



class WalkAppTable extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {
    }
    
    render() {

        return (
          <div>
              <table className="table">
                <thead>
                    <th>Date</th>
                    <th>Num Steps</th>
                    <th>Distance (meters)</th>
                    <th>Duration (minutes)</th>
                    <th>Goal</th>
                    <th>Goal Type</th>
                </thead>
              </table>
          </div>
        )
    }
}

export default WalkAppTable;