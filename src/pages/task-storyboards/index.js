import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TaskLearningJourneyPopup from './task-learning-journey-popup';
import { parseAssets, trans, getLocalStorageData, setLocalStorageData, getTestUrl } from '../../utils';
import history from "../../routes/history";
import urlChanger from '../../utils/url-changer';
import './task-storyboard.scss';
import LinearProgressBar from "../../views/loader/linear-progress-bar";
import { isEmpty } from 'lodash';
import { learnerModules, loadBreadcrumbs } from '../../dispatchers/learner-module-action-dispatcher';
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';
import { getLearnerPreference, updateLearnerPreference } from '../../service/preference-service';
// import TaskStoryboardsPopup from './task-storyboards-popup';

// css for task stories
import './task-storyboard.scss';

export class TaskStoryboards extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { params } } } = props;

    // decode the url params
    const { courseId, levelId, moduleId } = urlChanger.decode(params);

    this.state = {
      courseId,
      levelId,
      moduleId,
      levelLoaded: true,
      moduleDescription: '',
      moduleName: '',
      isFirstVisit: getLocalStorageData('firstVisit'),
      isFirstVisitOfTaskJourney: false,
      isOpen: true,
      storyboards: props.location && props.location.storyboard,
      tasksData: [],
      activeLevel: getLocalStorageData('activeLevel'),
    };
  }

  componentDidMount = () => {
    const userData  = getLocalStorageData("userData");

    if(getLocalStorageData("isTaskListPreferenceCalled") === null){
      this.getLearnerPreferenceDetails(userData.userId);
    }

    setLocalStorageData('firstVisit', true);
    const { breadcrumbsData, moduleData  } = this.props;

    const { moduleId, levelId, courseId  } = this.state;

    const { userId } = userData;

    // get data from api
    this.props.getModuleData({
      component: 'task',
      moduleId,
      userId,
      levelId,
      breadcrumbsData
    });

    if (!isEmpty(moduleData) && moduleData.module.id === moduleId) {
      // load breadcrumbs
      this.props.loadBreadcrumbs({ courseId, levelId, moduleId, level: moduleData });
    }
  };

  getLearnerPreferenceDetails = (userId) => {
    getLearnerPreference(userId).then((data) => {
      this.setState({ isFirstVisitOfTaskJourney: data.learner.showTaskListWalkthrough });
    }).catch((err) => {
      console.log("getLearnerPreference error", err);
    })
  }

  componentDidUpdate = () => {
    const { moduleData } = this.props;

    if (moduleData.name && this.state.moduleName !== moduleData.module.name ) {
      const { name, description, tasks } = moduleData.module;

      this.setState({
        activeLevel: moduleData.name,
        moduleName: name,
        moduleDescription: description,
        tasksData: ( tasks && tasks.nodes) || {},
      });
    }
  };

  handleClose = () => {
    setLocalStorageData('firstVisit', true);
    this.setState({ isFirstVisit: true, isOpen: false });
  };

  handleViewStory = () => {
    setLocalStorageData('firstVisit', false);
    this.setState({ isFirstVisit: false, isOpen: true });
  };

  doneHandler = (e) => {
    e.stopPropagation();
    this.setState({
      isFirstVisitOfTaskJourney: false
    }, () => {
      const userData  = getLocalStorageData("userData");

      updateLearnerPreference(userData.userId, false, true).then((data) => {
        setLocalStorageData("isTaskListPreferenceCalled", true);
      }).catch((err) => {
        console.log("error", err);
      })
    });
  };

  // on click on task
  handleTaskClick = (item) => {
    const { moduleId, levelId, courseId  } = this.state;

    const breadcrumbData = {
      courseId,
      levelId,
      moduleId
    };

    const urlData = {
      ...breadcrumbData,
      assetId: item.asset.id
    };

    history.push({
      // pass the nextAssetId in query params
      pathname: getTestUrl(urlData),
    });
  };

  moduleTasks = () => {
    const {
      isFirstVisitOfTaskJourney,
      tasksData,
    } = this.state;

    return  !isEmpty(tasksData) && (tasksData.map((item, index) => {
      const currentItem = parseAssets(item.asset);

      if(currentItem === null) {
        return (<div className={ `modules-review-test` } key={ index } />);
      }

      if (currentItem) {
        // eslint-disable-next-line prefer-destructuring
        const { skill, outcome, icon, iconClock, iconQuestion, time, questions } = currentItem;

        // Hide speaking skill as per: SAMOAEP-671
        if (skill !== 'speaking')
          return (
            <div className={ `modules-review-test ${(!index && isFirstVisitOfTaskJourney
            ) ? 'active' : ''}` } key={ index } onClick={ () => this.handleTaskClick(item) }>
              <div className="modules-review-test__container">
                <div className="modules-review-test__container_review-icon">
                  { icon && <div className='modules-review-test__container_review-icon_image' style={ { backgroundImage: `url(${icon})` } } />
                  }
                </div>
                <div className="modules-review-test__container_review-text">
                  <h4 className="modules-review-test__container_review-text_h4">{ skill }</h4>
                  <p className="modules-review-test__container_review-text_p">{ outcome }</p>
                  <ul className="modules-review-test__container_review-list">
                    <li>
                      { iconClock &&
                      <div className='modules-review-test__container_review-list_icon' style={ { backgroundImage: `url(${iconClock})` } } />
                      }
                      { `${time || 0} ${ trans('mins') }` }
                    </li>
                    <li>
                      { iconQuestion &&
                      <div className='modules-review-test__container_review-list_icon' style={ { backgroundImage: `url(${iconQuestion})` } } />
                      }
                      { `${questions} ${ trans('Questions') }` }
                    </li>
                  </ul>
                </div>
              </div>
              {<div className={ `modules-review-test__container_arrow-icon ${(!index && isFirstVisitOfTaskJourney
              ) ? 'active' : ''}` }>
                <img className="modules-review-test__container_arrow-icon_image"
                  src={ require('../../assets/images/learner/module-tasks/module-tasks-icon-arrow.svg') }
                  alt="img"
                />
              </div>
              }
              { !index && isFirstVisitOfTaskJourney &&
              <TaskLearningJourneyPopup doneClickHandler={ this.doneHandler } /> }
            </div>
          )
      }

      return (
        <Fragment key={ index }>
          { !index && isFirstVisitOfTaskJourney &&
            <div  className={ `modules-review-test active` } key={ index }>
              <TaskLearningJourneyPopup doneClickHandler={ this.doneHandler } />
            </div>
          }
        </Fragment>
      );
    }))
  };

  renderLoader() {
    return (
      <div className="full-screen-loader">
        <LinearProgressBar/>
      </div>
    )
  }

  renderData() {
    const {
      // isOpen,
      // isFirstVisit,
      isFirstVisitOfTaskJourney,
      moduleName,
      moduleDescription,
    } = this.state;

    return (
      <div className="task-storyboards-container__tile-section">
        {isFirstVisitOfTaskJourney && <div className="overlay"/>}
        <div className="task-storyboards-container__tile-section_modules">
          { moduleName }
          <p className='task-storyboards-container__tile-section_modules_p'>{ moduleDescription }</p>
          {/* <p className="text-blue" onClick={ this.handleViewStory }>{ trans('View Story') }</p> */}
        </div>
        {/* Module Tasks */}
        { this.moduleTasks() }
      </div>
      // <div className="task-storyboards-container">
      //   <LearnerSubHeader
      //     type={ 'task-storyboards' }
      //     breadcrumbs={
      //       <Fragment>
      //         <div
      //           style={ { cursor: 'pointer' } }
      //           onClick={ () => history.push(`/learner/modules/${courseId}/level-${levelId}`) } className="bredcrumbs-title">
      //           { activeLevel }
      //         </div>
      //         <div className="bredcrumbs-title__desc">{ `Module 01` }</div>
      //       </Fragment>
      //     }
      //   />
      //   {/* Task Storyboard Popup */}
      //   {/* { isFirstVisit && <TaskStoryboardsPopup
      //     activeModule={ moduleId }
      //     storyboards={ {} }
      //     activeLevel={ levelId }
      //     isOpen={ isOpen }
      //     handleClose={ this.handleClose }
      //   />} */}
      // </div>
    );
  }

  render() {
    const { isLoading } = this.props;

    return (isLoading) ? this.renderLoader() : this.renderData();
  }
}

const mapStateToProps = ({
  breadcrumbsState: { breadcrumbsData }, LearnerModuleState: { isLoading, moduleData }
}) => ({ breadcrumbsData, isLoading, moduleData });

const mapDispatchToProps = (dispatch) => ({
  getModuleData: (data) => {
    dispatch(learnerModules(data));
  },
  breadcrumbs: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  },
  loadBreadcrumbs: (breadData) => {
    dispatch(loadBreadcrumbs(breadData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStoryboards);
