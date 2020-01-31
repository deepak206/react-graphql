import {
  LEFT_NAVIGATION_UPDATE,
} from '../actions/left-navigation-action-type';

const initialState = {
  isUpdated: new Date(),
};

const leftNavigationState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case LEFT_NAVIGATION_UPDATE:
      return {
        ...state,
        isUpdated: new Date()
      };

    default:
      return state;
  }
};

export default leftNavigationState;
