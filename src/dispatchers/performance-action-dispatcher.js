import {
  overallRequested,
  overallSuccess,
  overallFailure,
} from '../actions/performance-action-type';
import Content from '../pages/my-performance-overall/content.json'

export const getOverAllData = ({ levelId }) => (dispatch) => {
  dispatch(overallRequested());
  const overAllData = JSON.parse(JSON.stringify(Content));

  // api request here
  if (overAllData && overAllData.length) {
    dispatch(overallSuccess(overAllData[levelId - 1]));
  } else {
    dispatch(overallFailure());
  }
};
