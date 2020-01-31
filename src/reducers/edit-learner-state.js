import {
  EDIT_LEARNER_REQUESTED,
  EDIT_LEARNER_SUCCESS,
  EDIT_LEARNER_FAILURE,
} from '../actions/add-learner-action-type';

const initialState = {
  errors: null,
  isLoading: false,
};

const EditLearnerState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case EDIT_LEARNER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: ''
      };

    case EDIT_LEARNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case EDIT_LEARNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default EditLearnerState;