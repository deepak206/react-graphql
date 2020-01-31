import {
  changeLanguageStarted,
  changeLanguageSuccess,
  changeLanguageFailure,
} from '../actions/language-action-type';
import { changeLanguage } from '../utils';

export const languageSwitcher = ({ langKey }) => (dispatch) => {
  dispatch(changeLanguageStarted());

  const changeLng = changeLanguage(langKey);

  if (changeLng) {
    dispatch(changeLanguageSuccess(langKey));
  } else {
    dispatch(changeLanguageFailure('Error while changing language.'));
  }
};

export const setDefaultLang = () => {
  // todo
};
