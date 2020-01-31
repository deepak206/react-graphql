import { createAction } from '../utils';

export const OVERALL_REQUESTED = 'OVERALL_REQUESTED';
export const overallRequested = createAction(OVERALL_REQUESTED, 'payload');

export const OVERALL_SUCCESS = 'OVERALL_SUCCESS';
export const overallSuccess = createAction(OVERALL_SUCCESS, 'payload');

export const OVERALL_FAILURE = 'OVERALL_FAILURE';
export const overallFailure = createAction(OVERALL_FAILURE, 'payload');
