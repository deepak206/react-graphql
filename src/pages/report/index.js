import React, { Component } from 'react';
import LinearProgressBar from '../../views/linear-progress-bar';
import TestReport from '../../views/test-report';
import LearnerSubHeader from '../../views/learner-sub-header';
import { formatTitleToCamelCase } from '../../utils';

class Report extends Component {

  render() {
    const { match: { params: { levelId, type }, params }  } = this.props;

    return (
      <div className="quiz-report-section">
        <LearnerSubHeader
          backLink={ `/learner/modules/level-${levelId}` }
          type={ type }
          content={ formatTitleToCamelCase(type) }
        />
        <LinearProgressBar completeTest={ 100 }/>
        <TestReport { ...params } />
      </div>
    );
  }
}

export default Report;
