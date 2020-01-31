import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import Charts from './index';
import CONSTANT from '../../constants';

const DoughnutChart = ({ graphData, chartAttriburtes, options, data }) =>{
  useEffect(() => {
    Chart.Tooltip.positioners.custom = function(elements, position) {
      if (!elements.length) {
        return false;
      }

      return {
        x: (elements[0]._chart.width / 2) - CONSTANT.DOUGHNUT_CHART_XAXIS_CENTER,
        y: (elements[0]._chart.height / 2),
      }
    };
  });

  return(
    <div className="doughnut">
      <Charts
        options= { {
          cutoutPercentage: 70,
          legend: {
            display: false,
            position: 'bottom',
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#FFFFFF',
            bodyFontFamily: 'Open Sans',
            bodyFontSize: 14,
            bodyFontColor: "#000000",
            callbacks: {
              label: function(tooltipItem, data) {
                // calculating percentage
                const dataset = data.datasets[0].data;

                let totalSum = dataset;

                if (Array.isArray(totalSum)) {
                  totalSum = totalSum.reduce((a, b) => a + b, 0);
                }

                const percentage = ( Number.parseInt(dataset[tooltipItem.index]) / Number.parseInt(totalSum) ) * 100;

                return `${Math.round(percentage)}%`;
              },
              title: function() {
                return '';
              },
            },
            cornerRadius: 2,
            displayColors: false,
            enabled: true,
            position: 'custom',
          },
          ...options
        } }
        data={
          {
            datasets: [ {
              backgroundColor: graphData.backcolor || [],
              borderColor: "#fff",
              borderWidth: 2,
              borderAlign: "inner",
              data: graphData.data,
              hoverBackgroundColor: graphData.backcolor || [],
              hoverBorderColor: graphData.backcolor || [],
              // hoverBorderWidth: 4,
            } ],
            labels: graphData.labels || CONSTANT.GRAPH_DEFAULT_LABELS(),
            ...data
          }
        }
        canvasAttribute={ chartAttriburtes }
        type='doughnut'
      />
    </div>
  )
};

export default DoughnutChart;
