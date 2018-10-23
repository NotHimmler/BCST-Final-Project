import React from "react";
import moment from 'moment';

import etheme from './Theme'
//import payload from '../../components/Charts/TestPayload'
import op from './FitbitOptions'
import blankOp from './FitbitOptions'

import ChartDatePicker from './ChartDatePicker'
import FitbitInvite from '../../components/FitbitInvite'

class FitbitChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: etheme,
            option:op,
            loaded: false,
            placeholder: "Loading...",
            chartDisplay: "block",
            testing: "",
        };

        this.addData = this.addData.bind(this);
    }

    addData(endpoint) {
        this.state.ec.showLoading();
        fetch(endpoint)
        .then(response => {
        if (response.status !== 200) {this.state.ec.hideLoading();return this.setState({ placeholder: "Something went wrong" });}
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
                this.state.ec.hideLoading();
                this.setState({chartDisplay: "none"});
                return;
            }
            //-------------------If connected to Fitbit------------------------//
            else if(this.props.hasFitbitToken) {
                if (data['activities-tracker-steps'] == undefined) return;
                datesPayload = data['activities-tracker-steps'].map((dataItem) => {return moment(dataItem.dateTime).format('ddd DD/MM/YY')});
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
            this.setState({loaded:true});
        });  
    }

    componentDidMount() {
        //Initialise echart
        let ec = echarts.init(document.getElementById(`test_chart_${this.props.mrn}`), this.state.theme);
        //ec.setOption(blankOp);
        this.setState({ec:ec}, ()=> {
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
                        {
                            (this.props.hasFitbitToken)
                            ? <span class="badge fitbit-badge">Linked to Fitbit</span>
                            : null
                        }
                        <div className="float-right">
                        { (this.state.loaded)
                            ?<ChartDatePicker 
                            addData={this.addData} 
                            mrn={this.props.mrn} 
                            endpoint={"/api/fitbit/mrn/"}
                            chartDisplay={this.state.chartDisplay}/>
                            :null
                        }
                        </div>
                        <div className="clearfix"></div>
                    </div>{" "}
                    {/*end x_title*/}
                    <div className="x_content">
                        <div style={{display: this.state.chartDisplay}} className="test_chart" id={`test_chart_${this.props.mrn}`}/>
                        {
                            (this.state.chartDisplay === "none")
                            ? <div>
                                <p>Data does not exist</p>
                                <p>Link to Fitbit: </p>
                                <FitbitInvite mrn={this.props.mrn} hasFitbitToken={this.props.hasFitbitToken}/>                                </div>
                            : null
                        }
                    </div>{" "}
                    {/*end x_content*/}
                </div>

            </div>
        )
    }
}

export default FitbitChart;