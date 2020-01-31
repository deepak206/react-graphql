import {
  ADD_LEARNER_REQUESTED,
  ADD_LEARNER_SUCCESS,
  ADD_LEARNER_FAILURE,
} from '../actions/add-learner-action-type';

const initialState = {
  errors: null,
  isLoading: false,
};

const AddLearnerState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case ADD_LEARNER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: ''
      };

    case ADD_LEARNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_LEARNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default AddLearnerState;