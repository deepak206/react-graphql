import { FLASH_MESSAGE_DISPLAY, FLASH_MESSAGE_HIDE } from '../actions/flash-message-action';

const initialState = {
  message: null,
  isSuccessMessage: false,
  isVisible: false
};

const flashMessageAction = (state = initialState, {
  payload, type,
}) => {
  switch (type) {

    case FLASH_MESSAGE_DISPLAY:
      return {
        ...state,
        message: payload.field.message,
        isSuccessMessage: payload.field.isSuccessMessage,
        isVisible: payload.field.isVisible
      };

    case FLASH_MESSAGE_HIDE:
      return {
        ...state,
        message: '',
        isVisible: false
      };

    default:
      return state;
  }
};

export default flashMessageAction;