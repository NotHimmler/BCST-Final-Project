import React from "react";
import { Link } from "react-router-dom";

class FitbitGraph extends React.Component {

    componentDidMount() {
        var data = [30, 86, 168, 281, 303, 365];

        let result = d3.csv("/data/L007.csv", function(data) {
            let date = new Date(data.Date)
            if(date >= new Date("2015-10-20") && date <= new Date("2015-10-27")){
                console.log(data);
                return {
                    date : data.Date,
                    steps : data.Steps,
                };
            }
          }
        );

        result.then(function(d){
            let dates = [d.length-1];
            let steps = [d.length-1];

            for(let i = 0; i < d.length-1; i++) {
                dates[i] = d[i].date;
                steps[i] = parseInt(d[i].steps);
            }

            console.log(dates);
            console.log(steps);

            console.log(d);
            d3.select(".chart")
                .selectAll("div")
                .data(steps)
                    .enter()
                    .append("div")
                    .style("width", function(steps) { return ((steps)/10) + "px"; })
                    .text(function(steps) { return steps; });
        });

        
    }

    render() {
        return (
            <div className="chart"></div>
        )
    }
}

export default FitbitGraph;