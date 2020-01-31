import { trans } from './index';

const required = (v, label) => {
  let errorMsg = '';

  if (/^\s*$/.test(v)) {
    errorMsg = trans(`${label} is required`);
  }

  return errorMsg;
};

const mobileCheck = (v) => {
  let errorMsg = '';

  if (v.length !== 10) {
    errorMsg = trans('Mobile no. should have at least 10 digits.');
  }

  return errorMsg;
};

const checkPassword = (password) => {
  if (password.length < 8) {
    return {
      message: trans('Your password must have at least 8 characters'),
      status: false,
    };
  }

  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    return {
      message: trans('Your password should contain alphabet and number'),
      status: false,
    };
  }

  if (/\s/g.test(password)) {
    return {
      message: trans('The password you submitted contains spaces. Did you copy it? May be try typing it in'),
      status: false,
    };
  }

  return {
    status: true,
  };
};

const validateConfirmPassword = (confirmPassword, password) => {
  let errorMsg = '';

  if (confirmPassword !== password) {
    errorMsg = trans('The password and confirm password are not matched. Please try again');
  }

  return errorMsg;
};

const reg = (regex, v, regMsg) => {
  let err = '';

  if (!regex.test(v)) {
    err = regMsg;
  }
  return err;
};

const validate = {
  checkPassword,
  mobileCheck,
  reg,
  required,
  validateConfirmPassword,
};

export default validate;
