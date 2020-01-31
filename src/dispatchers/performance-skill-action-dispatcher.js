import {
  performanceSkillRequested,
  performanceSkillSuccess,
  performanceSkillFailure,
} from '../actions/performance-skill-action-type';
import Content from '../pages/my-performance-skill/content.json'

export const getPerformanceSkillData = ({ levelId }) => (dispatch) => {
  dispatch(performanceSkillRequested());

  if (Content) {
    dispatch(performanceSkillSuccess(Content));
  } else {
    dispatch(performanceSkillFailure());
  }
};
