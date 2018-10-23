import React from "react";
import moment from 'moment';

import etheme from './Theme'
//import payload from '../../components/Charts/TestPayload'
import op from './FitbitOptions'
import blankOp from './FitbitOptions'

import ChartDatePicker from './ChartDatePicker'

class FitbitChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: etheme,
            option:op,
            loaded: false,
            placeholder: "Loading...",
            hasData: false,
            hasToken: false,
        };

        this.addData = this.addData.bind(this);
    }

    addData(endpoint) {
        this.state.ec.showLoading();
        fetch(endpoint)
        .then(response => {
        if (response.status !== 200) {this.state.ec.showLoading();return this.setState({ placeholder: "Something went wrong" });}
        return response.json();
        })
        .then(data => {
            let newOp = this.state.option;
            let stepsPayload = [];
            let datesPayload = [];
            //-------------------If no data entries----------------------------//
            if(data.error){
                newOp.xAxis[0].data = [];
                newOp.series[0].data = [];
            }
            //-------------------If connected to Fitbit------------------------//
            else if(this.state.hasToken) {
                if (data['activities-tracker-steps'] == undefined) return;
                datesPayload = data['activities-tracker-steps'].map((dataItem) => {return dataItem.dateTime});
                stepsPayload = data['activities-tracker-steps'].map((dataItem) => {return dataItem.value});
            } 
            //------------------Else, not connected to Fitbit------------------//
            else {
                for(let entry of data) {
                    stepsPayload.unshift(entry.steps);
                    // Note: split string to remove tiemezone
                    datesPayload.unshift(moment(entry.date.split("T")[0]).format('ddd DD/MM/YY'));
                }
            }
            //Update the chart
            newOp.xAxis[0].data = datesPayload;
            newOp.series[0].data = stepsPayload;    //Get data from payload
            //newOp.series[1].data = payload.goal;    //Get goal data from payload
            this.setState(state =>({option: newOp}));
            this.state.ec.setOption(this.state.option);
            this.state.ec.hideLoading();
        });  
    }

    componentDidMount() {
        //------------Check if patient has a fitbit token---------------------//
        fetch(`/api/tokens/mrn/${this.props.mrn}`)
        .then(response => {
        if (response.status !== 200) {return this.setState({ placeholder: "Something went wrong" });}
        return response.json();
        })
        .then(data => {
            if(!data.error){    //If patient has fitbit token
                this.setState({hasToken:true}); //Update state
            }
        }) //------------------------------------------------------------------//
        .then(() => {
            //Initialise echart
            let ec = echarts.init(document.getElementById(`test_chart_${this.props.mrn}`), this.state.theme);
            ec.showLoading();
            ec.setOption(blankOp);
            this.setState({ec:ec});

            //Get data from api endpoint
            let dataEndpoint = `/api/fitbit/mrn/${this.props.mrn}`;
            this.addData(dataEndpoint)
        });
    }
    
    render() {
        return (
            <div>
                <div className="x_panel">
                    <div className="x_title">
                        <h2 className="datepicker-inline">Steps from Fitbit</h2>
                        <div className="float-right">
                            <ChartDatePicker 
                                addData={this.addData} 
                                mrn={this.props.mrn} 
                                hasToken={this.props.hasToken}
                                endpoint={"/api/fitbit/mrn/"}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>{" "}
                    {/*end x_title*/}
                    <div className="x_content">
                        <div className="test_chart" id={`test_chart_${this.props.mrn}`}/>
                    </div>{" "}
                    {/*end x_content*/}
                </div>

            </div>
        )
    }
}

export default FitbitChart;