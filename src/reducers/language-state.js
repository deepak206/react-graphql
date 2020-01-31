import {
  CHANGE_LANGUAGE_STARTED,
  CHANGE_LANGUAGE_SUCCESS,
  CHANGE_LANGUAGE_FAILURE,
} from '../actions/language-action-type';
import { getLocale } from '../utils';

const initialState = {
  isLoading: false,
  language: getLocale(),
};

const languageState = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_LANGUAGE_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        language: payload,
      };

    case CHANGE_LANGUAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default languageState;
