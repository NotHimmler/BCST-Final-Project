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
            fromDate: moment(),
            toDate: moment(),
            minDate: moment(),
            maxDate: moment(),
            mrn: '80000001',
        };
        this.addData = this.addData.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getMinDate = this.getMinDate.bind(this);
        this.getMaxDate = this.getMaxDate.bind(this);
        this.resetDates = this.resetDates.bind(this);
    }

    // Handler for 'from' date picker
    handleFromDateChange(date) {
        let endpoint = `/api/fitbit/mrn/${this.state.mrn}/dates/${moment(date).format('YYYY-MM-DD')}/${moment(this.state.toDate).format('YYYY-MM-DD')}`;
        //console.log(endpoint);
        this.addData(endpoint)
        this.setState({
          fromDate: date
        });
      }
    
    // Handler for 'to' date picker
    handleToDateChange(date) {
        let endpoint = `/api/fitbit/mrn/${this.state.mrn}/dates/${moment(this.state.fromDate).format('YYYY-MM-DD')}/${moment(date).format('YYYY-MM-DD')}`;
        this.addData(endpoint)
        this.setState({
          toDate: date
        });
      }
    
    getMinDate(){
        if(this.state.fromDate > this.state.minDate){
            return this.state.fromDate;
        } else {
            return this.state.minDate;
        }
    }

    getMaxDate(){
        if(this.state.toDate < this.state.maxDate){
            return this.state.toDate;
        } else {
            return this.state.maxDate;
        }
    }

    resetDates(){
        this.setState({fromDate: this.state.minDate, toDate: this.state.maxDate});
        this.addData(`/api/fitbit/mrn/${this.state.mrn}`);
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

        let dateEndpoint = `/api/fitbit/mrn/${this.state.mrn}/datelimit`;
        let dataEndpoint = `/api/fitbit/mrn/${this.state.mrn}`;
        
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
            }).then(()=>{this.addData(dataEndpoint)});
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
                    maxDate={this.getMaxDate()}
                    onChange={this.handleFromDateChange}/>
                </div>
                <div className="col-sm">
                    <p>To</p>
                </div>
                <div className="col-sm">
                <DatePicker
                    selected={this.state.toDate}
                    minDate={this.getMinDate()}
                    maxDate={this.state.maxDate}
                    onChange={this.handleToDateChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.resetDates}>Reset</button>
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