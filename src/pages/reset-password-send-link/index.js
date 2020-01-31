import React, { Component } from 'react';
import './reset-password-send-link.scss';
import '../../assets/styles/index.scss';
import Link from '../../views/link';
import { connect } from 'react-redux';
import InputField from '../../views/input-field';
import Button from '../../views/button';
import { ResetPasswordData } from '../../dispatchers/reset-password-action-dispatcher'
import OnBoardingBackground from '../../views/on-boarding-background/index';
import constant from '../../constants';
import { trans } from '../../utils';

export class ResetPasswordSendLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { email: '' },
      hasEmailError: false,
      isValid: false,
      isValidate: false,
    };
  }

  handleChange = (field, e) => {
    const { target } = e;

    const { fields } = this.state;

    fields[field] = target.value;
    this.setState({ fields });
  };

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);
    this.props.ResetPasswordData("bruce.banner@oaepdev.com")
    const { hasEmailError, fields } = this.state;

    console.log(this.props.ResetPasswordData)
    if (!hasEmailError) {
      if (fields.email !== '') {
        // window.location.href = '/resetpasswordsendlinksuccess';
        // history.push('/admin/dashboard');
      }
    }
  };

  render() {
    const { EMAIL_REGEX } = constant;
    const {
      fields: { email },
      errors,
      isValidate,
    } = this.state;

    const { isLoading } = this.props;

    return (
      <OnBoardingBackground
        classname="reset-password-send-link-container"
        isOverlay={ true }
        heading={
          <>
            <h4 className="reset-password-send-link-container__form-heading">{ trans('Reset your password') }</h4>
            <h6 className="reset-password-send-link-container__form-heading"
              dangerouslySetInnerHTML={ { __html: trans('Enter your registered email id to receive a password recovery link') } }>
            </h6>
          </>
        }
        form={
          <form className="reset-password-send-link-container__form-width" noValidate onSubmit={ this.handleSubmit }>
            <InputField
              label={ trans('Email') }
              errors={ errors }
              name='email'
              validateOptions= { {
                check: true,
                reg: EMAIL_REGEX,
                regMsg: trans('Please enter a valid email address'),
                required: true,
              } }
              validate={ isValidate }
              validationCallback={ (res) => this.setState({ hasEmailError: res, isValidate: false }) }
              fieldAttributes= {
                {
                  autoComplete: 'off',
                  onChange: this.handleChange.bind(this, 'email'),
                  value: email || '',
                }
              }
            />
            <div className="reset-password-send-link-container__form-group">
              <Button
                type="submit"
                classname="btn-outlined btn-lg"
                text={ trans('Send Link') }
                loading={ isLoading }
              />
            </div>
            <div className="reset-password-send-link-container__form-group">
              <Link
                to="/"
                text={ trans('Return to Login') }
                classname='reset-pass-link'
              />
            </div>
          </form>
        }
      />
    );
  }
}
const mapStateToProps = ({ ResetPasswordState: { isLoading, error } }) => ()=>{
  return{
    isLoading,
    error
  }

};

const mapDispatchToProps = (dispatch) => ({
  ResetPasswordData: (email ) => {
    dispatch(ResetPasswordData(email));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordSendLink);
