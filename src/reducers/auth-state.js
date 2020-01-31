import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUESTED,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS, LOGGED_IN,
} from '../actions/auth-action-type';

const initialState = {
  error: '',
  isLoading: false,
  loginSuccess: false,
  loginData: JSON.parse(localStorage.getItem('userData') || '{}'),
};

const authState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: ''
      };

    case LOGIN_SUCCESS:
      window.localStorage.setItem('userData', JSON.stringify(payload.user));
      return {
        ...state,
        isLoading: false,
        loginSuccess: true,
        loginData: payload.user,
      };

    case LOGIN_FAILURE:
      window.localStorage.removeItem('userData');

      return {
        ...state,
        error: payload,
        isLoading: false,
        loginSuccess: false,
        loginData: {},
      };

    case LOGOUT_REQUESTED:
      window.localStorage.removeItem('userData');

      return {
        ...state,
        isLoading: true,
      };

    case LOGOUT_SUCCESS:
      window.localStorage.removeItem('userData');

      return {
        ...state,
        isLoading: false,
        loginData: {},
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LOGGED_IN:
      return {
        ...this.state,
        loginData: payload
      };

    default:
      return state;
  }
};

export default authState;
