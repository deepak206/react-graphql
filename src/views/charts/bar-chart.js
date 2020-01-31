import React from 'react';
import Charts from './index';
import CONSTANT from '../../constants';

const BarChart = ({ onHover, chartAttriburtes, options, data, xAxes }) => {

  return (
    <Charts
      options={ {
        hover: {
          mode: 'single',
          onHover: (evt, item) => onHover(evt, item),
        },
        events: [ "mousemove", "mouseout" ],
        legend: {
          display: false,
          fullWidth: false,
          labels: {
            boxWidth: 40,
            fontColor: 'black',
            useLineStyle: true,
            usePointStyle: true,
          },
          position: 'right',
          align: 'middle',
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [ {
            ticks: {
              fontColor: "#4e4e4e",
              fontSize: 12,
              fontFamily: "Open Sans",
            },
            gridLines: {
              offsetGridLines: true,
              color: "#f5f5f5" ,
              display: false,
            },
            ...xAxes
          } ],
          yAxes: [ {
            display: true,
            gridLines: {
              zeroLineColor: "#f5f5f5",
              color: "#f5f5f5" ,
              drawBorder: false,
            },
            position: 'right',
            ticks: {
              fontColor: "#4e4e4e",
              fontSize: 12,
              fontFamily: "Open Sans",
              padding: 20,
              callback: function (value) {
                return `${ value }%`;
              },
              max: 100,
              min: 0,
              stepSize: 20,
            },
          }, {
            display: false,
            position: 'left',
          } ]
        },
        tooltips: {
          filter: function (tooltipItem) {
            return tooltipItem.yLabel >= 1;
          },
          backgroundColor: '#4e4e4e',
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.yLabel}%`;
            },
            title: function() {
              return '';
            },
          },
          cornerRadius: 2,
          displayColors: false,
          mode: 'label',
          xAlign: 'center',
          yAlign: 'bottom',
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 28,
            bottom: 0
          }
        },
        ...options
      } }
      data = { {
        datasets: [],
        labels: CONSTANT.GRAPH_DEFAULT_LABELS(),
        ...data
      } }
      canvasAttribute={ chartAttriburtes }
      type='bar'
    />
  )
};

BarChart.defaultProps = {
  xAxes: {
    maxBarThickness: 70
  }
};

export default BarChart;
