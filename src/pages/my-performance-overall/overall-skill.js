import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import SelectBox from '../../views/select-box';
import { trans, interpolate } from '../../utils';
import BarChart from '../../views/charts/bar-chart';
import Button from '../../views/button';
import CONSTANTS from '../../constants';

import './overall-skill.scss';

const OverallSkill = (props) => {
  const { fields: { moduleSelected }, graph, levelId } = props;

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

  const getLoadedData = () => {
    if (moduleSelected) {
      return graph[moduleSelected];
    } else if (graph) {
      return graph[0];
    }

    return [];
  }

  const completedModule = () => (
    <>
      <img
        alt="module-completedimg"
        src={ require("../../assets/images/learner/performance/group-29.png" ) }
        className="overall-skill-content__module-img" />
      <div className="overall-skill-content__module-description">
        { interpolate('Congratulations! You have completed Level %(levelId)s',{ levelId }) }
      </div>
      <div className="overall-skill-content__module-action">
        <a
          className="download-certificate"
          // will get this from backend
          href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download>
          <Button type="submit" text={ trans('download certificate') } classname={ 'btn-outlined' } />
        </a>
      </div>
    </>
  );

  const pendingModule = () => (
    <>
      <img
        alt="module-pendingimg"
        className="overall-skill-content__module-img" />
      <div className="overall-skill-content__module-description">
        { trans('Discussion on how to write a CV') }
      </div>
      <div className="overall-skill-content__module-action">
        { trans('Go to Module') }
      </div>
    </>
  );

  const inProgressModule = () => (
    <>
      <img
        alt="module-progressimg"
        src={ require("../../assets/images/learner/performance/group.png" ) }
        className="overall-skill-content__module-img" />
      <div className="overall-skill-content__module-description">
        { trans('You’re performing well. Keep learning and practicing everyday') }
      </div>
    </>
  );

  const moduleStatus = () => {
    if (props.status && props.status[moduleSelected] === 'in-progress') {
      return inProgressModule();
    } else if (props.status && props.status[moduleSelected] === 'completed') {
      return completedModule();
    }

    return pendingModule();
  }

  return (
    <Paper className="overall-skill-paper">
      <Grid container item spacing={ 2 } direction="column">
        <Grid item xs className="overall-skill-heading">
          <div className="overall-skill-heading__text">
            { trans('Skill Performance Score') }
          </div>
          <SelectBox
            name="modules"
            showFirstEmpty={ false }
            options={ props.modules }
            fieldAttributes={ {
              value: moduleSelected || 0,
              onChange: (e) => props.handleChange('moduleSelected', e),
            } }
          />
        </Grid>
        <Grid item xs={ 12 } container className="overall-skill-content" >
          <Grid item xs={ 9 } className="overall-skill-content__graph">
            <BarChart
              data={ {
                datasets: [
                  {
                    backgroundColor: barColor.skillGraphInitailColor,
                    borderRadius: 2,
                    borderWidth: 0,
                    data: getLoadedData(),
                    hoverBackgroundColor: barColor.skillGraphHoverColor,
                    label: trans('Social')
                  },
                ]
              } }
              onHover= { (evt, item) => onHoverEvent(evt, item) }
              chartAttriburtes= { {
                id: "skill-graph-pearson",
              } }
            />
          </Grid>
          <Grid item xs={ 3 } className="overall-skill-content__module">
            { moduleStatus() }
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OverallSkill;
