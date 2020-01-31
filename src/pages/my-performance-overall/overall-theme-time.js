import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { trans } from '../../utils';
import BarChart from '../../views/charts/bar-chart';
import CONSTANTS from '../../constants';
import DoughnutChart from '../../views/charts/doughnut-chart';

import './overall-theme-time.scss';

const OverallThemeTime = ({ themegraph, timeGraph }) => {

  const [ barColor, setBarColor ] = useState({
    socialHoverColor: CONSTANTS.STACK_BAR_SOCIAL_HOVER_COLOR,
    socialInitailColor: CONSTANTS.STACK_BAR_SOCIAL_COLOR,
    profHoverColor: CONSTANTS.STACK_BAR_PRO_HOVER_COLOR,
    profInitailColor: CONSTANTS.STACK_BAR_PRO_COLOR,
  });

  const onHoverColorChange = (socialInitailColor, socialHoverColor, profInitailColor, profHoverColor) => {
    if(barColor.socialInitailColor === socialInitailColor) return false;

    setBarColor({
      socialInitailColor,
      socialHoverColor,
      profInitailColor,
      profHoverColor
    });

    return false;
  }

  const onHoverEvent = (evt, item) => {
    if (item.length && evt.type === 'mousemove') {
      onHoverColorChange(
        CONSTANTS.STACK_BAR_SOCIAL_HOVER_COLOR,
        CONSTANTS.STACK_BAR_SOCIAL_COLOR,
        CONSTANTS.STACK_BAR_PRO_HOVER_COLOR,
        CONSTANTS.STACK_BAR_PRO_COLOR
      );
    } else if (evt.type === 'mousemove' || evt.type === 'mouseout' ) {
      onHoverColorChange(
        CONSTANTS.STACK_BAR_SOCIAL_COLOR,
        CONSTANTS.STACK_BAR_SOCIAL_HOVER_COLOR,
        CONSTANTS.STACK_BAR_PRO_COLOR,
        CONSTANTS.STACK_BAR_PRO_HOVER_COLOR
      );
    }
  }

  // Used Material UI grid here, change if you want to change this.
  const legendRender = () => CONSTANTS.GRAPH_DEFAULT_LABELS().map((label, index) => (
    <Grid className="doughnut-legends-grid__item" item xs={ 6 } key={ index }>
      <span className="doughnut-legends-grid__item-circle" style={ { backgroundColor: CONSTANTS.DOUGHNUT_COLOR_CHART[index] || '' } } />
      {label}
    </Grid>
  ));

  return (
    <Grid container item spacing={ 4 }>
      <Grid item className="overall-theme-stackchart">
        <Paper className="stackchart-paper">
          <Grid item xs className="stackchart-paper-heading">
            <div className="stackchart-paper-heading__text">
              { trans('Theme Performance Score') }
            </div>
            <div className="stackchart-paper-heading-legend">
              <span className="stackchart-paper-heading-legend__social" />
              { trans('Social') }
              <span className="stackchart-paper-heading-legend__professional" />
              { trans('Professional') }
            </div>
          </Grid>
          <Grid item xs className="stackchart-paper-graph">
            <BarChart
              xAxes= { {
                categoryPercentage: "0.5"
              } }
              options= { {
                tooltips: {
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
                  mode: 'single',
                  xAlign: 'center',
                  yAlign: 'bottom',
                },
              } }
              data={ {
                datasets: [
                  {
                    backgroundColor: barColor.socialInitailColor,
                    borderRadius: 2,
                    borderWidth: 0,
                    data: themegraph ? themegraph.social : [],
                    hoverBackgroundColor: barColor.socialHoverColor,
                    label: trans('Social')
                  },
                  {
                    backgroundColor: barColor.profInitailColor,
                    borderRadius: 2,
                    borderWidth: 0,
                    data: themegraph ? themegraph.professional : [],
                    hoverBackgroundColor: barColor.profHoverColor,
                    label: trans('Professional')
                  }
                ]
              } }
              onHover= { (evt, item) => onHoverEvent(evt, item) }
              chartAttriburtes= { {
                id: "stacked-bar-graph"
              } }
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item container className="overall-theme-timechart" >
        <Paper className="stackchart-paper">
          <Grid item xs className="stackchart-paper-heading">
            <div className="stackchart-paper-heading__text">
              { trans('Time Spent') }
            </div>
          </Grid>
          {
            timeGraph &&
            <>
              <DoughnutChart
                graphData={ {
                  data: timeGraph.length ? timeGraph : [ 10 ],
                  backcolor: timeGraph.length ? CONSTANTS.DOUGHNUT_COLOR_CHART : CONSTANTS.DOUGHNUT_DEFAULT_COLOR,
                } }
                chartAttriburtes= { {
                  id: "overall-doughnut-graph",
                } } />
              <div id="doughnut-legends">
                <Grid container className={ `overall-doughnut-graph-legend doughnut-legends-grid` } spacing={ 4 }>
                  { legendRender() }
                </Grid>
              </div>
            </>
          }
        </Paper>
      </Grid>
    </Grid>
  )
}

export default OverallThemeTime;
