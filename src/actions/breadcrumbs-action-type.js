import { createAction } from '../utils';

export const BREADCRUMBS_VALUE = 'BREADCRUMBS_VALUE';
export const breadcrumbsValue = createAction(BREADCRUMBS_VALUE, 'payload');

export const TASK_ZOOM = 'TASK_ZOOM';
export const isZoom = createAction(TASK_ZOOM, 'payload');
