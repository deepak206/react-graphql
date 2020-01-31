import React from 'react';
import Dashboard from './index';
import { connect } from 'react-redux';
import { trans, interpolate, parseAssets, setLocalStorageData, getLocalStorageData, getTestUrl, getLocale } from '../../utils';
import LearnerDashboardLevelSlider from './learner-dashboard-level-slider';
import { getTasksInModule, getCourseModuleData } from '../../service/data-service.js';
import { getLearnerPreference, updateLearnerPreference } from '../../service/preference-service';
import LinearProgressBar from "../../views/loader/linear-progress-bar";
import DialogBox from '../../views/dialog-box';
import Button from '../../views/button';
import history from '../../routes/history';
import { emptyTaskList } from '../../actions/learner-module-action-type';
import { leftNavigation } from '../../dispatchers/left-navigation-action-dispatcher';
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';
import { chain } from 'lodash';
import './learner-dashboard.scss';
import { getCasSignature } from "../../service/cas-api.service";

class LearnerDashboard extends Dashboard {

  taskMemo = {};
  userData  = getLocalStorageData("userData");
  constructor(props){
    super(props);
    this.state={
      activeLevel: 4,
      moduleId: 1,
      userName: '',
      isLoading: true,
      isSliderLoading: false,
      isFirstVisitOfLearnerDashboard: false,
      learnerDashboardWalkThrough_1: false,
      learnerDashboardWalkThrough_2: false,
      isOpen: true,
      taskData: [],
      hmac: ''
    }
  }

componentDidMount = () => {

  if(getLocalStorageData("isDashboardPreferenceCalled") === null){
    this.getLearnerPreferenceDetails(this.userData.userId);
  }

  getCasSignature(this.userData.userId).then((res) => {
    this.setState({
      hmac: res
    }, ()=> {
      this.getCourseModule()
    })
  });

};

