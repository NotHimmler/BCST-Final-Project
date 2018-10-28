import React from "react";
import { Link } from "react-router-dom";
const echarts = require("echarts");
const fetch = require('cross-fetch');

class DonutGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donutGraph: <div id="ecdonut" />
    };
  }
  componentDidMount() {
    var theme = {
      color: [
        "#26B99A",
        "#34495E",
        "#BDC3C7",
        "#3498DB",
        "#9B59B6",
        "#8abb6f",
        "#759c6a",
        "#bfd3b7"
      ],

      title: {
        itemGap: 8,
        textStyle: {
          fontWeight: "normal",
          color: "#408829"
        }
      },

      dataRange: {
        color: ["#1f610a", "#97b58d"]
      },

      toolbox: {
        color: ["#408829", "#408829", "#408829", "#408829"]
      },

      tooltip: {
        backgroundColor: "rgba(0,0,0,0.5)",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#408829",
            type: "dashed"
          },
          crossStyle: {
            color: "#408829"
          },
          shadowStyle: {
            color: "rgba(200,200,200,0.3)"
          }
        }
      },

      dataZoom: {
        dataBackgroundColor: "#eee",
        fillerColor: "rgba(64,136,41,0.2)",
        handleColor: "#408829"
      },
      grid: {
        borderWidth: 0
      },

      categoryAxis: {
        axisLine: {
          lineStyle: {
            color: "#408829"
          }
        },
        splitLine: {
          lineStyle: {
            color: ["#eee"]
          }
        }
      },

      valueAxis: {
        axisLine: {
          lineStyle: {
            color: "#408829"
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]
          }
        },
        splitLine: {
          lineStyle: {
            color: ["#eee"]
          }
        }
      },
      timeline: {
        lineStyle: {
          color: "#408829"
        },
        controlStyle: {
          normal: { color: "#408829" },
          emphasis: { color: "#408829" }
        }
      },

      k: {
        itemStyle: {
          normal: {
            color: "#68a54a",
            color0: "#a9cba2",
            lineStyle: {
              width: 1,
              color: "#408829",
              color0: "#86b379"
            }
          }
        }
      },
      map: {
        itemStyle: {
          normal: {
            areaStyle: {
              color: "#ddd"
            },
            label: {
              textStyle: {
                color: "#c12e34"
              }
            }
          },
          emphasis: {
            areaStyle: {
              color: "#99d2dd"
            },
            label: {
              textStyle: {
                color: "#c12e34"
              }
            }
          }
        }
      },
      force: {
        itemStyle: {
          normal: {
            linkStyle: {
              strokeColor: "#408829"
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
              color: "rgba(128, 128, 128, 0.5)"
            },
            chordStyle: {
              lineStyle: {
                width: 1,
                color: "rgba(128, 128, 128, 0.5)"
              }
            }
          },
          emphasis: {
            lineStyle: {
              width: 1,
              color: "rgba(128, 128, 128, 0.5)"
            },
            chordStyle: {
              lineStyle: {
                width: 1,
                color: "rgba(128, 128, 128, 0.5)"
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
            color: [[0.2, "#86b379"], [0.8, "#68a54a"], [1, "#408829"]],
            width: 8
          }
        },
        axisTick: {
          splitNumber: 10,
          length: 12,
          lineStyle: {
            color: "auto"
          }
        },
        axisLabel: {
          textStyle: {
            color: "auto"
          }
        },
        splitLine: {
          length: 18,
          lineStyle: {
            color: "auto"
          }
        },
        pointer: {
          length: "90%",
          color: "auto"
        },
        title: {
          textStyle: {
            color: "#333"
          }
        },
        detail: {
          textStyle: {
            color: "auto"
          }
        }
      },
      textStyle: {
        fontFamily: "Arial, Verdana, sans-serif"
      }
    };

    

    let endpoint = "/api/goal/goalCompletionRate2";

    fetch(endpoint)
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        return response.json();
      })
      .then(data => {
        let countOver = 0;
        let countUnder = 0;
        for (let entry of data) {
          if (entry.rate >= 80) {
            countOver = countOver + 1;
          } else {
            countUnder = countUnder + 1;
          }
        }
        var ecd = echarts.init(document.getElementById("ecdonut"), theme);
        ecd.showLoading();
        ecd.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable: true,
          legend: {
            x: "center",
            y: "bottom",
            data: ["Reaching goals", "Not reaching goals"]
          },
          toolbox: {
            show: false,
            feature: {
              magicType: {
                show: true,
                type: ["pie", "funnel"],
                option: {
                  funnel: {
                    x: "25%",
                    width: "50%",
                    funnelAlign: "center",
                    max: 1548
                  }
                }
              },
              restore: {
                show: false,
                title: "Restore"
              },
              saveAsImage: {
                show: false,
                title: "Save Image"
              }
            }
          },
          series: [
            {
              name: "Goal Completion Rate",
              type: "pie",
              radius: ["35%", "55%"],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    textStyle: {
                      fontSize: "10"
                    }
                  },
                  labelLine: {
                    show: true
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    position: "center",
                    textStyle: {
                      fontSize: "11",
                      fontWeight: "normal"
                    }
                  }
                }
              },
              data: [
                {
                  value: countOver,
                  name: "Reaching goals"
                },
                {
                  value: countUnder,
                  name: "Not reaching goals"
                }
              ]
            }
          ]
        });
        return ecd;
      })
      .then(ecd => {
        ecd.hideLoading();
      })
      .catch(err => {});
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="x_panel">
          <div className="x_title donut">
            <h2>Patient Goal Completion Rate</h2>
            <div className="clearfix" />
          </div>
          <div className="x_content">
            {this.state.donutGraph}
            <p>
              <i>
                Patient is 'reaching goals' if meeting more than 80% of goals.
              </i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DonutGraph;
