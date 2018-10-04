import React from "react";
import { Link } from "react-router-dom";

class WalkTable extends React.Component {
  constructor(props) {
    super(props);
    this.change_daily = this.change_daily.bind(this);
    this.change_weekly = this.change_weekly.bind(this);
    this.change_monthly = this.change_monthly.bind(this);


    this.state = {
      echart: null,
              // optionss
              options_distance : {
                title: {
                  text: 'Daily: 6 out of 7 Goals compteted',
                  subtext: 'Walked disance and goal disance'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['Walked Distance (KM)', {
                    name:'Goal',
                    icon: 'roundRect'
                  }]
                },
                toolbox: {
                  show: false
                },
                dataZoom : {
                  show : true,
                  realtime: true,
                  start : 0,
                  end : 100
                },
                calculable: false,
                xAxis: [{
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],
                yAxis: [{
                  type: 'value'
                }],
                series: [{
                  name: 'Walked Distance (KM)',
                  type: 'bar',
                  data: [2.08, 1.08, 1.09, 1.23, 2.3, 1.6, 2.1],
                  markPoint: {
                    data: [{
                      type: 'max',
                      name: 'Maximum'
                    }, {
                      type: 'min',
                      name: 'Minimum'
                    }]
                  }
                }, {
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
                }]
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
          },





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
    var ec = echarts.init(document.getElementById('mainc'), this.state.theme);

      ec.setOption(this.state.options_distance);
            //   let option =  options_distance;
            //   option.title.text = 'bbbb';
            //   echartBar.setOption(option);
    this.setState({echart:ec});


      //echart Bar


  }

         // changefunc
          change_daily() {
          document.getElementById('dropdown_distance').innerHTML = 'Daily' + ' <span class="caret"></span>';


          var echartBar1 = echarts.init(document.getElementById('mainc'), this.state.theme);
          var ops = this.state.options_distance;
              ops.title.text = 'Daily: 4 out of 7 Goals compteted';

              ops.xAxis[0].data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              ops.series[0].data = [2.08, 1.08, 1.09, 1.23, 2.3, 1.6, 2.1];
              ops.series[1].markLine.data[0].yAxis = 1.0;
              //ops.series[1].data = [1.0, 1.0, 1.1, 1.1, 1.3, 1.3, 1.3];
          this.setState({options_distance : ops});
          echartBar1.setOption(this.state.options_distance);
          this.setState({echart: echartBar1});

          }
           change_weekly() {
            document.getElementById('dropdown_distance').innerHTML = 'Weekly' + ' <span class="caret"></span>';

             var echartBar2 = echarts.init(document.getElementById('mainc'), this.state.theme);

              var ops = this.state.options_distance;
              ops.title.text = 'Weekly: 2 out of 4 Goals compteted';
              ops.xAxis[0].data = ['19/11-25/11','26/11-02/12',
                  '03/12-09/12','10/12-16/12'];
              ops.series[0].data = [7.2, 8.4, 12.3, 5.4];
              ops.series[1].markLine.data[0].yAxis = 6.5;
              //ops.series[1].data = [5, 10, 10, 15];
              this.setState({options_distance : ops});
              echartBar2.setOption(this.state.options_distance);
              this.setState({echart: echartBar2});

              // $(".btn:first-child #dropdown_fitbit")[0].html('Weekly' + ' <span className="caret"></span>');
              // var nn = 'Weekly';
              // alert(document.getElementById('dropdown_fitbit'));
          }

           change_monthly() {
            document.getElementById('dropdown_distance').innerHTML = 'Monthly' + ' <span class="caret"></span>';

               var echartBar3 = echarts.init(document.getElementById('mainc'), this.state.theme);
              var ops = this.state.options_distance;
              ops.title.text = 'Monthly: 3 out of 12 Goals compteted';
              ops.xAxis[0].data = ['Jan-15', 'Feb-15', 'Mar-15', 'Apr-15',
                  'May-15', 'Jun-15',  'Jul-15',  'Aug-15', 'Sep-15',  'Oct-15',
                  'Nov-15',  'Dec-15'];
              ops.series[0].data = [29.2, 31.1, 32.4, 34.1, 36.2, 27.3,
                23.5, 42.3, 39.9, 32.2, 21.8, 20.1];
              ops.series[1].markLine.data[0].yAxis = 30.0;
              //ops.series[1].data = [20, 20, 25, 25,
                //25, 30, 30,  30, 40, 40, 50,  50];

              this.setState({options_distance : ops});
              echartBar3.setOption(this.state.options_distance);
              this.setState({echart: echartBar3});
          }


    render() {

        return (
          <div className="row col-lg-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>Distance from Walkforward App</h2>

                <ul className="nav navbar-right panel_toolbox">
                <li className="dropdown">
                    <button  id = "dropdown_distance" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Daily
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                    <li><a onClick={this.change_daily}>Daily</a></li>
                      <li><a onClick={this.change_weekly}>Weekly</a></li>
                      <li><a onClick={this.change_monthly}>Monthly</a></li>
                    </ul>
                </li>
{/*                 <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                </li> */}
                <li><a className="close-link"><i className="fa fa-close"></i></a>
                </li>
                </ul>

                <div className="clearfix"></div>
              </div>
              <div className="x_content">
                <div id="mainc">
                </div>
              </div>

            </div>

          </div>
        )
    }
}

export default WalkTable;
