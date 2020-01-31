import { flashMessageDisplay, flashMessageHide } from '../actions/flash-message-action';

export const showFlashMessage = ({ field: { message, isSuccessMessage, isVisible } }) => (dispatch) => {
  dispatch(flashMessageDisplay({ field: { message, isSuccessMessage, isVisible } }));
};

export const hideFlashMessage = () => (dispatch) => {
  dispatch(flashMessageHide());
};
