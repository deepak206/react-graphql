import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { trans, formatTitleToCamelCase } from '../../utils';
import GreenTick from '../../assets/images/flash-tick.svg';
import LearnerSubHeader from '../../views/learner-sub-header';
import remediationData from './remediation.json';

// css for Remediation
import './remediation.scss';

const Remediation = ({ match: { params: { levelId } }, remediationJson }) => {
  const cardBox = () => {
    return remediationJson.map((test, index) => (
      <Grid item xs={ 12 } sm={ 6 } key={ index }>
        <Paper className="remediation-tiles-container__item">
          <div className="remediation-tiles-container__item-icon">
            <img alt='arrow' src={ require(`../../assets/images/theme-course/${test.image}`) } />
            { test.title }
          </div>
          { !!test.status &&
            <div className="remediation-tiles-container__item-done">
              <img alt="done" src={ GreenTick } />
            </div>
          }
        </Paper>
      </Grid>
    ));
  };

  return (
    <div className="remediation">
      <LearnerSubHeader
        backLink={ `/learner/modules/level-${levelId}` }
        type={ 'remediation' }
        content={ formatTitleToCamelCase(trans('remediation')) }
      />
      <div className="remediation-tiles">
        <div className="remediation-tiles-container">
          <Grid container spacing={ 4 }>
            { cardBox() }
          </Grid>
        </div>
      </div>
    </div>
  )
};

Remediation.defaultProps = {
  remediationJson: remediationData,
}

export default Remediation;
