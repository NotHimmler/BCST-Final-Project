import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
            fromDate: moment(),
            toDate: moment(),
            minDate: moment(),
            maxDate: moment(),
        };
        this.addData = this.addData.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
    }

    handleFromDateChange(date) {
        this.setState({
          fromDate: date
        });
      }

    handleToDateChange(date) {
        this.setState({
          toDate: date
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
                let from = data[0].from.split(" ");
                let to = data[0].to.split(" ");
                this.setState({
                    fromDate: moment(from[0]),
                    toDate: moment(to[0]),
                    minDate: moment(from[0]),
                    maxDate: moment(to[0]),
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
                        let stepsPayload = [];
                        let datesPayload = [];
                        for(let entry of data) {
                            stepsPayload.unshift(entry.steps);
                            // Note: split string to remove tiemezone
                            datesPayload.unshift(moment(entry.date.split("T")[0]).format('ddd DD/MM/YY'));
                        }
                        //console.log(datesPayload);
                        this.addData(stepsPayload,datesPayload);
                        this.setState({fitbitData:data, loaded:true});
                });  
        });
    }
    
    render() {
        const {loaded,placeholder} = this.state;
        return (
            <div>
                <h3>This is a testing area</h3>
                <div className="row">
                <div className="col-sm">
                    <p>From</p>
                </div>
                <div className="col-sm">
                <DatePicker
                    selected={this.state.fromDate}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    onChange={this.handleFromDateChange}/>
                </div>
                <div className="col-sm">
                    <p>To</p>
                </div>
                <div className="col-sm">
                <DatePicker
                    selected={this.state.toDate}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    onChange={this.handleToDateChange}/>
                </div>
                </div>
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Steps from Fitbit</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <div id="test_chart"></div>
                        <p>From: {loaded?moment(this.state.fromDate).format('dddd, MMMM Do YYYY'):placeholder}</p>
                        <p>To: {loaded?moment(this.state.toDate).format('dddd, MMMM Do YYYY'):placeholder}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default TestChart;