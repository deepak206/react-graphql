import React, { Component } from 'react';
import LinearProgressBar from '../../views/linear-progress-bar';
import TestInstructions from '../../views/test-instructions';
import LearnerSubHeader from '../../views/learner-sub-header';
import { formatTitleToCamelCase } from '../../utils';

export class Instructions extends Component {

  render() {
    const { match: { params: { levelId, type, score } }  } = this.props;

    return (
      <div className="quiz-section">
        <LearnerSubHeader
          backLink={ `/learner/modules/level-${levelId}` }
          type={ type }
          content={ formatTitleToCamelCase(type) }
        />
        <LinearProgressBar completeTest={ 0 }/>
        <TestInstructions levelId={ levelId } type={ type } score={ score }/>
      </div>
    );
  }
}

export default Instructions;
