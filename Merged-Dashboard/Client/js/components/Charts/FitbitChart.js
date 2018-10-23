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
            connectedToFitbit: false,
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
                let newOp = this.state.option;
                if(data.error){ //If there are no data entries
                    newOp.xAxis[0].data = [];
                    newOp.series[0].data = [];
                } else {    //If data exists
                    let stepsPayload = [];
                    let datesPayload = [];
                    // Add default data
                    for(let entry of data) {
                        stepsPayload.unshift(entry.steps);
                        // Note: split string to remove tiemezone
                        datesPayload.unshift(moment(entry.date.split("T")[0]).format('ddd DD/MM/YY'));
                    }
                    newOp.xAxis[0].data = datesPayload;
                    newOp.series[0].data = stepsPayload;    //Get data from payload
                    //newOp.series[1].data = payload.goal;    //Get goal data from payload
                }
                this.setState(state =>({option: newOp}));
                this.state.ec.setOption(this.state.option);
                this.setState({loaded:true});
        });  
    }

    componentDidMount() {
        if(this.props.lastName == "Test") {
            this.setState({hasData: true}, () => {
                //Initialise echart
                console.log("Trying to init");
                let ec = echarts.init(document.getElementById(`test_chart_${this.props.mrn}`), this.state.theme);
                ec.setOption(blankOp);
                this.setState({ec:ec});

                //Get data from api endpoint
                let dataEndpoint = `/api/fitbit/mrn/${this.props.mrn}`;
                this.addData(dataEndpoint)
            })
            return;
        }
        
        //Check if patient has fitbit token
        fetch("/api/fitbit/mrn/"+this.props.mrn)
        .then(data => {
        return data.json();
        }).then(data => {
        if (data['activities-tracker-steps'] == undefined) return;
        console.log(data['activities-tracker-steps'])
        this.setState({hasData: true}, () => {
            this.createChart(data['activities-tracker-steps'])
        })
        }).catch(err => {
        console.log(err)
        });
    }

    createChart(fitbitData) {
        if (fitbitData == undefined) return;
        var ec = echarts.init(
          document.getElementById(`test_chart_${this.props.mrn}`),
          this.state.theme
        );
        var ops = this.state.option;
        ops.title.text = "Daily";
    
        ops.xAxis[0].data = fitbitData.map((dataItem) => {
          return dataItem.dateTime;
        })
        // process the input data
        var rawSteps = fitbitData.map((dataItem) => {
          return dataItem.value;
        })
        var rawGoal = fitbitData.map(() => {
          return 10000
        })
        
        ops.series[0].data = rawSteps;
        //ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
        //ops.series[1].data = rawGoal;
        this.setState({ option: ops });
        ec.setOption(this.state.option);
        this.setState({ ec: ec });
      }
    
    render() {
        return (
            <div>
                <h3>This is a testing area</h3>
                <div className="x_panel">
                    <div className="x_title">
                        <h2 className="datepicker-inline">Steps from Fitbit</h2>
                        <div className="float-right">
                            <ChartDatePicker addData={this.addData} mrn={this.props.mrn}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>{" "}
                    {/*end x_title*/}
                    <div className="x_content">
                        {this.state.hasData ? <div className="test_chart" id={`test_chart_${this.props.mrn}`} /> : null}
                    </div>{" "}
                    {/*end x_content*/}
                </div>

            </div>
        )
    }
}

export default FitbitChart;