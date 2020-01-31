import React, { Component } from 'react';
import { trans } from '../../utils';
import history from '../../routes/history';
import Button from '../../views/button';

import './test-instructions.scss';

export class TestInstructions extends Component {

    onClickHandler = () => {
      const { levelId, type } = this.props;

      history.push(`/learner/modules/level-${levelId}/${type}/1/`);
    }

    getDescriptionText = () => {
      const { type } = this.props;

      let description = '';

      switch(type) {
        case 'quiz':
          description = trans('Get ready for a mid-level Quiz!');
          break;

        case 'level_test':
          description = trans('One more step to move to the next level!');
          break;

        case 'review_test':
          description = trans('Time to take the Review test');
          break;

        default:
          break;
      }

      return description;
    }

    render() {
      const { type } = this.props;

      return (
        <div className="test-instructions">
          <div className="test-instructions__review-test test-instructions__lm">
            <div className="test-instructions__review-test_review-lm">
              <h3>{ this.getDescriptionText() }</h3>
            </div>
            <ul className="test-instructions__review-test_lm-list">
              <li>
                <img src={ require('../../assets/images/learner/quiz/icon-clock.svg') }
                  alt={ trans('clock') }/> <p>{ type === 'level_test' ? trans('45 minutes') : trans('25 minutes') }</p></li>
              <li>
                <img src={ require('../../assets/images/learner/quiz/icon-file.svg') }
                  alt={ trans('question') }/> <p>{ type === 'level_test' ? trans('40 questions') : trans('16 questions') }</p></li>
              <li><img src={ require('../../assets/images/learner/quiz/icon-headset.svg') }
                alt={ trans('Headset required') }/> <p>{ trans('Headset required') }</p></li>
            </ul>
            <hr/>
            <div className="test-instructions__review-test_skill-tested">
              <h4>{ trans('Skills tested') }</h4>
              <div className="test-instructions__review-test_skill-tested_skill-box-section">
                <div className="
                test-instructions__review-test_skill-tested_skill-box-section_skill-box test-instructions__review-test_skill-tested_box-reading"
                >
                  <img src={ require('../../assets/images/learner/quiz/icon-reading.svg') } alt={ trans('Reading') }/> <p>{ trans('Reading') }</p>
                </div>
                <div className="
                test-instructions__review-test_skill-tested_skill-box-section_skill-box test-instructions__review-test_skill-tested_box-listening"
                >
                  <img src={ require('../../assets/images/learner/quiz/icon-headphone.svg') } alt={ trans('Listening') }/> <p>{ trans('Listening') }</p>
                </div>
                <div className="
                test-instructions__review-test_skill-tested_skill-box-section_skill-box test-instructions__review-test_skill-tested_box-grammar"
                >
                  <img src={ require('../../assets/images/learner/quiz/icon-grammer.svg') }
                    alt={ trans('Grammar') }/> <p>{ trans('Grammar') }</p>
                </div>
                <div className="
                test-instructions__review-test_skill-tested_skill-box-section_skill-box test-instructions__review-test_skill-tested_box-vocabulary
                ">
                  <img src={ require('../../assets/images/learner/quiz/icon-vocabulary.svg') } alt={ trans('Vocabulary') }/> <p>{ trans('Vocabulary') }</p>
                </div>
              </div>
              <Button text={ type === 'quiz' ? trans('START QUIZ') : trans('START TEST') } classname={ 'btn-outlined' } clickHandler={ this.onClickHandler } />
            </div>
          </div>
        </div>
      );
    }
}

export default TestInstructions;
