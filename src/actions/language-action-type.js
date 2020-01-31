import { createAction } from '../utils';

export const CHANGE_LANGUAGE_STARTED = 'CHANGE_LANGUAGE_STARTED';
export const changeLanguageStarted = createAction(CHANGE_LANGUAGE_STARTED, 'payload');

export const CHANGE_LANGUAGE_SUCCESS = 'CHANGE_LANGUAGE_SUCCESS';
export const changeLanguageSuccess = createAction(CHANGE_LANGUAGE_SUCCESS, 'payload');

export const CHANGE_LANGUAGE_FAILURE = 'CHANGE_LANGUAGE_FAILURE';
export const changeLanguageFailure = createAction(CHANGE_LANGUAGE_FAILURE, 'payload');
