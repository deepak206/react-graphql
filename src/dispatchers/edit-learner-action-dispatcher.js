import {
  editLearnerRequested,
  editLearnerSuccess,
  editLearnerFailure,
} from '../actions/add-learner-action-type';
import urlChanger from '../utils/url-changer';
import { flashMessageDisplay } from '../actions/flash-message-action';
import { editLearnerMutation } from "../service/mutations/editlearner-mutation";
import Constant from '../constants';
import history from '../routes/history'

export const editLearnerData = (learnerId, fields, instituteId) => (dispatch) => {
  dispatch(editLearnerRequested());

  try {
    editLearnerMutation(learnerId, fields.firstName, fields.lastName, "MASTER", (res) => {
      if (typeof res === 'object' && 'learner' in res && res.learner) {
        dispatch(editLearnerSuccess(res));
        dispatch(flashMessageDisplay({ field: { message: Constant.SUCCESS_MESSAGE, isSuccessMessage: true, isVisible: true } }))
        history.push({
          pathname: `/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId })}`,
        });
      } else {
        dispatch(editLearnerFailure(res.error));
        dispatch(flashMessageDisplay({ field: { message: res.error, isSuccessMessage: false, isVisible: true } }))
      }
    })
  } catch (err) {
    dispatch(editLearnerFailure("Something went wrong"));
    dispatch(flashMessageDisplay({ field: { message: "Something went wrong", isSuccessMessage: false, isVisible: true } }))
  }
};