import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '../button';
import { trans } from '../../utils';
import history from '../../routes/history';

import './quiz-card.scss';

export default function Quiz(props) {
  const {
    activeLevel,
    cardDetails: {
      active,
      completeQuiz,
      score,
      timeTaken,
    },
  } = props;

  function onClickHandler() {
    history.push(`/learner/modules/level-${activeLevel}/quiz/1/start`);
  }

  if (active && !completeQuiz) {
    return (
      <Card className="quiz-card visited">
        <div className="quiz-card__box-icon-img">
          <img alt="icon" src={ require('../../assets/images/learner/learner-module/quiz-chat-icon.svg') }/>
        </div>
        <p className="quiz-card__p-bold">{ trans('Quiz') }</p>
        <p className="quiz-card__p-message">{ trans('Get ready for a timed Quiz to see how you are doing so far') }</p>
        <div className="quiz-card__icon-clock">
          <img alt="icon"
            src={ require('../../assets/images/learner/learner-module/clock-icon.svg') }/>
          { trans('Duration') }
          <span className="quiz-card__icon-clock_time">25:00</span>
        </div>
        <div className="quiz-card__button_top">
          <Button classNamename={ 'btn-outlined' } clickHandler={ onClickHandler } text={ trans('Start') }/></div>
      </Card>
    );
  }
  if (completeQuiz) {
    return (<Card className="quiz-card visited">
      <div className="quiz-card__icon-lock">
        <img alt="icon" src={ require('../../assets/images/learner/learner-module/green-tick-icon.svg') }/>
      </div>
      <h1>{ score }%</h1>
      <p className="quiz-card__p-bold">{ trans('Quiz Score') }</p>
      <div className="quiz-card__icon-clock quiz-card__icon-time-outer">
        <div className="quiz-card__icon-clock_times">
          <img alt="icon"
            src={ require('../../assets/images/learner/learner-module/clock-icon.svg') }/>
          <span className="quiz-card__icon-clock_times_icon-time">
            { timeTaken }
          </span>
        </div>
        <div>
          <p className="quiz-card__icon-clock_time-taken">{ trans('Time taken') }</p>
        </div>
      </div>
    </Card>);
  }

  return (
    <Card className="quiz-card visited">
      <div className="quiz-card__icon-lock">
        <img alt="icon" src={ require('../../assets/images/learner/learner-module/quiz-lock-icon.svg') }/>
      </div>
      <div className="quiz-card__box-icon-img">
        <img alt="icon" src={ require('../../assets/images/learner/learner-module/quiz-chat-icon.svg') }/>
      </div>
      <p className="quiz-card__p-bold">{ trans('Quiz') }</p>
      <p>{ trans('Get ready for a timed Quiz to see how you are doing so far') }</p>
    </Card>
  );
}
