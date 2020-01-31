import {
  performanceTestRequested,
  performanceTestSuccess,
  performanceTestFailure,
} from '../actions/performance-test-action-type';
import Content from '../pages/my-performance-test/content.json'

export const getPerformanceTestData = ({ levelId }) => (dispatch) => {
  dispatch(performanceTestRequested());

  if (Content) {
    dispatch(performanceTestSuccess(Content));
  } else {
    dispatch(performanceTestFailure());
  }
};
