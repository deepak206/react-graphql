import { RESET__PASSWORD__REQUESTED } from '../actions/reset-password-action-type';

const initialState = {
  errors: null,
  isLoading: false,
  email: ''
};

const ResetPasswordState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {

    case RESET__PASSWORD__REQUESTED:
      console.log(payload)
      return {
        ...state,
        email: payload.email,
        isLoading: true,
        error: ''
      };

    default:
      return state;
  }
};

export default ResetPasswordState;