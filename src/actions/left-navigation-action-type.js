import { createAction } from '../utils';

export const LEFT_NAVIGATION_UPDATE = 'LEFT_NAVIGATION_UPDATE';
export const leftNavigationUpdate = createAction(LEFT_NAVIGATION_UPDATE, 'payload');
