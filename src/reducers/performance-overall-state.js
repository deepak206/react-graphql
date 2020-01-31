import {
  OVERALL_REQUESTED,
  OVERALL_SUCCESS,
  OVERALL_FAILURE,
} from '../actions/performance-action-type';

const initialState = {
  errors: [],
  isLoading: false,
  skillResult: {},
};

const performanceOverallState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case OVERALL_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case OVERALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skillResult: payload,
      };

    case OVERALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        skillResult: {},
      };

    default:
      return state;
  }
};

export default performanceOverallState;
