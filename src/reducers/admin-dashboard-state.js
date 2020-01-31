import {
  FETCH_ACTIVE_USER_REQUESTED,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER_FAILURE,
  RESET_ACTIVE_USER_STATE,
} from '../actions/admin-dashboard-action-type';

const initialState = {
  isLoading: false,
  activatedUsers: null,
};

const AdminDashboardState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case FETCH_ACTIVE_USER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_ACTIVE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activatedUsers: payload.toString()
      };

    case FETCH_ACTIVE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        activatedUsers: "0"
      };

    case RESET_ACTIVE_USER_STATE:
      return {
        ...state,
        activatedUsers: null
      };

    default:
      return state;
  }
};

export default AdminDashboardState;