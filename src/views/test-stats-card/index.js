import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { trans } from '../../utils';
import BarChart from '../charts/bar-chart';
import CircleChart from '../circle-chart';
import CONSTANTS from '../../constants';

import './test-stats-card.scss';

const TestStatsCard = (props) => {
  const {
    title,
    index,
    remediation,
    graph,
    result: {
      score,
      total_answers,
      total_questions,
      avg_time,
    } } = props;

  const [ barColor, setBarColor ] = useState({
    skillGraphHoverColor: CONSTANTS.BAR_GRAPH_COLOR,
    skillGraphInitailColor: CONSTANTS.BAR_GRAPH_HOVER_COLOR,
  });

  const onHoverColorChange = (skillGraphInitailColor, skillGraphHoverColor) => {
    if(barColor.skillGraphInitailColor === skillGraphInitailColor) return false;

    setBarColor({ skillGraphHoverColor, skillGraphInitailColor });

    return false;
  }

  const onHoverEvent = (evt, item) => {
    if (item.length && evt.type === 'mousemove') {
      onHoverColorChange(CONSTANTS.BAR_GRAPH_COLOR, CONSTANTS.BAR_GRAPH_HOVER_COLOR);
    } else if (evt.type === 'mousemove' || evt.type === 'mouseout' ) {
      onHoverColorChange(CONSTANTS.BAR_GRAPH_HOVER_COLOR, CONSTANTS.BAR_GRAPH_COLOR);
    }
  }

  return (
    <div className="test-stats-card">
      <Paper className="test-stats-card-paper">
        <Grid container direction="column">
          <Grid className={ `${index % 2 !== 0 ? `test-stats-card-heading-blue` : `test-stats-card-heading`}` }>
            <div className="test-stats-card-heading__text">
              { trans(title) }
            </div>
          </Grid>
          <Grid item xs={ 12 } container className="test-stats-card-content" >
            <Grid item className="test-stats-card-content__score">
              <div className="test-stats-card-content__score_circle-chart">
                <CircleChart
                  percentageValue={ score }
                  strokeWidth={ 12 }
                  pathStroke={ CONSTANTS.CIRCLE_CHART_PATH_STROKE_COLOR_1 }
                  radius={ 54 }
                  index={ index }
                  showText={ true }
                  xaxis={ 60 }
                  yaxis={ 80 }
                  height={ 100 }
                  width={ 100 }
                  textAttributes={ {
                    fill: CONSTANTS.CIRCLE_CHART_TEXT_COLOR_6,
                    fontSize: 19,
                  } }
                />
              </div>
              <div className="test-stats-card-content__score_sideA">
                <div className="test-stats-card-content__score_sideA_chart-icons">
                  <img src={ require('../../assets/images/learner/quiz/icon-questions-orange.svg') } alt={ trans('question') }/>
                </div>
                <div className="test-stats-card-content__score_sideA_chart-score">
                  <strong>{ total_answers } / { total_questions }</strong>
                  <p className="size12">{trans('Answered Correctly')}</p>
                </div>
              </div>
              <div className="test-stats-card-content__score_sideB">
                <div className="test-stats-card-content__score_sideB_chart-icons">
                  <img src={ require('../../assets/images/learner/quiz/icon-clock-orange.svg') } alt={ trans('clock') } />
                </div>
                <div className="test-stats-card-content__score_sideB_chart-score">
                  <strong>{ avg_time }s</strong>
                  <p className="size12">{ trans('Avg. Time / Question') }</p>
                </div>
              </div>
            </Grid>
            <Grid item className={ `${remediation ? `test-stats-card-content__graph-remediation` : `test-stats-card-content__graph `  }` }>
              <BarChart
                data={ {
                  datasets: [
                    {
                      backgroundColor: barColor.skillGraphInitailColor,
                      borderRadius: 2,
                      borderWidth: 0,
                      data: graph[1],
                      hoverBackgroundColor: barColor.skillGraphHoverColor,
                      label: 'Tests'
                    },
                  ],
                  labels: graph[0],
                } }
                onHover= { (evt, item) => onHoverEvent(evt, item) }
                chartAttriburtes= { {
                  id: "bar-graph",
                } }
                xAxes= { {
                  maxBarThickness: 70
                } }
              />
            </Grid>
            { remediation && <Grid item className="test-stats-card-content__skill-remediation">
              <div className="test-stats-card-content__skill-remediation_title">
                <p>{ trans('Skills for Remediation') }</p>
              </div>
              {remediation.map((data, index) => (
                <div className="test-stats-card-content__skill-remediation_content" key={ index }>
                  <img
                    className="test-stats-card-content__skill-remediation_content_icon"
                    alt=''
                    src={ require(`../../assets/images/theme-course/${data.image}`) } />
                  <p className="test-stats-card-content__skill-remediation_content_title">{ data.title }</p>
                  {data.status && <img className="test-stats-card-content__skill-remediation_content_tick"
                    src={ require('../../assets/images/learner/learner-module/green-tick-icon.svg') } alt=''/> }
                </div>
              ))}
            </Grid> }
          </Grid>
        </Grid>
      </Paper>
    </div>
  )};

export default TestStatsCard;
