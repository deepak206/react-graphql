import {
  PERFORMANCE_TEST_REQUESTED,
  PERFORMANCE_TEST_SUCCESS,
  PERFORMANCE_TEST_FAILURE,
} from '../actions/performance-test-action-type';

const initialState = {
  errors: [],
  isLoading: false,
  testData: {},
};

const performanceTestState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case PERFORMANCE_TEST_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case PERFORMANCE_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testData: payload,
      };

    case PERFORMANCE_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        testData: {},
      };

    default:
      return state;
  }
};

export default performanceTestState;