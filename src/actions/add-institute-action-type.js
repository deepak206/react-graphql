import { createAction } from '../utils';

export const ADD_INSTITUTES_REQUESTED = 'ADD_INSTITUTES_REQUESTED';
export const addInstitutesRequested = createAction(ADD_INSTITUTES_REQUESTED, 'payload');

export const ADD_INSTITUTES_SUCCESS = 'ADD_INSTITUTES_SUCCESS';
export const addInstitutesSuccess = createAction(ADD_INSTITUTES_SUCCESS, 'payload');

export const ADD_INSTITUTES_FAILURE = 'ADD_INSTITUTES_FAILURE';
export const addInstitutesFailure = createAction(ADD_INSTITUTES_FAILURE, 'payload');

export const CITIES_DATA_SUCCESS = 'CITIES_DATA_SUCCESS';
export const citiesDataSuccess = createAction(CITIES_DATA_SUCCESS, 'payload');

export const COURSE_DATA_SUCCESS = 'COURSE_DATA_SUCCESS';
export const courseDataSuccess = createAction(COURSE_DATA_SUCCESS, 'payload');

export const EDIT_INSTITUTES_REQUESTED = 'EDIT_INSTITUTES_REQUESTED';
export const editInstitutesRequested = createAction(EDIT_INSTITUTES_REQUESTED, 'payload');

export const EDIT_DATA_SUCCESS = 'EDIT_DATA_SUCCESS';
export const editDataSuccess = createAction(EDIT_DATA_SUCCESS, 'payload');

export const EMPTY_THE_STORE = 'EMPTY_THE_STORE';
export const emptyTheStore = createAction(EMPTY_THE_STORE, 'payload');
