import {
  loginRequested,
  loginSuccess,
  loginFailure,
  logoutRequested,
  logoutFailure,
  logoutSuccess, loggedIn
} from '../actions/auth-action-type';
import history from '../routes/history';
import { loginToSAM } from "../service/login.service";
import { getUserData } from "../service/user.service.js";
import { logoutFromOAE } from "../service/logout.service.js";
import { getUserType, setLocalStorageData, getLocale } from '../utils';
import { getLoggedInUser } from "../service/user.service";

export const login = ({ fields: { email, password } }) => (dispatch) => {
  dispatch(loginRequested());
  loginToSAM(email,password).then((res) => {
    if(!('code' in res) && res['loginUsingSSOToken']) {
      localStorage.setItem('YXV0aFRva2Vu', res['loginUsingSSOToken']);
      getUserData(email).then((res) => {
        const { user: { primaryRole } } = res;

        if(primaryRole) {
          setLocalStorageData("lng", res.locale || getLocale());
          dispatch(loginSuccess(res));
          history.push(`/${getUserType(primaryRole)}/dashboard`);
        } else {
          dispatch(loginFailure('Invalid user type.'))
        }
      }).catch((error) => {
        dispatch(loginFailure('Something went wrong.'));
      });
    } else {
      dispatch(loginFailure(('message' in res) ? res.message : "Invalid user credentials"));
    }

  }).catch((error) => {
    dispatch(loginFailure('Something went wrong.'))
  })
};

export const logout = () => (dispatch) => {
  dispatch(logoutRequested());
  logoutFromOAE().then((res) => {
    dispatch(logoutSuccess());
    //history.push('/');
  }).catch((error) => {
    dispatch(logoutFailure(error));
  });
  localStorage.clear();
  document.location = '/';
};

export const loginForNewUser = (email) => (dispatch) => {
  dispatch(loginSuccess({ email, userType: 'learner', name: 'Deepak Mankotia' }));

  history.push('/learner/dashboard');

};

export const isLoggedIn = () => (dispatch) => {
  getLoggedInUser().then((res) => {
    console.log('Logged in user is', res);
    dispatch(loggedIn(res));
  });
};
