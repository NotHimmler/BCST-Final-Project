import React from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "../components/DateRangePicker";
import etheme from "../components/Charts/Theme";

const $ = require('jquery');
const echarts = require('echarts');

const boxMargins = {
  "paddingLeft": "10px",
  "paddingRight": "10px"
}

class WalkTable extends React.Component {
  constructor(props) {
    super(props);
    this.change_daily = this.change_daily.bind(this);
    this.change_weekly = this.change_weekly.bind(this);
    this.change_monthly = this.change_monthly.bind(this);
    this.colorize_bars = this.colorize_bars.bind(this);
    this.dropdownDistRef = React.createRef();
    this.state = {
      echart: null,
      // optionss
      options_distance: {
        title: {
          text: "Daily"
          //subtext: 'Walked disance and goal disance'
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "Distance Walked (KM)",
            "Goal (KM)"
            /* {
                    name:'Goal',
                    icon: 'roundRect'
                  } */
          ]
        },
        toolbox: {
          show: false
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
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "Distance Walked (KM)",
            type: "bar",
            data: [2.08, 1.08, 1.09, 1.23, 2.3, 1.6, 2.1],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Maximum"
                },
                {
                  type: "min",
                  name: "Minimum"
                }
              ]
            }
          },
          {
            name: "Goal (KM)",
            type: "line",
            data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
          }
          /* {
                  name: 'Goal',
                  type: 'line',
                  markLine: {
                    data: [{
                      name: 'Goal',
                      yAxis: 1.0,
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
    this.chartRef = React.createRef();
  }

  componentDidMount() {
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
    if(this.chartRef.current == null) return;
    var ec = echarts.init(this.chartRef.current, this.state.theme);
    
    ec.setOption(this.state.options_distance);
    //   let option =  options_distance;
    //   option.title.text = 'bbbb';
    //   echartBar.setOption(option);
    this.setState({ echart: ec });

    //echart Bar
  }

  colorize_bars(rawSteps, rawGoal) {
    var coloredBars = [];

    var ColoredBarObject = {
      value: 1.0,
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
      coloredBars.push(cbo);
    }
    return coloredBars;
  }

  // changefunc
  change_daily() {
    let dropdownDist = this.dropdownDistRef.current;
    dropdownDist.innerHTML =
      "Daily" + ' <span class="caret"></span>';

    var echartBar1 = echarts.init(
      this.chartRef.current,
      this.state.theme
    );
    var ops = this.state.options_distance;
    ops.title.text = "Daily";

    ops.xAxis[0].data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var rawBars = [2.08, 1.08, 1.09, 1.23, 2.3, 1.6, 2.1];
    var rawGoal = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

    ops.series[0].data = this.colorize_bars(rawBars, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_distance: ops });
    echartBar1.setOption(this.state.options_distance);
    this.setState({ echart: echartBar1 });
  }

  change_weekly() {
    let dropdownDist = this.dropdownDistRef.current;
    dropdownDist.innerHTML =
      "Weekly" + ' <span class="caret"></span>';

    var echartBar2 = echarts.init(
      this.chartRef.current,
      this.state.theme
    );

    var ops = this.state.options_distance;
    ops.title.text = "Weekly";
    ops.xAxis[0].data = [
      "19/11-25/11",
      "26/11-02/12",
      "03/12-09/12",
      "10/12-16/12"
    ];

    var rawBars = [7.2, 8.4, 12.3, 5.4];
    var rawGoal = [5, 10, 10, 15];

    ops.series[0].data = this.colorize_bars(rawBars, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_distance: ops });
    echartBar2.setOption(this.state.options_distance);
    this.setState({ echart: echartBar2 });

    // $(".btn:first-child #dropdown_fitbit")[0].html('Weekly' + ' <span className="caret"></span>');
    // var nn = 'Weekly';
    // alert(document.getElementById('dropdown_fitbit'));
  }

  change_monthly() {
    let dropdownDist = this.dropdownDistRef.current;
    dropdownDist.innerHTML =
      "Monthly" + ' <span class="caret"></span>';

    var echartBar3 = echarts.init(
      this.chartRef.current,
      this.state.theme
    );
    var ops = this.state.options_distance;
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
    var rawBars = [
      29.2,
      31.1,
      32.4,
      34.1,
      36.2,
      27.3,
      23.5,
      42.3,
      39.9,
      32.2,
      21.8,
      20.1
    ];
    var rawGoal = [20, 20, 25, 25, 25, 30, 30, 30, 40, 40, 50, 50];

    ops.series[0].data = this.colorize_bars(rawBars, rawGoal);
    //ops.series[1].markLine.data[0].yAxis = 2000;
    ops.series[1].data = rawGoal;
    this.setState({ options_distance: ops });
    echartBar3.setOption(this.state.options_distance);
    this.setState({ echart: echartBar3 });
  }

  render() {
    return (
      <div className="row w-100" style={boxMargins}>
      {this.props.lastName == "Test" ?
        <div className="x_panel">
          <div className="x_title">
            <div className="col-md-4">
              <h2 id="overflow">Distance from Walkforward App</h2>
            </div>
            <div className="col-md-4">
              <DateRangePicker />
            </div>
            <div className="col-md-4 pull-right">
              <ul className="nav navbar-right panel_toolbox">
                <li className="dropdown">
                  <button
                    id="dropdown_distance"
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown" ref={this.dropdownDistRef}
                  >
                    Daily
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a id="change-daily-btn" onClick={this.change_daily}>Daily</a>
                    </li>
                    <li>
                      <a id="change-weekly-btn" onClick={this.change_weekly}>Weekly</a>
                    </li>
                    <li>
                      <a id="change-monthly-btn" onClick={this.change_monthly}>Monthly</a>
                    </li>
                  </ul>
                </li>
                {/*                 <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                </li> */}
                <li>
                  <a className="close-link">
                    <i className="fa fa-close" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="clearfix" />
          </div>
          <div className="x_content">
            <div id="mainc" ref={this.chartRef}/>
          </div>
        </div>
        : 
          <div className="x_panel">
            <div className="x_title">
              <h2>Distance from Walkforward App</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="close-link">
                    <i className="fa fa-close" />
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            No Data
          </div>
        }
      </div>
    );
  }
}

export default WalkTable;
