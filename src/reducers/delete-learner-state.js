import {
  DELETE_LEARNER_REQUESTED,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAILURE,
} from '../actions/delete-learner-action-type';

const initialState = {
  errors: null,
  isLoading: false,
  lastHit: null,
};

const DeleteLearnerState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case DELETE_LEARNER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_LEARNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: false,
        lastHit: new Date()
      };

    case DELETE_LEARNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: true,
        lastHit: new Date()
      };

    default:
      return state;
  }
};

export default DeleteLearnerState;