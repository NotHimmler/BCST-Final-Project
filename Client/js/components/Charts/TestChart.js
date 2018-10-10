import React from "react";
import { Link } from "react-router-dom";

import etheme from '../../components/Charts/Theme'

class TestChart extends React.Component {

    componentDidMount() {

        let options_fitbit = {
            title: {
              text: 'Daily',
              //subtext: 'Walked Steps and Goal Steps'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Steps Walked', 'Goal (Steps)'
              /* {
                name:'Goal',
                icon: 'roundRect'
              } */
            ]
            },
            toolbox: {
              show: false,
              feature : {
                 dataZoom : {show: true},
             }
            },

            dataZoom : {
              show : true,
              realtime: true,
              start : 0,
              end : 100
            }
            ,
            calculable: false,
            xAxis: [{
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: 'Steps Walked',
              type: 'bar',
              data: [2292, 2000, 1860, 1881, 2188, 2140, 2088],
              markPoint: {
                data: [{
                  type: 'max',
                  name: 'maximum'
                }, {
                  type: 'min',
                  name: 'minimum'
                }]
              }
            },
            {
              name: 'Goal (Steps)',
              type: 'line',
              data: [2000, 2000, 2000,2000,2000,2000,2000]
            }]
        };

        var ec = echarts.init(document.getElementById('test_chart'), etheme);
        ec.setOption(options_fitbit);
    }
    
    render() {
        return (
            <div>
              <h3>This is a testing area</h3>
              <div id="test_chart"></div>

            </div>
        )
    }
}

export default TestChart;