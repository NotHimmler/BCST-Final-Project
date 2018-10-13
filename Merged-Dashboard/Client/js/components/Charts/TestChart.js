import React from "react";
import { Link } from "react-router-dom";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";

import etheme from '../../components/Charts/Theme'
import payload from '../../components/Charts/TestPayload'
import op from '../../components/Charts/FitbitOptions'


class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.registerTheme();
        this.state = {
            theme: 'my_theme',
            option:op,
        }
    }

    registerTheme() {
        echarts.registerTheme('my_theme', etheme);
    };

    componentDidMount() {
        console.log("Trying to add data");
        console.log(payload.data);
        console.log(payload.goal);
        
        // Trying to load data but not working urgh
        let newOp = this.state.option;
        newOp.series[0].data = payload.data;
        newOp.series[1].data = payload.goal;

        this.setState({option:newOp})
        
    }
    
    render() {
        
        return (
            <div>
              <h3>This is a testing area</h3>
              <ReactEcharts option={this.state.option} theme={"my_theme"}/>

            </div>
        )
    }
}

export default TestChart;