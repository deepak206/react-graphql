import {
  BREADCRUMBS_VALUE,
  TASK_ZOOM
} from '../actions/breadcrumbs-action-type';

const initialState = {
  breadcrumbsData: {},
  isZoom: false,
};

const breadcrumbsState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case BREADCRUMBS_VALUE:
      return {
        ...state,
        breadcrumbsData: payload
      };

    case TASK_ZOOM:
      return {
        ...state,
        isZoom: payload
      };

    default:
      return state;
  }
};

export default breadcrumbsState;
