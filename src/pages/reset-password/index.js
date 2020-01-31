import React, { Component } from 'react';
import './reset-password.scss';
import '../../assets/styles/index.scss';
import Button from '../../views/button';
import OnBoardingBackground from '../../views/on-boarding-background/index';
import { poperConfig, trans } from '../../utils';
import Popper from '../../views/popper';
import PasswordField from '../../views/password-field';
import validate from '../../utils/validate';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fieldErrors: {},
      fields: { confirmPassword: '', password: '' },
      hasConfirmPasswordError: false,
      hasPasswordError: false,
      isSuccess: true,
      isValidate: false,
      open: false,
      placement: null,
    };
  }

  handleOnChange(field, e) {
    const { currentTarget, target } = e;

    const { fields } = this.state;

    if (field === 'password') {
      fields[field] = target.value;

      this.setState(() => ({
        anchorEl: currentTarget,
        fields,
        open: validate.checkPassword(fields[field]).status,
        placement: 'right',
      }));
    } else {
      fields[field] = target.value;

      this.setState({ fields });
    }
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);

    const { hasPasswordError, hasConfirmPasswordError, fields } = this.state;

    if (!hasPasswordError && !hasConfirmPasswordError) {
      if (fields.password !== '' && fields.confirmPassword !== '') {
        window.location.href = '/resetpasswordchangesuccess';
        // history.push('/admin/dashboard');
      }
    }
  };

  render() {
    const {
      fields: { password, confirmPassword },
      anchorEl,
      open,
      placement,
      isValidate,
    } = this.state;

    return (
      <OnBoardingBackground
        classname="reset-password-container"
        isOverlay={ true }
        heading={ <h4 className="reset-password-container__form-heading">{ trans('Reset your password') }</h4> }
        form={
        <>
        <Popper
          open={ open }
          anchorEl={ anchorEl }
          placement={ placement }
          poperConfig={ poperConfig(password) } />
          <form className="reset-password-container__form" noValidate onSubmit={ this.handleSubmit }>
            <PasswordField
              label={ trans('New Password') }
              name='password'
              strengthPop= { this.state.open }
              validate={ isValidate }
              validateOptions= { {
                check: true,
                passwordCheck: true,
                required: true,
              } }
              validationCallback={ (res) => this.setState({ hasPasswordError: res, isValidate: false }) }
              fieldAttributes= {
                {
                  autoComplete: 'off',
                  onChange: this.handleOnChange.bind(this, 'password'),
                  type: 'password',
                  value: password || '',
                }
              }
            />
            <PasswordField
              label={ trans('Confirm New Password') }
              name='confirmPassword'
              strengthPop= { false }
              validate={ isValidate }
              validateOptions= { {
                check: true,
                confirmPassword,
                newPass: password,
                required: true,
              } }
              validationCallback={ (res) => this.setState({ hasConfirmPasswordError: res, isValidate: false }) }
              fieldAttributes= {
                {
                  autoComplete: 'off',
                  onChange: this.handleOnChange.bind(this, 'confirmPassword'),
                  type: 'password',
                  value: confirmPassword || '',
                }
              }
            />
            <div className="reset-password-container__form-buttons">
              <Button
                type="submit"
                classname="btn-outlined btn-lg reset-password-button"
                text={ trans('Reset Password') }
              />
            </div>
          </form>
          </>
        }
      />
    );
  }
}
export default ResetPassword;
