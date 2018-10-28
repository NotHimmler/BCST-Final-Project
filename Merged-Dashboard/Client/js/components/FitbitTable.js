import React from "react";
import { Link } from "react-router-dom";
const fetch = require('cross-fetch');
import DateRangePicker from "../components/DateRangePicker";
const echarts = require('echarts');
import etheme from "../components/Charts/Theme";
const boxMargins = {
  "paddingLeft": "20px",
  "paddingRight": "20px"
}
class FitbitTable extends React.Component {
  constructor(props) {
    super(props);
    this.change_daily = this.change_daily.bind(this);
    this.change_weekly = this.change_weekly.bind(this);
    this.change_monthly = this.change_monthly.bind(this);
    this.colorizeBars = this.colorizeBars.bind(this);
    this.handleInviteButton = this.handleInviteButton.bind(this);
    this.handleInviteChange = this.handleInviteChange.bind(this);
    this.patientHasData = this.patientHasData.bind(this);

    this.state = {
      inviting: false,
      inviteEmail: "",
      invited: false,
      inviteLink: "",
      hasData: false,
      echart: null,
      // optionss
      options_fitbit: {
        title: {
          text: "Daily"
          //subtext: 'Walked Steps and Goal Steps'
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "Steps Walked",
            "Goal (Steps)"
            /* {
                    name:'Goal',
                    icon: 'roundRect'
                  } */
          ]
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: { show: true }
          }
        },

        dataZoom: {
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        calculable: false,
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            name: "Day",
            axisLabel: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "Steps Walked",
            axisLabel: {
              show: true
            }
          }
        ],
        series: [
          {
            name: "Steps Walked",
            type: "bar",
            data: [2292, 2000, 1860, 1881, 2188, 2140, 2088],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "maximum"
                },
                {
                  type: "min",
                  name: "minimum"
                }
              ]
            }
          },
          {
            name: "Goal (Steps)",
            type: "line",
            data: [2000, 2000, 2000, 2000, 2000, 2000, 2000]
          }
          /* {
                  name: 'Goal',
                  type: 'line',
                  markLine: {
                    data: [{
                      name: 'Goal',
                      yAxis: 2000,
                      lineStyle: {
                        normal :{
                          width:5
                        }
                      }
                    }]
                  }
                } */
        ]
      },

      //Theme
      theme: etheme
    };
  }
  componentDidMount() {
   this.patientHasData(); 
  }
  
  createMockChart() {

    // Panel toolbox
    
    $(".collapse-link").on("click", function() {
      var $BOX_PANEL = $(this).closest(".x_panel"),
        $ICON = $(this).find("i"),
        $BOX_CONTENT = $BOX_PANEL.find(".x_content");

      // fix for some div with hardcoded fix class
      if ($BOX_PANEL.attr("style")) {
        $BOX_CONTENT.slideToggle(200, function() {
          $BOX_PANEL.removeAttr("style");
        });
      } else {
        $BOX_CONTENT.slideToggle(200);
        $BOX_PANEL.css("height", "auto");
      }

      $ICON.toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(".close-link").click(function() {
      var $BOX_PANEL = $(this).closest(".x_panel");

      $BOX_PANEL.remove();
    });
    // /Panel toolbox

    //echart Bar
    var ec = echarts.init(document.getElementById("mainb"), this.state.theme);

    ec.setOption(this.state.options_fitbit);
    this.change_daily();
    //   let option =  options_fitbit;
    //   option.title.text = 'bbbb';
    //   echartBar.setOption(option);
    this.setState({ echart: ec });

    //echart Bar
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
  // changefunc
  change_daily() {
    document.getElementById("dropdown_fitbit").innerHTML =
      "Daily" + ' <span class="caret"></span>';

    var echartBar1 = echarts.init(
      document.getElementById("mainb"),
      this.state.theme
    );
    var ops = this.state.options_fitbit;
    ops.title.text = "Daily";

    ops.xAxis[0].data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // process the input data
    // var rawSteps = [2292, 2000, 1860, 1881, 2188, 2140, 2088];
    var rawSteps = [2292, 2000, 1860, 1881, 2188, 2140, 2088];
    var rawGoal = [2000, 2000, 2000, 2000, 2000, 2000, 2000];

    ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_fitbit: ops });
    echartBar1.setOption(this.state.options_fitbit);
    this.setState({ echart: echartBar1 });
  }
  change_weekly() {
    document.getElementById("dropdown_fitbit").innerHTML =
      "Weekly" + ' <span class="caret"></span>';

    var echartBar2 = echarts.init(
      document.getElementById("mainb"),
      this.state.theme
    );

    var ops = this.state.options_fitbit;
    ops.title.text = "Weekly";
    ops.xAxis[0].data = [
      "19/11-25/11",
      "26/11-02/12",
      "03/12-09/12",
      "10/12-16/12"
    ];
    var rawSteps = [15305, 23274, 16881, 5004];
    var rawGoal = [10000, 20000, 25000, 20000];

    ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_fitbit: ops });
    echartBar2.setOption(this.state.options_fitbit);
    this.setState({ echart: echartBar2 });

    // $(".btn:first-child #dropdown_fitbit")[0].html('Weekly' + ' <span className="caret"></span>');
    // var nn = 'Weekly';
    // alert(document.getElementById('dropdown_fitbit'));
  }

  change_monthly() {
    document.getElementById("dropdown_fitbit").innerHTML =
      "Monthly" + ' <span class="caret"></span>';

    var echartBar3 = echarts.init(
      document.getElementById("mainb"),
      this.state.theme
    );
    var ops = this.state.options_fitbit;
    ops.title.text = "Monthly";
    ops.xAxis[0].data = [
      "Jan-15",
      "Feb-15",
      "Mar-15",
      "Apr-15",
      "May-15",
      "Jun-15",
      "Jul-15",
      "Aug-15",
      "Sep-15",
      "Oct-15",
      "Nov-15",
      "Dec-15"
    ];
    var rawSteps = [
      93901,
      76572,
      161213,
      172121,
      117865,
      121369,
      109692,
      100313,
      127364,
      159968,
      126587,
      100234
    ];
    var rawGoal = [
      110000,
      100000,
      150000,
      160000,
      150000,
      150000,
      130000,
      110000,
      130000,
      140000,
      130000,
      150000
    ];

    ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;

    this.setState({ options_fitbit: ops });
    echartBar3.setOption(this.state.options_fitbit);
    this.setState({ echart: echartBar3 });
  }

  //Make a call to the database to see if the patient has any data in the DB or a fitbit token
  patientHasData() {
    if(this.props.lastName == "Test") {
      console.log("Making the mock graph");
      this.setState({hasData: true}, () => {
        this.createMockChart();
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
      //console.log(err)
    })
  }

  createChart(fitbitData) {
    if (fitbitData == undefined) return;
    var echartBar1 = echarts.init(
      document.getElementById("mainb"),
      this.state.theme
    );
    var ops = this.state.options_fitbit;
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

    ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_fitbit: ops });
    echartBar1.setOption(this.state.options_fitbit);
    this.setState({ echart: echartBar1 });
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

  render() {
    return (
      
      <div className="row w-100" style={boxMargins}>
        <div className="x_panel">
          <div className="x_title">
            <div className="col-md-4">
              <h2>Steps from Fitbit</h2>
            </div>
            <div className="col-md-auto" />

            <div className="col-md-4">
              <DateRangePicker />
            </div>
            <div className="col-md-3 pull-right">
              <ul className="nav navbar-right panel_toolbox">
                <li className="dropdown">
                  <button
                    id="dropdown_fitbit"
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Daily
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a onClick={this.change_daily}>Daily</a>
                    </li>
                    <li>
                      <a onClick={this.change_weekly}>Weekly</a>
                    </li>
                    <li>
                      <a onClick={this.change_monthly}>Monthly</a>
                    </li>
                  </ul>
                </li>
                {/*<li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                    </li> */}
                <li>
                  <a className="close-link">
                    <i className="fa fa-close" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="clearfix" />
          </div>{" "}
          {/*end x_title*/}
          <div className="x_content">
            {this.state.hasData ? 
            <div id="mainb" /> : 
            <div>
              No Data - {this.state.inviting 
                        ? <input autoComplete={"off"} type="email" name="email" value={this.state.inviteEmail} onChange={this.handleInviteChange} placeholder="Patient Email Address"/> 
                        : null}
                        <button onClick={() => this.handleInviteButton("cancel")}>
                          {this.state.inviting && this.state.inviteEmail != "" 
                          ? <a href={this.state.inviteLink}>Send Email</a> 
                          : "Send Patient Invite"}
                        </button> 
                        {this.state.inviting ? 
                        <button onClick={() => this.handleInviteButton("cancel")}>Cancel</button> 
                        : null} 
            </div>
            }
          </div>{" "}
          {/*end x_content*/}
        </div>
      </div>
    );
  }
}

export default FitbitTable;
