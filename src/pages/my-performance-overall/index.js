import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { func } from 'prop-types';
import { trans, getLocalStorageData, setLocalStorageData } from '../../utils';
import OverallSkill from './overall-skill';
import { getOverAllData } from '../../dispatchers/performance-action-dispatcher';
import OverallThemeTime from './overall-theme-time';
import MetricsCard from '../../views/metrics-card';
import MyPerformanceEmptyState from '../../views/my-performance-empty-state';
import DialogBox from '../../views/dialog-box';
import Button from '../../views/button';

// css for overall tab
import './overall.scss';

const noopFn = () => true;

export class MyPerformanceOverall extends Component {
  static propTypes = {
    getOverAllData: func,
  };

  static defaultProps = {
    getOverAllData: noopFn,
    skillResult: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        moduleSelected: 0
      },
      isFirstVisit: getLocalStorageData('firstVisitOfPerformance') === null
        ? true : getLocalStorageData('firstVisitOfPerformance'),
      isOpen: true,
    };
  }

  componentDidMount() {
    const { match: { params: { levelId } }, getOverAllData } = this.props;

    getOverAllData({ levelId });
  }

  componentDidUpdate(nextProps) {
    const { match: { params: { levelId } }, getOverAllData } = this.props;

    if (nextProps.match.params.levelId !== levelId) {
      getOverAllData({ levelId });
    }
  }

  handleChange = (field, e) => {
    const { target } = e;
    const { fields } = this.state;

    fields[field] = target.value;

    this.setState({ fields });
  }

  walkThrough_1_ClickHandler = () => {
    this.setState({ isOpen: false });
  }

  walkThrough_2_ClickHandler = () => {
    this.setState({ isFirstVisit: false });
    setLocalStorageData('firstVisitOfPerformance', false);
  }

  WalkThrough_2 =() => {
    return (
      <>
        <div className='performance-overall__popover_overlay'></div>
        <div className="performance-overall__popover arrow_box">
          <p>{ trans('Click on Skill and Test to check your skillwise performance and test results') }</p>
          <Button type="button" classname="btn-outlined btn-orange" text={ trans('Done') }
            clickHandler={ this.walkThrough_2_ClickHandler }></Button>
        </div>
      </>
    )
  }

  WalkThrough_1 = () => {
    const { isOpen, } = this.state;

    return (
      <DialogBox alignCenter={ true } isOpen={ isOpen } title={ trans('Start tracking your performance') }>
        <div className='dailogbox-container__content-right'>
          <p className='dailogbox-container__content-right_p'
            dangerouslySetInnerHTML=
              { { __html: trans(`As you learn, you will see your performance report here. Track your progress across tasks, quiz and tests.`) } }>
          </p>
        </div>
        <div className='dailogbox-container__content-right'>
          <Button classname={ 'btn-outlined' } clickHandler={ this.walkThrough_1_ClickHandler } text={ trans('Next') }/>
        </div>
      </DialogBox>
    )
  }

  render() {
    const { match: { params: { levelId } }, skillResult } = this.props;
    const { fields, isFirstVisit, isOpen } = this.state;

    if (skillResult && Object.keys(skillResult).length) {

      return (
        <div className='performance-overall'>
          <div className='performance-overall__container'>
            { isFirstVisit && isOpen && this.WalkThrough_1() }
            { isFirstVisit && !isOpen && this.WalkThrough_2() }
            <div className='performance-overall-resultcard'>
              <Grid item xs={ 12 } container className="performance-overall-resultcard-grid" spacing={ 4 } >
                { skillResult.moduleResult &&
                  <Grid item xs className="performance-overall-resultcard-grid__item">
                    <MetricsCard
                      title={ skillResult.moduleResult ? `${skillResult.moduleResult['completed']} / ${skillResult.moduleResult['total']}` : `0 / 10` }
                      className="performance-overall-resultcard-grid__item-module"
                      subTitle={ trans('Modules Completed') }
                      icon='learner/performance/overall/module-icon.svg'/>
                  </Grid>
                }
                { skillResult.taskResult &&
                  <Grid item xs className="performance-overall-resultcard-grid__item">
                    <MetricsCard
                      title={ `${skillResult.taskResult['completed']} / ${skillResult.taskResult['total']}` || `0 / 10` }
                      className="performance-overall-resultcard-grid__item-task"
                      subTitle={ trans('Tasks Completed') }
                      icon='learner/performance/overall/task-icon.svg'/>
                  </Grid>
                }
                { skillResult.timespent &&
                  <Grid item xs className="performance-overall-resultcard-grid__item">
                    <MetricsCard
                      type='time'
                      hours={  skillResult.timespent.hour || ""  }
                      minutes={ skillResult.timespent.minute || "" }
                      className="performance-overall-resultcard-grid__item-time"
                      subTitle={ trans('Time Spent') }
                      icon='learner/performance/overall/time-icon.svg'/>
                  </Grid>
                }
              </Grid>
            </div>
            <div className="overall-skill">
              <OverallSkill
                handleChange={ (res, event) => this.handleChange(res, event) }
                fields={ fields }
                levelId={ levelId }
                { ...skillResult }/>
            </div>
            <div className="overall-theme">
              <OverallThemeTime { ...skillResult }/>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='performance-overall'>
        <div className='performance-overall__container'>
          { isFirstVisit && isOpen && this.WalkThrough_1() }
          { isFirstVisit && !isOpen && this.WalkThrough_2() }
          <MyPerformanceEmptyState activeLevel={ levelId }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ performanceOverallState: { skillResult } }) => ({ skillResult });

const mapDispatchToProps = (dispatch) => ({
  getOverAllData: (levelId) => {
    dispatch(getOverAllData(levelId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPerformanceOverall);
