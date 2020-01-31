import React, { useState } from 'react';
import BarChart from '../../views/charts/bar-chart';
import CONSTANTS from '../../constants';

import './my-performance-skill.scss';

const MyPerformanceSkillChart = (props) => {
  const {
    graphData,
    graphLabel
  } = props;
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
    <><div className='my-performance-skill__container_chart-section_chart'>
      <BarChart
        data={ {
          datasets: [
            {
              backgroundColor: barColor.skillGraphInitailColor,
              borderRadius: 2,
              borderWidth: 0,
              data: graphData,
              hoverBackgroundColor: barColor.skillGraphHoverColor,
              label: 'Skill'
            },
          ],
          labels: graphLabel
        } }
        onHover= { (evt, item) => onHoverEvent(evt, item) }
        chartAttriburtes= { {
          id: "skill-graph-pearson",
        } }
      />
    </div></>
  )};

export default MyPerformanceSkillChart;
