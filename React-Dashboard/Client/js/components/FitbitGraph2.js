import React from "react";
import { Link } from "react-router-dom";

class FitbitGraph2 extends React.Component {

    componentDidMount() {
        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 500 - margin.left - margin.right,
            height = 900 - margin.top - margin.bottom;

            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let result = d3.csv("/data/L007.csv", function(data) {
            let date = new Date(data.Date)
            if(date >= new Date("2015-10-20") && date <= new Date("2015-10-27")){
                console.log(data);
                return {
                    date : data.Date,
                    steps : parseInt(data.Steps),
                };
            }
          }
        );

        result.then(function(new_data){
            console.log(new_data);
            console.log(new_data.Steps);
            console.log(new_data.Date);

            x.domain(new_data.map(function(d) { return d.Date; }));
            y.domain([0, d3.max(new_data, function(d) { return d.Steps; })]);

            console.log(height);
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.select(".bar")
                .data(new_data)
                .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.Date); })
                    .attr("y", function(d) { return y(d.Steps); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.Steps); });                         
        });

        
    }

    render() {
        return (
            <svg className="fbgraph2"></svg>
        )
    }
}

export default FitbitGraph2;