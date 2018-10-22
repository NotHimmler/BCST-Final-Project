const options = {
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
         dataZoom : {show: false},
     }
    },
    dataZoom : {
      show : false,
      realtime: true,
      start : 0,
      end : 100
    }
    ,
    calculable: false,
    xAxis: [{
      type: 'category',
      data: [],
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Steps Walked',
      type: 'bar',
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
    }]
};

export default options;