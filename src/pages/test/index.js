import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import ArrowTooltip from '../../views/arrow-tooltip';
import history from '../../routes/history';
import urlChanger from '../../utils/url-changer';
import LinearProgressBar from "../../views/loader/linear-progress-bar";
import { learnerModules, getInstanceData, loadTestBreadcrumbs } from '../../dispatchers/learner-module-action-dispatcher';
import { breadcrumbsValue, isZoom } from '../../actions/breadcrumbs-action-type';
import { getIndexById, assetSkill, findIcon, trans, getTestUrl, getTaskUrl, getLocalStorageData } from '../../utils';
import CONSTANTS from '../../constants';

// css for test component
import './test.scss';

class Test extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { params } }, moduleData } = props;

    // decode the url params
    const { courseId, levelId, moduleId, assetId } = urlChanger.decode(params);

    this.state = {
      moduleId,
      levelId,
      courseId,
      assetId,
      isloading: true,
      instance: moduleData.launchAssetHTML || {},
      tasksData: [],
      modules: [],
    };

    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    this.getReadyComponentData();

    window.addEventListener("keydown", this.escFunction, false);
    window.addEventListener('message', this.attachListener);

    const { moduleData } = this.props;

    const {
      moduleId,
      levelId,
      courseId,
      assetId,
    } = this.state;

    if (!isEmpty(moduleData) && courseId && assetId && levelId && moduleId) {
      // load breadcrumbs
      this.props.loadTestBreadcrumbs({ courseId, levelId, moduleId, assetId, level: moduleData });
    }
  }

  componentDidUpdate() {
    const { moduleData, match: { params: { params } } } = this.props;

    const { instance, courseId, levelId, moduleId } = this.state;

    // decode the params on every change
    const { assetId } = urlChanger.decode(params);

    if (
      !isEmpty(moduleData) &&
        !isEqual(instance, moduleData.launchAssetHTML) &&
        moduleData.currentAsset &&
        moduleData.currentAsset.authType === CONSTANTS.IFRAME_AUTHTYPE
    ) {

      this.renderTestObject(moduleData, assetId);
    }

    // for loading the next moodle on click of next button
    if (this.state.assetId !== assetId) {
      this.loadNextTest(courseId, levelId, moduleId, assetId, moduleData);
    }
  }

  componentWillUnmount() {
    this.isZoomIn(false);

    // removing events on unmounting
    window.removeEventListener("keydown", this.escFunction, false);
    window.removeEventListener('message', this.attachListener);
  }

  // render the Test
  renderTestObject = (moduleData, assetId) => {
    const { module: { tasks }, launchAssetHTML, modules, currentAsset } = moduleData;

    // iframe element
    const iframe = document.createElement('iframe');

    this.setState({
      instance: launchAssetHTML,
      modules: modules.nodes,
      tasksData: tasks.nodes
    });

    // appending iframe in above created element
    document.getElementById('iframe').appendChild(iframe);

    if (currentAsset.contentType === CONSTANTS.IFRAME_SCROM_CONTENTTYPE) {
      // Render if content type is SCROM
      iframe.setAttribute('id', 'content-frame');
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(moduleData.launchAssetHTML);
      iframe.contentWindow.document.close();
    } else if (currentAsset.contentType === CONSTANTS.IFRAME_HTM_CONTENTTYPE) {
      // Render if content type is HTM
      const params = {
        assetid: assetId,
        deviceid: '6b71efd9-fa08-4296-8b7f-8b69cd56ff75',
        appversion: 'app',
        userid: '234e6013-8461-4fcc-9ec4-d581d46dba33',
        authorization: 'Bearer ' + CONSTANTS.htmToken
      };
      const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
      const url = `${currentAsset.url}?${queryString}`;

      iframe.setAttribute('id', 'content-frame');
      iframe.setAttribute('src', url);
    }
  };

  // On click of next task from moodle
  loadNextTest = (courseId, levelId, moduleId, assetId, moduleData) => {
    // setting current task assetId
    this.setState({
      assetId
    });

    // load the breadcrumbs of next task
    this.props.loadTestBreadcrumbs({ courseId, levelId, moduleId, assetId, level: moduleData });

    // load the next task
    this.getReadyComponentData();
  };

  // escape button will zoom out the test
  escFunction(event) {
    if (event.keyCode === 27) {
      this.props.zoomIn(false);
    }
  }

  // loading the next test
  loadNextAsset = () => {
    const { tasksData, modules } = this.state;

    const { assetId, courseId, levelId, moduleId } = this.state;

    // Getting the next task Id
    let nextSkill = assetSkill(tasksData, assetId, false);

    // Remove this code to enable speaking
    if (nextSkill.asset && nextSkill.asset.objectives.length > 0 && nextSkill.asset.objectives[0].skill === 'Speaking') {
      nextSkill = assetSkill(tasksData, nextSkill.asset.id, false);
    }

    if (nextSkill) {
      const testData = {
        courseId,
        levelId,
        moduleId,
        assetId: nextSkill.asset.id
      };

      history.push({
        pathname: getTestUrl(testData),
      });
    } else {
      const getNextModuleId = getIndexById(modules, moduleId);

      if (modules[getNextModuleId + 1]) {
        this.props.breadcrumbs({});
        const moduleData = {
          courseId,
          levelId,
          moduleId: modules[getNextModuleId + 1].id
        };

        history.push({
          pathname: getTaskUrl(moduleData),
        });
      } else {
        history.push({
          pathname: '/learner/level',
        });
      }
    }
  };

  // capture events of scrom objects
  attachListener = (event) => {
    if (event && event.type === 'message') {
      const { data } = event;

      switch (data.Action) {
        case 'SCORM_ACTIVITY_LOG':
          console.log(data);
          const { ActivityLog } = data;

          this.enableNext(ActivityLog);
          break;
        case 'JUMP_TO_NEXT_ACTIVITY':
          this.loadNextAsset();
          break;
        default:
          break;
      }
    }
  };

  /**
   * We enable the next button only if the score is greater than 75
   * @param activityLog
   */
  enableNext = (activityLog) => {
    const { ActivityScore, ActivityStatus } = activityLog;

    if (ActivityScore >= 75 && ActivityStatus === 'completed') {
      // TODO: Replace this with `document.getElementById('scorm_object')` instead of window.frames[0][0]
      (window.frames[0][0] || document.getElementById('scorm_object').contentWindow).postMessage({
        From: "STUDENT-PORTAL",
        Action: "SCORE-SENT-ACK",
        Result: !0
      }, "*");
    }
  };

  getReadyComponentData = () => {
    const {
      match: { params: { params } },
      breadcrumbsData,
      getModuleData,
      getInstanceData,
      moduleData,
    } = this.props;
    const userData = getLocalStorageData("userData");
    // Run time reload the assetId
    const { assetId, levelId, moduleId } = urlChanger.decode(params);

    if (isEmpty(moduleData)) {
      const { userId } = userData;

      // data not in store fetch all task data
      getModuleData({
        component: 'test',
        moduleId,
        userId,
        levelId,
        assetId,
        breadcrumbsData
      });

    } else {
      // fetch only instance data
      getInstanceData({ assetId, taskData: moduleData });
    }
  };

  onClickHandler = () => {
    // todo
    // const { match: { params: { levelId, type = 'quiz' } } } = this.props;

    // history.push(`/learner/modules/level-${levelId}/${type}/1/result/60`);
  };

  isZoomIn = (isZoom) => {
    this.props.zoomIn(isZoom);
  };

  renderData() {
    const { isZoom } = this.props;

    return (
      <div className="test-container">
        <div id="iframe" className="test-container__test-area"/>
        {!isZoom ?
          <ArrowTooltip title={ trans("Full screen") } placement="left">
            <img
              className="test-container__zoom"
              aria-label="ZoomIn"
              src={ findIcon('/learner/module-tasks/zoomIn.svg') }
              alt="zoomIn"
              onClick={ () => this.isZoomIn(!isZoom) }/>
          </ArrowTooltip> :
          <ArrowTooltip title={ trans("Exit full screen") } placement="left">
            <img
              className="test-container__zoom"
              aria-label="ZoomIn"
              src={ findIcon('/learner/module-tasks/zoomOut.svg') }
              alt="ZoomOut"
              onClick={ () => this.isZoomIn(!isZoom) }/>
          </ArrowTooltip>}
      </div>
    );
  }

  renderLoader() {
    return (
      <div className="full-screen-loader">
        <LinearProgressBar/>
      </div>
    )
  }

  render() {
    const { isLoading } = this.props;

    return (isLoading) ? this.renderLoader() : this.renderData();
  }
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumbs: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  },
  getModuleData: (data) => {
    dispatch(learnerModules(data));
  },
  getInstanceData: (data) => {
    dispatch(getInstanceData(data));
  },
  loadTestBreadcrumbs: (data) => {
    dispatch(loadTestBreadcrumbs(data));
  },
  zoomIn: (isZoomIn) => {
    dispatch(isZoom(isZoomIn));
  }
});

export default connect(({
  breadcrumbsState: { breadcrumbsData, isZoom }, LearnerModuleState: { isLoading, moduleData }
}) => ({ isZoom, breadcrumbsData, isLoading, moduleData }),
mapDispatchToProps
)(Test);
