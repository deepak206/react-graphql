import {
  deleteLearnerRequested,
  deleteLearnerSuccess,
  deleteLearnerFailure,
} from '../actions/delete-learner-action-type';
import { flashMessageDisplay } from '../actions/flash-message-action';
import { DeleteLearnerMutation } from "../service/mutations/delete-learner-mutation";

export const deleteLearnerData = (id) => (dispatch) => {
  try {
    dispatch(deleteLearnerRequested());
    DeleteLearnerMutation(id, (res) => {
      if(typeof res === 'object' && res.deleteLearner) {
        dispatch(deleteLearnerSuccess());
      } else {
        dispatch(deleteLearnerFailure());
        dispatch(flashMessageDisplay({ field: { message: res.error, isSuccessMessage: false, isVisible: true } }));
      }
    })
  }
  catch(err) {
    dispatch(deleteLearnerFailure());
    dispatch(flashMessageDisplay({ field: { message: "Something went wrong", isSuccessMessage: false, isVisible: true } }));
  }
};