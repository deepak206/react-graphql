import { createAction } from '../utils';

export const TASK_LIST_REQUESTED = 'TASK_LIST_REQUESTED';
export const taskListRequested = createAction(TASK_LIST_REQUESTED, 'payload');

export const TASK_LIST_SUCCESS = 'TASK_LIST_SUCCESS';
export const taskListSuccess = createAction(TASK_LIST_SUCCESS, 'payload');

export const TASK_LIST_FAILURE = 'TASK_LIST_FAILURE';
export const taskListFailure = createAction(TASK_LIST_FAILURE, 'payload');

export const EMPTY_TASK_LIST = 'EMPTY_TASK_LIST';
export const emptyTaskList = createAction(EMPTY_TASK_LIST, 'payload');
