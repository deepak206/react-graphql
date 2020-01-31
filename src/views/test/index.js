import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '../button';
import { trans } from '../../utils';
import history from '../../routes/history';

import './test-card.scss';

export default function Test(props) {
  const {
    activeLevel,
    cardDetails: {
      active,
      completeTest,
      result,
      text,
      title,
      type,
    },
  } = props;

  const onClickHandler = () => {
    history.push(`/learner/modules/level-${activeLevel}/${type}/1/start`);
  }

  const startRemediation = () => {
    history.push(`/learner/modules/level-${activeLevel}/remediation`);
  }

  if (type === 'review_test' || type === 'level_test') {
    if (!active && !completeTest) {
      return (
        <Card className="test-card">
          <div className="test-card__review-fl">
            <div className="test-card__review-fl_icon-review-test">
              <img alt="icon" src={ require('../../assets/images/learner/learner-module/test-edit-icon.svg') }/>
            </div>
            <div className="test-card__review-fl_review-text">
              <h4>{ title }</h4>
              <p>{ text }</p>
            </div>
          </div>
          <div className="test-card__icon-lock">
            <img alt="icon" src={ require('../../assets/images/learner/learner-module/test-lock-icon.svg') }/>
          </div>
        </Card>
      );
    }
    if (active && !completeTest) {
      return (
        <Card className="test-card">
          <div className="test-card__review-fl">
            <div className="test-card__review-fl_icon-review-test">
              <img alt="icon" src={ require('../../assets/images/learner/learner-module/test-edit-icon.svg') }/>
            </div>
            <div className="test-card__review-fl_review-text">
              <div>
                <h4>{ title }</h4>
                <p>{ text }</p>
              </div>
              <div className="test-card__icon-clock">
                <img alt="icon"
                  src={
                    require('../../assets/images/learner/learner-module/clock-icon.svg') }/> { trans('Duration') }
                <span className="test-card__icon-clock_time">25:00</span>
              </div>
            </div>
          </div>
          <Button classNamename={ 'btn-outlined' } clickHandler={ onClickHandler } text={ trans('Start') }/>
        </Card>
      );
    }
    if (completeTest) {
      return (
        <Card className="test-card">
          <ul className="test-card__review-result">
            <li className="test-card__review-result_icon-review-test">
              <img alt="icon" src={ require('../../assets/images/learner/learner-module/test-edit-icon.svg') }/>
              <div>
                <h1>{ result.score }%</h1>
                <p>{ trans('Review Test Score') }</p>
              </div>
            </li>
            <li className="test-card__review-result_icon-review-time">
              <img alt="icon"
                src={
                  require('../../assets/images/learner/learner-module/test-watch-icon.svg') }/>
              <div>
                <h3>{ result.timeTake }</h3>
                <p>{ trans('Time taken') }</p>
              </div>
            </li>
            <li className="test-card__review-result_icon-review-scores">
              <img alt="icon"
                src={
                  require('../../assets/images/learner/learner-module/correct-answers-icon.svg') }/>
              <div>
                <h3>{ result.correctAnswers } / { result.totalQuestions }</h3>
                <p>{ trans('Answers') }</p>
              </div>
            </li>
          </ul>
          <div className="test-card__icon-lock">
            <img alt="icon" src={ require('../../assets/images/learner/learner-module/green-tick-icon.svg') }/>
          </div>
        </Card>
      );
    }
  }

  if (type === 'remediation') {
    if (active || completeTest) {
      return (
        <Card className="test-card">
          <div className="test-card__review-fl">
            <div className="test-card__review-fl_icon-review-test">
              <img alt="icon" src={ require('../../assets/images/learner/learner-module/remediation-icon.svg') }/>
            </div>
            <div className="test-card__review-fl_remediation-text">
              <h4>{ title }</h4>
              <p>{ text }</p>
            </div>
          </div>
          {completeTest ? <div className="test-card__icon-lock">
            <img alt="icon" src={ require('../../assets/images/learner/learner-module/green-tick-icon.svg') }/>
          </div> : <Button classNamename={ 'btn-outlined' } clickHandler={ startRemediation } text={ trans('Start') }/>
          }
        </Card>
      );
    }
  }
  return false;
}
