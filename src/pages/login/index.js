import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/styles/index.scss';
import './login.scss';
import { func } from 'prop-types';
import Link from '../../views/link';
import InputField from '../../views/input-field';
import Button from '../../views/button';
import OnBoardingBackground from '../../views/on-boarding-background/index';
import constants from '../../constants';
import { trans, getUserType } from '../../utils';
import { login } from '../../dispatchers/auth-action-dispatcher';
import history from '../../routes/history';
import Error from '../../views/error';
import SelectBox from '../../views/select-box';
import { selectbox_appearances } from '../../views/select-box';
import RadioButton from '../../views/radio-button';
import { radiobutton_appearances } from '../../views/radio-button';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: { email: '', password: '' },
      hasEmailError: true,
      hasPasswordError: true,
      isValidate: false,
      isReadOnly:true
    };

    // will change on componentDidmount
    const { loginData: { primaryRole } } = props;

    if (primaryRole) {
      history.push(`/${getUserType(primaryRole)}/dashboard`);
    }
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
  handleClick=(event) => {
    this.setState({isReadOnly:false})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);

    const { hasPasswordError, hasEmailError, fields } = this.state;

    if (!hasEmailError && !hasPasswordError) {
      this.props.login({ fields });
    }
  };

  render() {
    const { EMAIL_REGEX } = constants;
    const {
      fields: { password, email },
      errors,
      isValidate,
      isReadOnly
    } = this.state;

  const groupItems = [
      {
        name: "Male",
        label: "Male",
        information: "Please select if you are male",
        disabled: false
      },
      {
        name: "Female",
        label: "Female",
        information: "Please select if you are male",
        disabled: false
      },
      {
        name: "Other",
        label: "Other",
        information: "",
        disabled: true
      }
    ];

    const { error, isLoading } = this.props;

    return (
      <OnBoardingBackground
        classname="login-container"
        heading={ <h4 className="login-container__heading">{ trans('Log in to your MePro account') }</h4> }
        form={
          <form className="login-container__form" noValidate onSubmit={ this.handleSubmit }>
            <InputField
              label={ trans('Email') }
              errors={ errors }
              name='email'
              // for validation behaviour
              // validationRule={ [ 'VALIDATE_ON_BLUR', 'VALIDATE_ON_TYPE', 'VALIDATE_ON_FORM_SUBMIT' ] }
              validateOptions={ {
                check: true,
                reg: EMAIL_REGEX,
                regMsg: trans('Please enter a valid email address'),
                required: true,
              } }
              validate={ isValidate }
              validationCallback={ (res) => this.setState({ hasEmailError: res, validate: false }) }
              fieldAttributes= {
                {
                  autoComplete: 'off',
                  onChange: this.handleChange.bind(this, 'email'),
                  value: email || '',
                  // onClick:this.handleClick.bind(this),
                  onFocus:this.handleClick.bind(this),
                  readOnly: isReadOnly
                }
              }
            />
            {/* <input type="text" name="email" autoComplete="user-password" style={{display:"none"}}></input>
            <input type="password" name="password" autoComplete="user-password" style={{display:"none"}}></input> */}
            <InputField
              label={ trans('Password') }
              name='password'
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
                  onChange: this.handleChange.bind(this, 'password'),
                  // onClick:this.handleClick.bind(this),
                  onFocus:this.handleClick.bind(this),
                  type: 'password',
                  value: password || '',
                  readOnly: isReadOnly,
                }
              }
              
            />

            <SelectBox label={"text"} appearance={selectbox_appearances.primary}/>
              <RadioButton
                    groupItems={groupItems}
                    group="gender"
                    checkedDefault="Female"
                    appearance={radiobutton_appearances.primary}
                    error="Gender is required field"
                  />
            <div className="login-container-forgotpwd">
              <Link to="/resetpasswordsendlink" className="login-container-forgotpwd__link"
                text={ trans('Forgot Password?') }
              />
            </div>
            {error && <div className="login-container__error"><Error errorMessage={ error }/></div>}
            <div className="login-container__action">
              <Button
                type="submit"
                classname="btn-outlined btn-lg"
                disableHoverOnButtonLoader={ true }
                loading={ isLoading }
                text={ trans('Login') } />
            </div>
          </form>
        }
        formBottomContent={
          <div className="login-container__signup-action">
            { trans('Don\'t have an account?') }
            <Link to="/create-account" text={ trans('Sign Up') }/>
          </div>
        }
      />
    );
  }
}

Login.propTypes = {
  handleSubmit: func,
};

const mapStateToProps = ({ authState: { loginData, isLoading, error } }) => ({ loginData, isLoading, error });

const mapDispatchToProps = (dispatch) => ({
  login: (fields) => {
    dispatch(login(fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
