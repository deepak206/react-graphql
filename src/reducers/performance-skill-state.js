import {
  PERFORMANCE_SKILL_REQUESTED,
  PERFORMANCE_SKILL_SUCCESS,
  PERFORMANCE_SKILL_FAILURE,
} from '../actions/performance-skill-action-type';

const initialState = {
  errors: [],
  isLoading: false,
  skillData: {},
};

const performanceSkillState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case PERFORMANCE_SKILL_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case PERFORMANCE_SKILL_SUCCESS:
      console.log('payload', payload);
      return {
        ...state,
        isLoading: false,
        skillData: payload,
      };

    case PERFORMANCE_SKILL_FAILURE:
      return {
        ...state,
        isLoading: false,
        skillData: {},
      };

    default:
      return state;
  }
};

export default performanceSkillState;