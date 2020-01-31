import {
  fetchActiveUsersRequested,
  fetchActiveUsersSuccess,
  fetchActiveUsersFailure,
  resetActiveUserState
} from '../actions/admin-dashboard-action-type';

import { getActiveLearnerService } from "../service/admin-dashboard-data-service";

export const getActiveLearner = (organizationId) => (dispatch) => {
  dispatch(fetchActiveUsersRequested());
  getActiveLearnerService(organizationId).then((res) => {
    if(res) {
      dispatch(fetchActiveUsersSuccess(res.activatedUsers));
    } else {
      dispatch(fetchActiveUsersFailure(0));
    }
  });
}

export const resetActiveUser = () => (dispatch) => {
  dispatch(resetActiveUserState());
}