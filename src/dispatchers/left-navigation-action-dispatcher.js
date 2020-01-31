import { leftNavigationUpdate } from '../actions/left-navigation-action-type';
export const leftNavigation = () => (dispatch) => {
  dispatch(leftNavigationUpdate());
}