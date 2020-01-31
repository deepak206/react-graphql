import {
  taskListRequested,
  taskListSuccess
} from '../actions/learner-module-action-type';
import { isEmpty } from 'lodash';
import { flashMessageDisplay } from '../actions/flash-message-action';
import { breadcrumbsValue } from '../actions/breadcrumbs-action-type';
import { getTasksInModule, launchAssets } from "../service/data-service";
import { indexFormat, getIndexById, trans, getModuleUrl, getTaskUrl, assetSkill } from '../utils';
import CONSTANTS from '../constants';

// calls to render Story board component breadcrumbs
const storyBroadcrumbs = ({ dispatch, level, moduleId, levelId, breadcrumbsData, courseId }) => {
  if (isEmpty(breadcrumbsData) || breadcrumbsData.breadcrumbs.length === 2) {

    // for getting the index of module will remove once backend give that
    const moduleIndex = getIndexById(level.modules.nodes, moduleId);

    const levelData = {
      courseId,
      levelId
    };

    dispatch(
      breadcrumbsValue({
        activelast: true,
        pageTitle: `${ trans('Module') } ${indexFormat(level.modules.nodes[moduleIndex].orderNumber)}`,
        breadcrumbs: [
          {
            title: level.name,
            route: getModuleUrl(levelData),
          }
        ]
      })
    );
  }
};

export const loadBreadcrumbs = ({ level, moduleId, levelId, courseId })  => (dispatch) => {
  storyBroadcrumbs({
    dispatch,
    level,
    moduleId,
    levelId,
    courseId,
    breadcrumbsData: {}
  });
};

// calls to render Test component breadcrumbs
const testBreadcrumbs = ({ dispatch, level, courseId, moduleId, levelId, assetId }) => {
  const moduleIndex = getIndexById(level.modules.nodes, moduleId);

  // getting the current asset
  const { asset } = assetSkill(level.module.tasks.nodes, assetId, true);

  const levelData = {
    courseId: courseId,
    levelId
  };

  if (asset && asset.objectives.length > 0 ) {
    dispatch(
      breadcrumbsValue({
        activelast: true,
        pageTitle: asset.objectives[0].skill || '',
        breadcrumbs: [
          {
            title: level.name,
            route: getModuleUrl(levelData),
          }, {
            title: `Module ${indexFormat(level.modules.nodes[moduleIndex].orderNumber)}`,
            route: getTaskUrl({ ...levelData, moduleId }),
          }
        ]
      })
    );
  }
};

export const loadTestBreadcrumbs = ({ level, moduleId, levelId, courseId, assetId })  => (dispatch) => {
  testBreadcrumbs({
    dispatch,
    level,
    moduleId,
    levelId,
    courseId,
    assetId,
  });
};

// For iframe instance
const launchInstance = (assetId, taskData, dispatch) => {
  const payload = {
    assetId,
    // will dynamic when introduced
    deviceId: "20909",
    appVersion: "0209"
  };

  const getAssets = assetSkill(taskData.module.tasks.nodes, assetId, true);

  let parsedData = {};

  if (
    getAssets.asset &&
    getAssets.asset.authType === CONSTANTS.IFRAME_AUTHTYPE
  ) {
    const { asset } = getAssets;

    if (asset.contentType === CONSTANTS.IFRAME_SCROM_CONTENTTYPE) {
      launchAssets(payload).then((data) => {
        if (data) {
          const { launchAssetHTML } = data;

          parsedData = {
            ...taskData,
            launchAssetHTML,
            currentAsset: asset
          };

          dispatch(taskListSuccess(parsedData));

          return launchAssetHTML;
        }

        console.log('no data in instance');
        return false;
      }).catch((err) => {
        dispatch(flashMessageDisplay({
          field: {
            message: CONSTANTS.ERROR_MESSAGE(),
            isSuccessMessage: false,
            isVisible: true
          }
        }));
      });
    } else {
      parsedData = {
        ...taskData,
        // Empty the store data here
        launchAssetHTML: null,
        currentAsset: asset
      };

      dispatch(taskListSuccess(parsedData));
    }
  } else {
    dispatch(flashMessageDisplay({
      field: {
        message: CONSTANTS.assetTypeInvalid(getAssets.asset.authType || trans('Asset type')),
        isSuccessMessage: false,
        isVisible: true
      }
    }));
  }
};

export const getInstanceData = ({ assetId, taskData }) => (dispatch) => {
  dispatch(taskListRequested());

  launchInstance(assetId, taskData, dispatch);
};

// task list and module details
export const learnerModules = (
  { component, moduleId, levelId, userId, breadcrumbsData, assetId }
) => (dispatch) => {
  dispatch(taskListRequested());
  // render when no present in store
  getTasksInModule(userId, moduleId, levelId).then(( { learner } ) => {
    const { course: { course } } = learner;

    if ( course && course.level && course.level.module) {
      const { level, id } = course;

      // adding data to store
      dispatch(taskListSuccess(level));
      if (component === 'task' && isEmpty(breadcrumbsData)) {
        // On refresh of story component set breadcrumbs
        storyBroadcrumbs({
          dispatch,
          level,
          moduleId,
          levelId,
          courseId: id,
          breadcrumbsData
        });
      } else if (component === 'test') {
        // render the Test component breadcrumbs and iframe instance
        testBreadcrumbs({
          dispatch,
          level,
          courseId: id,
          moduleId,
          levelId,
          breadcrumbsData,
          assetId
        });

        // For launching iframe instance after refresh
        launchInstance(assetId, course.level, dispatch);
      }
    } else {
      // if module not found code goes here
      console.log('errors', 'module not found');
    }
  }).catch((error) => {
    console.log('error', error);
    dispatch(flashMessageDisplay({
      field: {
        message: CONSTANTS.ERROR_MESSAGE(),
        isSuccessMessage: false,
        isVisible: true
      }
    }));
  });
};
