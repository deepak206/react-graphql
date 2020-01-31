import { createAction } from '../utils';

export const PERFORMANCE_TEST_REQUESTED = 'PERFORMANCE_TEST_REQUESTED';
export const performanceTestRequested = createAction(PERFORMANCE_TEST_REQUESTED, 'payload');

export const PERFORMANCE_TEST_SUCCESS = 'PERFORMANCE_TEST_SUCCESS';
export const performanceTestSuccess = createAction(PERFORMANCE_TEST_SUCCESS, 'payload');

export const PERFORMANCE_TEST_FAILURE = 'PERFORMANCE_TEST_FAILURE';
export const performanceTestFailure = createAction(PERFORMANCE_TEST_FAILURE, 'payload');