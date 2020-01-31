import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { isEqual, keyBy } from 'lodash';

import './charts.scss';

class Charts extends Component {
  static getLabelAsKey = (d) => d.label;

  static propTypes = {
    canvasAttribute: PropTypes.object,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]).isRequired,
    legend: PropTypes.object,
    options: PropTypes.object,
    redraw: PropTypes.bool,
    type: function(props, propName, componentName) {
      if(!Chart.controllers[props[propName]]) {
        return new Error(
          'Invalid chart type `' + props[propName] + '` supplied to' +
          ' `' + componentName + '`.'
        );
      }

      return false;
    },
  }

  static defaultProps = {
    canvasAttribute: {
      height: 150,
      width: 300,
    },
    datasetKeyProvider: Charts.getLabelAsKey,
    legend: {
      display: false,
    },
    options: {},
    redraw: false,
    type: 'bar',
  }

  constructor(props) {
    super(props);
    this.chartInstance = undefined;
  }

  componentDidMount() {
    Chart.plugins.register({
      beforeUpdate: function(chartInstance) {
        if (chartInstance.config.type === 'bar') {
          for (let i = 0; i < chartInstance.data.datasets.length; i ++) {
            const datasetVal = chartInstance.data.datasets[i].data;
            const finalDataset = datasetVal.map( (x, index) => {

              if (x === 0 && chartInstance.data.labels[index]){ return 0.9; }
              return x;
            })

            chartInstance.data.datasets[i].data = finalDataset;
          }
        }
      }
    },
    Chart.elements.Rectangle.prototype.draw = function() {

      const { ctx } = this._chart;

      const vm = this._view;

      let left, right, top, bottom;

      let { borderWidth } = vm;

      const cornerRadius = 2;

      left = vm.x - vm.width / 2;
      right = vm.x + vm.width / 2;
      top = vm.y;
      bottom = vm.base;
      const signX = 1;
      const signY = bottom > top? 1: -1;
      const borderSkipped = vm.borderSkipped || 'bottom';

      if (borderWidth) {
        const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));

        borderWidth = borderWidth > barSize? barSize: borderWidth;
        const halfStroke = borderWidth / 2;

        const borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);

        const borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);

        const borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);

        const borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);

        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }

        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;

      const corners = [
        [ left, bottom ],
        [ left, top ],
        [ right, top ],
        [ right, bottom ]
      ];

      const borders = [ 'left', 'top', 'right' ];

      let startCorner = borders.indexOf(borderSkipped, 0);

      if (startCorner === -1) {
        startCorner = 0;
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4];
      }

      for (let i = 1; i < 3; i++) {
        let nextCornerId = i+1;

        if(nextCornerId === 4){
          nextCornerId = 0
        }

        cornerAt(nextCornerId);

        const width = corners[2][0] - corners[1][0];

        const height = corners[0][1] - corners[1][1];

        // eslint-disable-next-line prefer-destructuring
        const x = corners[1][0];

        // eslint-disable-next-line prefer-destructuring
        const y = corners[1][1];

        let radius = cornerRadius;

        if(radius > height/2) {
          radius = height/2;
        }
        if(radius > width/2) {
          radius = width/2;
        }

        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width , y + height);
        ctx.lineTo(x, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);

      }

      ctx.fill();
      if (borderWidth) {
        ctx.stroke();
      }
    });

    this.renderChart();
  }

  componentDidUpdate() {
    if (this.props.redraw) {
      this.destroyChart();
      this.renderChart();
      return;
    }

    this.updateChart();
  }

  shouldComponentUpdate(nextProps) {
    const {
      redraw,
      type,
      options,
      plugins,
      legend,
      height,
      width
    } = this.props;

    if (redraw === true) {
      return true;
    }

    if (height !== nextProps.height || width !== nextProps.width) {
      return true;
    }

    if (type !== nextProps.type) {
      return true;
    }

    if (!isEqual(legend, nextProps.legend)) {
      return true;
    }

    if (!isEqual(options, nextProps.options)) {
      return true;
    }

    const nextData = this.transformDataProp(nextProps);

    if( !isEqual(this.shadowDataProp, nextData)) {
      return true;
    }

    return !isEqual(plugins, nextProps.plugins);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  transformDataProp(props) {
    const { data } = props;

    if (typeof(data) == 'function') {
      const node = this.element;

      return data(node);
    } else {
      return data;
    }
  }

  memoizeDataProps() {
    if (!this.props.data) {
      return;
    }

    const data = this.transformDataProp(this.props);

    this.shadowDataProp = {
      ...data,
      datasets: data.datasets && data.datasets.map((set) => {
        return {
          ...set
        };
      })
    };

    this.saveCurrentDatasets();

    // eslint-disable-next-line consistent-return
    return data;
  }

  getCurrentDatasets() {
    return (this.chartInstance && this.chartInstance.config.data && this.chartInstance.config.data.datasets) || [];
  }

  saveCurrentDatasets() {
    this.datasets = this.datasets || {};
    const currentDatasets = this.getCurrentDatasets();

    currentDatasets.forEach((d) => {
      this.datasets[this.props.datasetKeyProvider(d)] = d;
    })
  }

  updateChart() {
    const { options } = this.props;

    const data = this.memoizeDataProps(this.props);

    if (!this.chartInstance) return;

    if (options) {
      this.chartInstance.options = Chart.helpers.configMerge(
        this.chartInstance.options,
        options,
      );
    }

    const currentDatasets = this.getCurrentDatasets();
    const nextDatasets = data.datasets || [];

    const currentDatasetsIndexed = keyBy(
      currentDatasets,
      this.props.datasetKeyProvider
    );

    this.chartInstance.config.data.datasets = nextDatasets.map((next) => {
      const current =
        currentDatasetsIndexed[this.props.datasetKeyProvider(next)];

      if (current && current.type === next.type) {

        current.data.splice(next.data.length);
        next.data.forEach((point, pid) => {
          current.data[pid] = next.data[pid];
        });
        const { data, ...otherProps } = next;

        return {
          ...current,
          ...otherProps
        };
      } else {
        return next;
      }
    });

    const { datasets, ...rest } = data;

    this.chartInstance.config.data = {
      ...this.chartInstance.config.data,
      ...rest
    };

    this.chartInstance.update();
  }

  renderChart() {
    const { options, legend, type, plugins } = this.props;
    const node = this.element;
    const data = this.memoizeDataProps();

    if(typeof legend !== 'undefined' && !isEqual(Charts.defaultProps.legend, legend)) {
      options.legend = legend;
    }

    this.chartInstance = new Chart(node, {
      data,
      options,
      plugins,
      type
    });
  }

  destroyChart() {
    this.saveCurrentDatasets();
    const datasets = Object.values(this.datasets);

    this.chartInstance.config.data.datasets = datasets;

    this.chartInstance.destroy();
  }

  ref = (element) => {
    this.element = element;
  }

  render() {
    const { canvasAttribute } = this.props;

    return (
      <canvas
        { ...canvasAttribute }
        ref={ this.ref }
      />
    );
  }
}

export default Charts;
