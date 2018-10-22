import React from "react";
import { Link } from "react-router-dom";

import etheme from '../../components/Charts/Theme'
//import payload from '../../components/Charts/TestPayload'
import op from '../../components/Charts/FitbitOptions'


class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: etheme,
            option:op,
            loaded: false,
            placeholder: "Loading...",
            fitbitData: {},
        };
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        //Initialise echart
        let ec = echarts.init(document.getElementById('test_chart'), this.state.theme);
        ec.setOption(this.state.option);
        this.setState({ec:ec});

        let mrn = '80000001'
        let dateEndpoint = `/api/fitbit/mrn/${mrn}/datelimit`;
        let dataEndpoint = `/api/fitbit/mrn/${mrn}`
        
        // Get date limits
        fetch(dateEndpoint)
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
                });

                // Get fitbit data from database
                fetch(dataEndpoint)
                    .then(response => {
                    if (response.status !== 200) {
                        return this.setState({ placeholder: "Something went wrong" });
                    }
                    return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        let stepsPayload = [];
                        let datesPayload = [];
                        for(let entry of data) {
                            console.log(entry);
                            stepsPayload.unshift(entry.steps);
                            datesPayload.unshift(new Date(entry.date).toDateString());
                        }
                        console.log(datesPayload);
                        this.addData(stepsPayload,datesPayload);
                        this.setState({fitbitData:data, loaded:true});
                });  
        });
    }

    addData(stepsPayload, datesPayload) {
        let newOp = this.state.option;
        //newOp.xAxis[0].data = ['1', '2', '3', '4', '5', '6', '7','1', '2', '3', '4', '5', '6', '7' ];
        newOp.xAxis[0].data = datesPayload;
        newOp.series[0].data = stepsPayload;    //Get data from payload
        //newOp.series[1].data = payload.goal;    //Get goal data from payload
        this.setState(state =>({option: newOp}));
        this.state.ec.setOption(this.state.option);
    }
    
    render() {
        const {loaded,placeholder} = this.state;
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
                        <p>From: {loaded?new Date(this.state.fromDate).toDateString():placeholder}</p>
                        <p>To: {loaded?new Date(this.state.toDate).toDateString():placeholder}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default TestChart;