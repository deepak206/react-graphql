import { createAction } from '../utils';

export const DELETE_LEARNER_REQUESTED = 'DELETE_LEARNER_REQUESTED';
export const deleteLearnerRequested = createAction(DELETE_LEARNER_REQUESTED, 'payload');

export const DELETE_LEARNER_SUCCESS = 'DELETE_LEARNER_SUCCESS';
export const deleteLearnerSuccess = createAction(DELETE_LEARNER_SUCCESS, 'payload');

export const DELETE_LEARNER_FAILURE = 'DELETE_LEARNER_FAILURE';
export const deleteLearnerFailure = createAction(DELETE_LEARNER_FAILURE, 'payload');
