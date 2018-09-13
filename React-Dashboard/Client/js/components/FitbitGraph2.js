import React from "react";
import { Link } from "react-router-dom";

class FitbitGraph2 extends React.Component {

    componentDidMount() {
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var startDate = "2015-10-20",
            endDate = "2015-10-26";
        var goal = 3000;

        var svg = d3.select("svg"),
            margin = {top: 60, right: 20, bottom: 140, left: 80},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
        y = d3.scaleLinear().rangeRound([height, 0]);        
        
        d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var div = d3.select("svg").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        let result = d3.csv("/data/L007.csv", function(d) {
            d.Steps = +d.Steps;
            d.Date = new Date(d.Date);
            if(d.Date >= new Date(startDate) && d.Date <= new Date(endDate)){
                return {
                    date: d.Date,
                    steps: d.Steps
                };
            }
            });
        
        result.then(function(data) {
            console.log(data)
            x.domain(data.map(function(d) { 
                return getShortDate(d.date);
            }));
            y.domain([0, d3.max(data, function(d) { return d.steps; })])
            var barWidth = width/data.length;

            g.append("text")
                .attr("class", "chart-title")
                .attr("x", -margin.left + 10)
                .attr("y", -margin.top + 30)
                .text("Daily Step Count from " + startDate + " to " + endDate);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .append("text")
                    .attr("class", "axis-label")
                    .attr("y", 30)
                    .attr("x", (width/2 + 17))
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")              
                    .text("DATE");

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(9))
                .append("text")
                    .attr("class", "axis-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -65)
                    .attr("x", -(height/2)+20)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")              
                    .text("STEPS");
            

            g.selectAll(".bar")
              .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(getShortDate(d.date)); })
                .attr("y", function(d) { return y(d.steps); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.steps); })
                .attr("fill", function(d) { return getColour(d.steps);})
                .on("mouseover", function(d) {
                    div.transition()
                      .duration(200)
                      .style("opacity", .9);
                    div .html(d.steps)
                      //.style("left", (d3.event.pageX) + "px")             
                      //.style("top", (d3.event.pageY - 28) + "px");
                      .style("left", 50)             
                      .style("top", 50);
                    });
            
            g.append("line")
                .attr("class", "goal-line")
                .attr("x1", 0)
                .attr("y1", y(goal))
                .attr("x2", width)
                .attr("y2", y(goal));

            var legend = g.append("g")
                .attr("class", "legend");

            legend.append("rect")
                    .attr("width", width/3)
                    .attr("height", 60)
                    .attr("x", 0)
                    .attr("y", height + 55);
            
            legend.append("text")
                .attr("x", 10)
                .attr("y", height + 80)
                .text("Legend");

        });

        function getShortDate(date) {
            return (days[date.getDay()] + " " + date.getDate() 
                + "/" + date.getMonth())
        }

        function getColour(steps) {
            if(steps < 3000){
                return "brown";
            } else {
                return "rgb(113, 171, 206)";
            }      
        }
    }

    render() {

        return (
            <svg className="fb" width="600" height="500"></svg>
        )
    }
}

export default FitbitGraph2;