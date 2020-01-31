import { createAction } from '../utils';

export const ADD_LEARNER_REQUESTED='ADD_LEARNER_REQUESTED';
export const addLearnerRequested= createAction(ADD_LEARNER_REQUESTED,'payload');

export const ADD_LEARNER_SUCCESS = 'ADD_LEARNER_SUCCESS';
export const addLearnerSuccess = createAction(ADD_LEARNER_SUCCESS, 'payload');

export const ADD_LEARNER_FAILURE = 'ADD_LEARNER_FAILURE';
export const addLearnerFailure = createAction(ADD_LEARNER_FAILURE, 'payload');

export const EDIT_LEARNER_REQUESTED='EDIT_LEARNER_REQUESTED';
export const editLearnerRequested= createAction(EDIT_LEARNER_REQUESTED,'payload');

export const EDIT_LEARNER_SUCCESS = 'EDIT_LEARNER_SUCCESS';
export const editLearnerSuccess = createAction(EDIT_LEARNER_SUCCESS, 'payload');

export const EDIT_LEARNER_FAILURE = 'EDIT_LEARNER_FAILURE';
export const editLearnerFailure = createAction(EDIT_LEARNER_FAILURE, 'payload');
