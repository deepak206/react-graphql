import {
  addLearnerRequested,
  addLearnerSuccess,
  addLearnerFailure,
} from '../actions/add-learner-action-type';
import { flashMessageDisplay } from '../actions/flash-message-action';
import { createLearnerMutation } from "../service/mutations/createlearner-mutation";
import Constant from '../constants';

export const addLearnerData = (fields, instituteId) => (dispatch) => {
  dispatch(addLearnerRequested());

  try {
    createLearnerMutation(fields.firstName, fields.licenseKey, fields.email, fields.lastName, fields.password, Constant.USER_TYPE, instituteId, fields.productId, (res) => {
      if (typeof res === 'object' && 'learner' in res && res.learner) {
        dispatch(addLearnerSuccess(res));
        dispatch(flashMessageDisplay({ field: { message: Constant.SUCCESS_MESSAGE, isSuccessMessage: true, isVisible: true } }))
      } else {
        dispatch(addLearnerFailure(res.error));
        dispatch(flashMessageDisplay({ field: { message: res.error, isSuccessMessage: false, isVisible: true } }))
      }
    })
  } catch (err) {
    dispatch(addLearnerFailure("Something went wrong"));
    dispatch(flashMessageDisplay({ field: { message: "Something went wrong", isSuccessMessage: false, isVisible: true } }))
  }
};
