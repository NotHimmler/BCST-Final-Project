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
            hasData: false,

            // state for invite
            inviting: false,
            inviteEmail: "",
            invited: false,
            inviteLink: "",
        };

        this.addData = this.addData.bind(this);
        this.handleInviteButton = this.handleInviteButton.bind(this);
        this.handleInviteChange = this.handleInviteChange.bind(this);

        this.colorizeBars = this.colorizeBars.bind(this);
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

    handleInviteButton(data, event) {
        if (this.state.inviting && data == "cancel") {
          this.setState({inviting: false})
        } else if (this.state.inviting && data == "invite") {
          if (this.state.inviteEmail != "") {
            
          }
        } else {
    
        }
        this.setState({inviting: !this.state.inviting})
      }
    
    handleInviteChange(event) {
    let href = `mailto:${this.state.inviteEmail}?subject=Please Connect Your Fitbit For Therapist&body=http://localhost:8080/fitbitAuth/${this.props.mrn}`
    this.setState({inviteEmail: event.target.value, inviteLink: href})
    }

    componentDidMount() {
        console.log("test");
        console.log(this.props.lastName);
        if(this.props.lastName == "Test") {
            this.setState({hasData: true}, () => {
                //Initialise echart
                let ec = echarts.init(document.getElementById('test_chart'), this.state.theme);
                ec.setOption(this.state.option);
                this.setState({ec:ec});

                let dataEndpoint = `/api/fitbit/mrn/${this.state.mrn}`;
                this.addData(dataEndpoint)
            })
            return;
        }
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

    createChart(fitbitData) {
        if (fitbitData == undefined) return;
        var ec = echarts.init(
          document.getElementById("test_chart"),
          this.state.theme
        );
        var ops = this.state.option;
        ops.title.text = "Daily";
    
        ops.xAxis[0].data = fitbitData.map((dataItem) => {
          return dataItem.dateTime;
        })
        // process the input data
        // var rawSteps = [2292, 2000, 1860, 1881, 2188, 2140, 2088];
        var rawSteps = fitbitData.map((dataItem) => {
          return dataItem.value;
        })
        var rawGoal = fitbitData.map(() => {
          return 10000
        })
        
        ops.series[0].data = rawSteps;
        //ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
        //ops.series[1].markLine.data[0].yAxis = 2000;
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
                            <ChartDatePicker addData={this.addData} mrn={this.state.mrn}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>{" "}
                    {/*end x_title*/}
                    <div className="x_content">
                        {this.state.hasData ? <div id="test_chart" /> : <div>No Data - {this.state.inviting ? <input autoComplete={"off"} type="email" name="email" value={this.state.inviteEmail} onChange={this.handleInviteChange} /> : null}<button onClick={() => this.handleInviteButton("cancel")}>{this.state.inviting && this.state.inviteEmail != "" ? <a href={this.state.inviteLink}>Send Email</a> : "Send Patient Invite"}</button> {this.state.inviting ? <button onClick={() => this.handleInviteButton("cancel")}>Cancel</button> : null} </div>}
                    </div>{" "}
                    {/*end x_content*/}
                </div>

            </div>
        )
    }
}

export default TestChart;