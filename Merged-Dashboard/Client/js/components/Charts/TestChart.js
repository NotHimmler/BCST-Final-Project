import React from "react";
import moment from 'moment';

import etheme from '../../components/Charts/Theme'
//import payload from '../../components/Charts/TestPayload'
import op from '../../components/Charts/FitbitOptions'

import ChartDatePicker from '../../components/Charts/ChartDatePicker'

class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: etheme,
            option:op,
            loaded: false,
            placeholder: "Loading...",
            mrn: '80000001',
        };
        this.addData = this.addData.bind(this);
    }

    addData(endpoint) {
        // Get fitbit data from database
        fetch(endpoint)
            .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
            })
            .then(data => {
                // Add default data
                let stepsPayload = [];
                let datesPayload = [];
                for(let entry of data) {
                    stepsPayload.unshift(entry.steps);
                    // Note: split string to remove tiemezone
                    datesPayload.unshift(moment(entry.date.split("T")[0]).format('ddd DD/MM/YY'));
                }
                let newOp = this.state.option;
                newOp.xAxis[0].data = datesPayload;
                newOp.series[0].data = stepsPayload;    //Get data from payload
                //newOp.series[1].data = payload.goal;    //Get goal data from payload
                this.setState(state =>({option: newOp}));
                this.state.ec.setOption(this.state.option);
                this.setState({loaded:true});
        });  
    }

    componentDidMount() {
        //Initialise echart
        let ec = echarts.init(document.getElementById('test_chart'), this.state.theme);
        ec.setOption(this.state.option);
        this.setState({ec:ec});

        let dataEndpoint = `/api/fitbit/mrn/${this.state.mrn}`;
        this.addData(dataEndpoint)
    }
    
    render() {
        return (
            <div>
                <h3>This is a testing area</h3>
                <div className="x_panel">
                    <div className="x_title">
                        <h2 className="datepicker-inline">Steps from Fitbit</h2>
                        <div className="float-right">
                            <ChartDatePicker addData={this.addData} mrn={this.state.mrn}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <div id="test_chart"></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default TestChart;