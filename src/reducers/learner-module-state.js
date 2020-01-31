import {
  TASK_LIST_REQUESTED,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAILURE,
  EMPTY_TASK_LIST,
} from '../actions/learner-module-action-type';

const initialState = {
  errors: [],
  isLoading: false,
  moduleData: {},
};

const LearnerModuleState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case TASK_LIST_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case TASK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        moduleData: payload,
      };

    case TASK_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        moduleData: {},
      };

    case EMPTY_TASK_LIST:
      return {
        ...state,
        moduleData: {},
      };

    default:
      return state;
  }
};

export default LearnerModuleState;