  getCourseModule = () => {

    getCourseModuleData(this.userData.userId).then((data) => {
      try {
        const { learner: { course: { course: { id, levels: { nodes } } } } } = data;

        this.setState({
          courseInstanceId: id,
          levelsData: nodes,
          levelId: nodes.length && nodes[0].id,
          levelDescription: nodes.length && nodes[0].description,
          activeLevel: parseInt(nodes.length && nodes[0].name.replace("Level ", "")),
          modulesData: nodes.length && nodes[0].modules.nodes,
          isLoading: false,
          isSliderLoading: false,
          userId: this.userData.userId,
          userName: `${this.userData.firstName} ${this.userData.lastName}` }, () => {
          this.getModulesForLevels(nodes.length && nodes[0].id);
          setLocalStorageData('levelId', this.state.levelId);
          setLocalStorageData('courseInstanceId', this.state.courseInstanceId);
        });
      } catch(err) {
        console.log("error", err);
        this.setState({ isLoading: true, isSliderLoading: true });
      }
    }).catch((err) => {
      console.log("error", err);
    })
  };

getLearnerPreferenceDetails = (userId) => {
  getLearnerPreference(userId).then((data) => {
    setLocalStorageData("lng", data.learner.locale || getLocale());

    this.setState({ isFirstVisitOfLearnerDashboard: data.learner.showDashboardWalkthrough });
  }).catch((err) => {
    console.log("error", err);
  })
};

getModulesForLevels(levelid) {
  try{
    const currentLevel = this.state.levelsData.find((levelData) => {
      return levelData.id === levelid;
    });
    const sortedModules = chain(currentLevel.modules.nodes).sortBy('orderNumber')
      .map((m) => ({ ...m, 'thumbnailUrl': m.thumbnailUrl+this.state.hmac })).value();

    this.setState({
      modulesData: sortedModules,
      moduleId: sortedModules[0].id,
      levelId: currentLevel.id,
      levelDescription: currentLevel.description,
      activeLevel: parseInt(currentLevel.name.replace("Level ", "")),
      isLoading: false,
      isSliderLoading: false,
    }, () => { this.getTasksInModules(this.state.levelId, this.state.moduleId)});
  } catch(err) {
    console.log("error", err);
    this.setState({ isLoading: true, isSliderLoading: true });
  }
}

getTasksInModules(levelid, moduleid) {
  try{
    if (!this.taskMemo[moduleid]) {
      getTasksInModule(this.state.userId, moduleid, levelid ).then((data) => {
        const { learner: { course: { course: { level: { module: { tasks } } } } } } = data;

        this.setState({
          taskData: tasks ? (tasks.nodes) : [],
        }, () => {
          this.taskMemo[moduleid] = this.state.taskData;
          this.LoadData();
        });
      }).catch((err) => {
        console.log("error", err)
      })
    } else {
      this.setState({
        taskData: this.taskMemo[moduleid]
      });
    }
  } catch(err) {
    console.log("error", err);
    this.setState({ isSliderLoading: true });
  }

}

LoadData() {
  this.setState({
    isLoading: false,
    isSliderLoading: false
  });
}

setActiveLevel = (levelValue) => {
  const { levelsData } = this.state;
  const switchedLevel  = levelsData.find((item) => parseInt(item.name.replace("Level ", "")) === levelValue);

  if (switchedLevel) {
    this.setState({
      taskData: [],
      isSliderLoading: true
    }, () => {
      // eslint-disable-next-line no-unused-expressions
      switchedLevel ? this.getModulesForLevels(switchedLevel.id) : null;
    });
  }
};

handleTaskClick = (id, skill) => {
  if (skill.toLowerCase() !== 'speaking') {

    const { courseInstanceId, levelId, moduleId } = this.state;

    this.props.leftNavigation();
    // empty the module data before going to task
    this.props.breadcrumbsData({});
    this.props.emptyTaskList();

    const testData = {
      courseId: courseInstanceId,
      levelId,
      moduleId,
      assetId: id
    };

    history.push(getTestUrl(testData));
  }
};

walkThrough_1_ClickHandler = () => {
  this.setState({ isOpen: false, learnerDashboardWalkThrough_1: true, learnerDashboardWalkThrough_2: false });
};

walkThrough_2_ClickHandler = () => {
  this.setState({ learnerDashboardWalkThrough_1: false, learnerDashboardWalkThrough_2: true });
};

walkThrough_3_ClickHandler = () => {
  this.setState({ learnerDashboardWalkThrough_1: false, learnerDashboardWalkThrough_2: false }, () => {

    updateLearnerPreference(this.userData.userId, true, false).then((data) => {
      setLocalStorageData("isDashboardPreferenceCalled", true);
    }).catch((err) => {
      console.log("updateLearnerPreference error", err);
    })
  });
};

WalkThrough_1 = () => {
  const { isOpen, } = this.state;

  return (
    <DialogBox alignCenter={ true } isOpen={ isOpen } title={ trans('Welcome to your dashboard') }>
      <div className='dailogbox-container__content-right'>
        <p className='dailogbox-container__content-right_p'
          dangerouslySetInnerHTML=
            { { __html: trans(`Start learning with our theme based modules that are designed to help you achieve your goals`) } }>
        </p>
      </div>
      <div className='dailogbox-container__content-right'>
        <Button classname={ 'btn-outlined' } clickHandler={ this.walkThrough_1_ClickHandler } text={ trans('Next') }/>
      </div>
    </DialogBox>
  )
};

WalkThrough_2 = () => {
  const { walkThroughDesc } = this.state;

  return (
    <>
      <div className='learner-dashboard__popover_overlay'/>
      <div className="learner-dashboard__popover arrow_box">
        <p className='learner-dashboard__popover arrow_box_header'>{ trans('All MePro modules are theme-based') }</p>
        <p>{ walkThroughDesc }</p>
        <Button type="button" classname="btn-outlined btn-orange" text={ trans('Next') }
          clickHandler={ this.walkThrough_2_ClickHandler }/>
      </div>
    </>
  )
};

WalkThrough_3 = () => {
  return (
    <>
      <div className='learner-dashboard__popover_overlay'/>
      <div className="learner-dashboard__popover arrow_box_slider">
        <p>{ trans(`The level slider shows your overall progress. Slide to a level to see what’s coming next.`) }</p>
        <Button type="button" classname="btn-outlined btn-orange" text={ trans('Start Learning') }
          clickHandler={ this.walkThrough_3_ClickHandler }/>
      </div>
    </>
  )
};

moduletasks = () =>{
  const { taskData } = this.state;

  return taskData && taskData.length > 0 && (
    taskData.map((item, index) => {
      const currentItem = parseAssets(item.asset);

      if(currentItem === null) {
        return (<div className={ `modules-review-test` } key={ index } />);
      }
      // eslint-disable-next-line prefer-destructuring
      const { skill, icon, iconClock, iconQuestion, time, questions, id } = currentItem;

      if (skill !== 'speaking')
        return (
          <div className={ `modules-review-test` } key={ index }>
            <div className={ `modules-review-test__container
          ${skill.toLowerCase() === 'speaking' && 'disable-link'}` } onClick={ () => this.handleTaskClick(id, skill) }>
              <div className="modules-review-test__container_review-icon">
                {
                  icon &&
                <div className='modules-review-test__container_review-icon_image' style={ { backgroundImage: `url(${icon})` } } />
                }
              </div>
              <div className="modules-review-test__container_review-text">
                <h4 className="modules-review-test__container_review-text_h4">{ skill }</h4>
                <ul className="modules-review-test__container_review-list">
                  <li>
                    { iconClock && <div className='modules-review-test__container_review-list_icon' style={ { backgroundImage: `url(${iconClock})` } } />
                    }
                    { `${time || 0} mins` }
                  </li>
                  <li>
                    { iconQuestion && <div className='modules-review-test__container_review-list_icon' style={ { backgroundImage: `url(${iconQuestion})` } } />
                    }
                    { `${questions} Questions` }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
    ))};

renderData = () =>{
  const { userName, activeLevel, isFirstVisitOfLearnerDashboard, learnerDashboardWalkThrough_1,
    learnerDashboardWalkThrough_2, isOpen, levelDescription, modulesData, isSliderLoading, levelsData, courseInstanceId, levelId, taskData } = this.state;

  return (
    <>
    { isFirstVisitOfLearnerDashboard && isOpen && this.WalkThrough_1() }
    { isFirstVisitOfLearnerDashboard && !isOpen && learnerDashboardWalkThrough_1 && !learnerDashboardWalkThrough_2 && this.WalkThrough_2() }
    { isFirstVisitOfLearnerDashboard && !isOpen && !learnerDashboardWalkThrough_1 && learnerDashboardWalkThrough_2 && this.WalkThrough_3() }
      <div className="learner-dashboard__content_header">
        <div className="learner-dashboard__content_header_title">
          <p className="learner-dashboard__content_header_title_p2">
            { interpolate('Welcome to MePro level %(activeLevel)s, %(userName)s', { activeLevel, userName }) }
          </p>
          <p className="learner-dashboard__content_header_title_p4">
            { levelDescription }
          </p>
        </div>
        <div className="learner-dashboard__content_header_icon">
          <img className='learner-dashboard__content_header_icon_img'
            src={ require('../../assets/images/learner/learner-dashboard/learner_dashboard_header_icon.png') } alt=''/>
        </div>
      </div>
      <div className={ `learner-dashboard__content_level-slider ${learnerDashboardWalkThrough_2 && 'learner-dashboard__content_level-slider_zindex'}` }>
        <LearnerDashboardLevelSlider onChangeSlider={ this.setActiveLevel } activeLevel ={ activeLevel }
          enabledLevels={ levelsData.map((item) => parseInt(item.name.replace("Level ", ""))) } courseInstanceId={ courseInstanceId }
          levelId={ levelId } moduleid={ modulesData[0].id }
          isSliderLoading={ isSliderLoading } />
      </div>
      <div className={ `learner-dashboard__content_section 
      ${isSliderLoading && "loader_section"} ${learnerDashboardWalkThrough_1 && 'learner-dashboard__content_section_zindex'}` }>
        {
          isSliderLoading ?
            <div className="learner-dashboard__content_loader">
              <LinearProgressBar/>
            </div> :
        <>
              <div className='learner-dashboard__content_section_header'>
                <div className='learner-dashboard__content_section_header_left'>
                  <div className='learner-dashboard__content_section_header_left_img' style={ { backgroundImage: `url(${modulesData[0].thumbnailUrl})` } }>
                  </div>
                  <p className='learner-dashboard__content_section_header_left_p'>{ modulesData[0].name }</p>
                </div>
                <div className='learner-dashboard__content_section_header_mod-num'>
                  {/* need to be dynamic after nov scope */} 01
                </div>
              </div>
            <div className={ `learner-dashboard__content_section_skills ${(taskData && taskData.length > 0) ? '' : 'skill-loader'}` }>
              {
                (taskData && taskData.length > 0) ?
                  this.moduletasks() :
                  <div className="learner-dashboard__content_loader">
                    <LinearProgressBar/>
                  </div>
              }
            </div>
          </>
        }
      </div>
      </>
  );
};

render() {
  const { isLoading } = this.state;

  return (
    <div className="learner-dashboard">
      <div className={ `learner-dashboard__content ${isLoading && "loader_content"}` }>
        { isLoading ? <div className="learner-dashboard__content_loader">
          <LinearProgressBar/>
        </div> :
          this.renderData()
        }
      </div>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  emptyTaskList: () => {
    dispatch(emptyTaskList());
  },
  leftNavigation: () => {
    dispatch(leftNavigation());
  },
  breadcrumbsData: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(LearnerDashboard);
