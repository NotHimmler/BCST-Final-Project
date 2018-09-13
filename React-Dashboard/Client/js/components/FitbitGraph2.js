import React from "react";
import { Link } from "react-router-dom";

class FitbitGraph2 extends React.Component {

    componentDidMount() {
        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
        
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

        result.then(function(d){
            console.log(d)

            x.domain(d.map(function(dd) { return dd.date; }));
            y.domain([0, d3.max(d, function(dd) { return dd.steps; })]);

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
                .data(d)
                .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.date); })
                    .attr("y", function(d) { return y(d.steps); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.steps); });                         
        });

        
    }

    render() {
        return (
            <svg className="fbgraph2"></svg>
        )
    }
}

export default FitbitGraph2;