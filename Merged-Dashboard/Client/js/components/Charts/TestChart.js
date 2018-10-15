import React from "react";
import { Link } from "react-router-dom";

import etheme from '../../components/Charts/Theme'
import payload from '../../components/Charts/TestPayload'
import op from '../../components/Charts/FitbitOptions'


class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: etheme,
            option:op,
        };
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        let ec = echarts.init(document.getElementById('test_chart'), this.state.theme);
        ec.setOption(this.state.option);
        this.setState({ec:ec});
    }

    addData() {
        let newOp = this.state.option;
        newOp.series[0].data = payload.data;    //Get data from payload
        newOp.series[1].data = payload.goal;    //Get goal data from payload
        this.setState(state =>({option: newOp}));
        this.state.ec.setOption(this.state.option);
    }
    
    render() {
        return (
            <div>
              <h3>This is a testing area</h3>
              <div id="test_chart"></div>
              <button onClick={this.addData}>Add data</button>

            </div>
        )
    }
}

export default TestChart;