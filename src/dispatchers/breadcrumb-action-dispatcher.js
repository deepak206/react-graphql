import { breadcrumbsValue } from '../actions/breadcrumbs-action-type';
export const breadcrumb = (data) => (dispatch) => {
  dispatch(breadcrumbsValue(data));
}