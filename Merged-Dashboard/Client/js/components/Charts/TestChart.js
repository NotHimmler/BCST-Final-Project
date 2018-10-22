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
        //Initialise echart
        let ec = echarts.init(document.getElementById('test_chart'), this.state.theme);
        ec.setOption(this.state.option);
        this.setState({ec:ec});

        let mrn = '80000001'
        let endpoint = `/api/fitbit/mrn/${mrn}/datelimit`;
        //Get date limits
        fetch(endpoint)
            .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    fromDate: data[0].from,
                    toDate: data[0].to,
                })
                //console.log(data);
            });  

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
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Steps from Fitbit</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <div id="test_chart"></div>
                        <button onClick={this.addData}>Add data</button>
                        <p>From: {new Date(this.state.fromDate).toDateString()}</p>
                        <p>To: {new Date(this.state.toDate).toDateString()}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default TestChart;