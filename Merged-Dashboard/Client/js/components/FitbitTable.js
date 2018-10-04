import React from "react";
import { Link } from "react-router-dom";

import DateRangePicker from '../components/DateRangePicker'

class FitbitTable extends React.Component {
  constructor(props) {
    super(props);
    this.change_daily = this.change_daily.bind(this);
    this.change_weekly = this.change_weekly.bind(this);
    this.change_monthly = this.change_monthly.bind(this);
    this.colorizeBars = this.colorizeBars.bind(this);


    this.state = {
      echart: null,
              // optionss
              options_fitbit : {
                title: {
                  text: 'Daily',
                  //subtext: 'Walked Steps and Goal Steps'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['Steps Walked', 'Goal (Steps)'
                  /* {
                    name:'Goal',
                    icon: 'roundRect'
                  } */
                ]
                },
                toolbox: {
                  show: false,
                  feature : {
                     dataZoom : {show: true},
                 }
                },

                dataZoom : {
                  show : true,
                  realtime: true,
                  start : 0,
                  end : 100
                }
                ,
                calculable: false,
                xAxis: [{
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],
                yAxis: [{
                  type: 'value'
                }],
                series: [{
                  name: 'Steps Walked',
                  type: 'bar',
                  data: [2292, 2000, 1860, 1881, 2188, 2140, 2088],
                  markPoint: {
                    data: [{
                      type: 'max',
                      name: 'maximum'
                    }, {
                      type: 'min',
                      name: 'minimum'
                    }]
                  }
                },
                {
                  name: 'Goal (Steps)',
                  type: 'line',
                  data: [2000, 2000, 2000,2000,2000,2000,2000]
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
          theme : {
            color: [
              '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
              '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
            ],

            title: {
              itemGap: 8,
              textStyle: {
                fontWeight: 'normal',
                color: '#408829'
              }
            },

            dataRange: {
              color: ['#1f610a', '#97b58d']
            },

            toolbox: {
              color: ['#408829', '#408829', '#408829', '#408829']
            },

            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.5)',
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: '#408829',
                  type: 'dashed'
                },
                crossStyle: {
                  color: '#408829'
                },
                shadowStyle: {
                  color: 'rgba(200,200,200,0.3)'
                }
              }
            },

            dataZoom: {
              dataBackgroundColor: '#eee',
              fillerColor: 'rgba(64,136,41,0.2)',
              handleColor: '#408829'
            },
            grid: {
              borderWidth: 0
            },

            categoryAxis: {
              axisLine: {
                lineStyle: {
                  color: '#408829'
                }
              },
              splitLine: {
                lineStyle: {
                  color: ['#eee']
                }
              }
            },

            valueAxis: {
              axisLine: {
                lineStyle: {
                  color: '#408829'
                }
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                }
              },
              splitLine: {
                lineStyle: {
                  color: ['#eee']
                }
              }
            },
            timeline: {
              lineStyle: {
                color: '#408829'
              },
              controlStyle: {
                normal: {color: '#408829'},
                emphasis: {color: '#408829'}
              }
            },

            k: {
              itemStyle: {
                normal: {
                  color: '#68a54a',
                  color0: '#a9cba2',
                  lineStyle: {
                    width: 1,
                    color: '#408829',
                    color0: '#86b379'
                  }
                }
              }
            },
            map: {
              itemStyle: {
                normal: {
                  areaStyle: {
                    color: '#ddd'
                  },
                  label: {
                    textStyle: {
                      color: '#c12e34'
                    }
                  }
                },
                emphasis: {
                  areaStyle: {
                    color: '#99d2dd'
                  },
                  label: {
                    textStyle: {
                      color: '#c12e34'
                    }
                  }
                }
              }
            },
            force: {
              itemStyle: {
                normal: {
                  linkStyle: {
                    strokeColor: '#408829'
                  }
                }
              }
            },
            chord: {
              padding: 4,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                  },
                  chordStyle: {
                    lineStyle: {
                      width: 1,
                      color: 'rgba(128, 128, 128, 0.5)'
                    }
                  }
                },
                emphasis: {
                  lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                  },
                  chordStyle: {
                    lineStyle: {
                      width: 1,
                      color: 'rgba(128, 128, 128, 0.5)'
                    }
                  }
                }
              }
            },
            gauge: {
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                show: true,
                lineStyle: {
                  color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
                  width: 8
                }
              },
              axisTick: {
                splitNumber: 10,
                length: 12,
                lineStyle: {
                  color: 'auto'
                }
              },
              axisLabel: {
                textStyle: {
                  color: 'auto'
                }
              },
              splitLine: {
                length: 18,
                lineStyle: {
                  color: 'auto'
                }
              },
              pointer: {
                length: '90%',
                color: 'auto'
              },
              title: {
                textStyle: {
                  color: '#333'
                }
              },
              detail: {
                textStyle: {
                  color: 'auto'
                }
              }
            },
            textStyle: {
              fontFamily: 'Arial, Verdana, sans-serif'
            }
          }


    };

  }
  componentDidMount() {
    // Panel toolbox
      $('.collapse-link').on('click', function() {
          var $BOX_PANEL = $(this).closest('.x_panel'),
              $ICON = $(this).find('i'),
              $BOX_CONTENT = $BOX_PANEL.find('.x_content');

          // fix for some div with hardcoded fix class
          if ($BOX_PANEL.attr('style')) {
              $BOX_CONTENT.slideToggle(200, function(){
                  $BOX_PANEL.removeAttr('style');
              });
          } else {
              $BOX_CONTENT.slideToggle(200);
              $BOX_PANEL.css('height', 'auto');
          }

          $ICON.toggleClass('fa-chevron-up fa-chevron-down');
      });

      $('.close-link').click(function () {
          var $BOX_PANEL = $(this).closest('.x_panel');

          $BOX_PANEL.remove();
      });
    // /Panel toolbox

    //echart Bar
    var ec = echarts.init(document.getElementById('mainb'), this.state.theme);

      ec.setOption(this.state.options_fitbit);
      this.change_daily();
            //   let option =  options_fitbit;
            //   option.title.text = 'bbbb';
            //   echartBar.setOption(option);
    this.setState({echart:ec});


      //echart Bar


  }

          colorizeBars(rawSteps, rawGoal) {
            var coloredSteps = [];

            var ColoredBarObject = {
              value: 1000,
              itemStyle: null,
              createBar: function (v) {
                this.value = v;
              }
            };


            for (var i = 0; i < rawSteps.length; i ++) {
              let cbo = new ColoredBarObject.createBar(rawSteps[i]);
              if (cbo.value < rawGoal[i]) {
                // console.log("err?")
                cbo.itemStyle = {normal: {color: 'red'}};
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
          document.getElementById('dropdown_fitbit').innerHTML = 'Daily' + ' <span class="caret"></span>';


          var echartBar1 = echarts.init(document.getElementById('mainb'), this.state.theme);
          var ops = this.state.options_fitbit;
              ops.title.text = 'Daily';

              ops.xAxis[0].data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              // process the input data
              // var rawSteps = [2292, 2000, 1860, 1881, 2188, 2140, 2088];
              var rawSteps = [2292, 2000, 1860, 1881, 2188, 2140, 2088];
              var rawGoal = [2000, 2000, 2000, 2000, 2000, 2000, 2000];

              ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
              //ops.series[1].markLine.data[0].yAxis = 2000;
              ops.series[1].data = rawGoal;
          this.setState({options_fitbit : ops});
          echartBar1.setOption(this.state.options_fitbit);
          this.setState({echart: echartBar1});

          }
           change_weekly() {
            document.getElementById('dropdown_fitbit').innerHTML = 'Weekly' + ' <span class="caret"></span>';

             var echartBar2 = echarts.init(document.getElementById('mainb'), this.state.theme);

              var ops = this.state.options_fitbit;
              ops.title.text = 'Weekly';
              ops.xAxis[0].data = ['19/11-25/11','26/11-02/12',
                  '03/12-09/12','10/12-16/12'];
              var rawSteps = [15305, 23274, 16881, 5004];
              var rawGoal = [10000, 20000, 25000, 20000];

              ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
              //ops.series[1].markLine.data[0].yAxis = 2000;
              ops.series[1].data = rawGoal;
              this.setState({options_fitbit : ops});
              echartBar2.setOption(this.state.options_fitbit);
              this.setState({echart: echartBar2});

              // $(".btn:first-child #dropdown_fitbit")[0].html('Weekly' + ' <span className="caret"></span>');
              // var nn = 'Weekly';
              // alert(document.getElementById('dropdown_fitbit'));
          }

           change_monthly() {
            document.getElementById('dropdown_fitbit').innerHTML = 'Monthly' + ' <span class="caret"></span>';

               var echartBar3 = echarts.init(document.getElementById('mainb'), this.state.theme);
              var ops = this.state.options_fitbit;
              ops.title.text = 'Monthly';
              ops.xAxis[0].data = ['Jan-15', 'Feb-15', 'Mar-15', 'Apr-15',
                  'May-15', 'Jun-15',  'Jul-15',  'Aug-15', 'Sep-15',  'Oct-15',
                  'Nov-15',  'Dec-15'];
              var rawSteps = [93901, 76572, 161213, 172121, 117865, 121369,
                  109692, 100313, 127364, 159968, 126587, 100234];
              var rawGoal = [110000, 100000, 150000, 160000,
                  150000, 150000, 130000,  110000, 130000, 140000, 130000,  150000];

              ops.series[0].data = this.colorizeBars(rawSteps, rawGoal);
              //ops.series[1].markLine.data[0].yAxis = 2000;
              ops.series[1].data = rawGoal;

              this.setState({options_fitbit : ops});
              echartBar3.setOption(this.state.options_fitbit);
              this.setState({echart: echartBar3});
          }


    render() {

        return (
          <div className="row col-lg-12">
            <div className="x_panel">
              <div className="x_title">
                <div className="col-md-4"><h2>Steps from Fitbit</h2></div>
                <div className="col-md-auto"></div>
                  <div className="col-md-4">
                    <DateRangePicker/></div>
                    <div className="col-md-3 pull-right">
                    <ul className="nav navbar-right panel_toolbox">
                    <li className="dropdown">
                        <button  id = "dropdown_fitbit" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Daily
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                        <li><a onClick={this.change_daily}>Daily</a></li>
                          <li><a onClick={this.change_weekly}>Weekly</a></li>
                          <li><a onClick={this.change_monthly}>Monthly</a></li>
                        </ul>
                    </li>
                    {/*<li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                    </li> */}
                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                    </li>
                    </ul>
                
                </div>
                  
                

                <div className="clearfix"></div>
              </div> {/*end x_title*/}
              <div className="x_content">
                <div id="mainb">
                </div>
              </div> {/*end x_content*/}

            </div>

          </div>
        )
    }
}

export default FitbitTable;
