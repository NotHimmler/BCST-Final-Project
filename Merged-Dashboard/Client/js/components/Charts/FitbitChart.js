import React from "react";
import ReactDOM from "react-dom";
import moment from 'moment';

import etheme from './Theme'
//import payload from '../../components/Charts/TestPayload'
import op from './FitbitOptions'
import blankOp from './FitbitOptions'

import ChartDatePicker from './ChartDatePicker'
import FitbitInvite from '../../components/FitbitInvite'
const echarts = require('echarts')
global.fetch = global.fetch ? global.fetch : require('cross-fetch');

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
            errorMessage: "Data does not exist",
            
        };
        this.chartRef = React.createRef();
        this.addData = this.addData.bind(this);
        this.addGoal = this.addGoal.bind(this);
        this.colorizeBars = this.colorizeBars.bind(this);
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
            let goalsPayload =[];
            //-------------------If no data entries----------------------------//
            if(data.error){
                if(data.error === 'expired_token'){
                    this.props.onExpiredToken();
                    this.setState({errorMessage: "Cannot get data. Fitbit token has expired."})
                }
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
                goalsPayload = data['activities-tracker-steps'].map((dataItem) => {return 5000});
            } 
            //------------------Else, not connected to Fitbit------------------//
            else {
                for(let entry of data) {
                    stepsPayload.unshift(entry.steps);
                    // Note: split string to remove tiemezone
                    datesPayload.unshift(moment(entry.date.split("T")[0]).format('ddd DD/MM/YY'));
                    goalsPayload.push(5000);
                }
            }
            //Update the chart
            newOp.xAxis[0].data = datesPayload;
            newOp.series[0].data = this.colorizeBars(stepsPayload, goalsPayload);    //Get data from payload
            newOp.series[1].data = goalsPayload;    //Get goal data from payload
            this.setState(state =>({option: newOp}));
            this.state.ec.setOption(this.state.option);
            this.state.ec.hideLoading();
            this.setState({loaded:true});
            return stepsPayload;
        }).then((rawSteps) => {
            //this.addGoal(rawSteps)
        }).catch(err => {
            //Handle Error here
        });  
    }

    addGoal(rawSteps) {
        this.state.ec.showLoading();
        let endpoint = `/api/fitbit/goals/mrn/${this.props.mrn}`;

        fetch(endpoint)
        .then(response => {
            if (response.status !== 200) {this.state.ec.hideLoading();return this.setState({ placeholder: "Something went wrong" });}
            return response.json();
            })
        .then(data => {
            if(data && data.length>0) {
                let goal = data[0].Goal;
                //console.log(goal);
                let start = moment(goal.start.split("T")[0]);
                let end = moment(goal.end.split("T")[0]);
                let goalVal = moment(goal.measurement);

                let newOp = this.state.option;
                let goalsPayload = [];
                let datesPayload = [];
                for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
                    goalsPayload.push(goal.measurement);
                    // Note: split string to remove tiemezone
                    datesPayload.push(m.format('ddd DD/MM/YY'));
                }

                //console.log(goalsPayload);
                //console.log(datesPayload);
                //newOp.xAxis[1].data = datesPayload;
                newOp.series[0].data = this.colorizeBars(rawSteps, goalsPayload);
                newOp.series[1].data = goalsPayload;
                this.setState(state =>({option: newOp}));
                this.state.ec.setOption(this.state.option);
                this.state.ec.hideLoading();
                this.setState({loaded:true});
  
                //console.log(`Start ${start} end ${end} val ${goalVal}`);
            }
        }).catch(err => {
            //Handle error here
        })
    }

    colorizeBars(rawSteps, rawGoal) {
        var coloredSteps = [];
    
        var ColoredBarObject = {
          value: 1000,
          itemStyle: null,
          createBar: function(v) {
            this.value = v;
          }
        };
    
        for (var i = 0; i < rawSteps.length; i++) {
          let cbo = new ColoredBarObject.createBar(rawSteps[i]);
          if (cbo.value < rawGoal[i]) {
            // console.log("err?")
            cbo.itemStyle = { normal: { color: "red" } };
          }
          // else {
          //   cbo.itemStyle = {color: '#FF0000'};
          // }
          coloredSteps.push(cbo);
        }
        return coloredSteps;
      }

    componentDidMount() {
        //Initialise echart
        
        let ec = echarts.init(this.chartRef.current, this.state.theme);
        //ec.setOption(blankOp);
        this.setState({ec:ec}, ()=> {
            //Get data from api endpoint
            let dataEndpoint = `/api/fitbit/mrn/${this.props.mrn}`;
            this.addData(dataEndpoint);
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
                            ? <span className="badge fitbit-badge">Linked to Fitbit</span>
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
                        <div style={{display: this.state.chartDisplay}} className="test_chart" id={`test_chart_${this.props.mrn}`} ref={this.chartRef}/>
                        {
                            (this.state.chartDisplay === "none")
                            ? <div>
                                <p>{this.state.errorMessage}</p>
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