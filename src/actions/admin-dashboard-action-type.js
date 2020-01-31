import { createAction } from '../utils';

export const FETCH_ACTIVE_USER_REQUESTED = 'FETCH_ACTIVE_USER_REQUESTED';
export const fetchActiveUsersRequested = createAction(FETCH_ACTIVE_USER_REQUESTED, 'payload');

export const FETCH_ACTIVE_USER_SUCCESS = 'FETCH_ACTIVE_USER_SUCCESS';
export const fetchActiveUsersSuccess = createAction(FETCH_ACTIVE_USER_SUCCESS, 'payload');

export const FETCH_ACTIVE_USER_FAILURE = 'FETCH_ACTIVE_USER_FAILURE';
export const fetchActiveUsersFailure = createAction(FETCH_ACTIVE_USER_FAILURE, 'payload');

export const RESET_ACTIVE_USER_STATE = 'RESET_ACTIVE_USER_STATE';
export const resetActiveUserState = createAction(RESET_ACTIVE_USER_STATE, 'payload');
