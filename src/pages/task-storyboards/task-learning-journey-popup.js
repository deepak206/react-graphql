import React, { Component } from 'react';
import { trans } from '../../utils';
import { func } from 'prop-types';
import Button from '../../views/button'
import './task-storyboard.scss';

class TaskLearningJourneyPopup extends Component {
    static propTypes = {
      doneClickHandler: func
    };

    render() {
      const { doneClickHandler } = this.props;

      return (
        <div className="modules-review-test__popover arrow_box">
          <p>{ trans('Click any of the tasks to start your learning journey') }</p>
          <Button type="button" classname="btn-outlined btn-orange" text={ trans('Done') }
            clickHandler={ doneClickHandler }></Button>
        </div>
      );
    }
}

export default TaskLearningJourneyPopup;
