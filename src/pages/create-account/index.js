import React, { Component } from 'react';
import {
  Paper, Typography, Grid,
} from '@material-ui/core';
import InputField from '../../views/input-field';
import Popper from '../../views/popper';
import MobileField from '../../views/mobile-field';
import Button from '../../views/button';
import validate from '../../utils/validate';
import PasswordField from '../../views/password-field';
import { poperConfig, trans } from '../../utils';
import history from '../../routes/history';
import Layout from '../../views/layout';
import constants from '../../constants';

// scss for create account page
import './createAccount.scss';

export class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      fields: {
        countryCode: '+91',
        email: '',
        mobile: '',
        name: '',
        password: '',
      },
      hasEmailError: true,
      hasMobileError: true,
      hasNameError: true,
      hasPasswordError: true,
      isValidate: false,
      open: false,
      placement: null,
    };
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);

    const {
      hasEmailError, hasMobileError, hasNameError, hasPasswordError,
    } = this.state;

    if (!hasEmailError && !hasMobileError && !hasNameError && !hasPasswordError) {
      history.push('/');
    }

    // todo
  }

  handleChange(field, e) {
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
    } else if (field === 'mobile') {
      const re = /^[0-9\b]+$/;

      if (e.target.value === '' || re.test(e.target.value)) {
        fields[field] = target.value;

        this.setState({ fields });
      }
    } else {
      fields[field] = target.value;

      this.setState({ fields });
    }
  }

  render() {
    const { EMAIL_REGEX } = constants;

    const {
      fields: {
        countryCode,
        email,
        name,
        password,
        mobile,
      },
      anchorEl,
      open,
      placement,
      isValidate,
    } = this.state;

    return (
      <Layout>
        <Grid className="create-account">
          <Popper
            open={ open }
            anchorEl={ anchorEl }
            placement={ placement }
            poperConfig={ poperConfig(password) } />
          <Grid className="create-account__container" >
            <div className="create-account__container__man"></div>
            <div className="create-account__container__girl"></div>
            <div className="create-account__container__group-chat"></div>
            <div className="create-account__container__group-chat-reply"></div>
            <Typography variant="h4" className="create-account__heading">{trans('Create your MePro account')}</Typography>
            <Paper className="create-account__container_paper">
              <form className="create-account__container_paper_form" onSubmit={ this.handleSubmit } noValidate>
                <InputField
                  label={ trans('Email') }
                  name='email'
                  validateOptions={ {
                    check: true,
                    reg: EMAIL_REGEX,
                    regMsg: trans('Please enter a valid email address'),
                    required: true,
                  } }
                  validate={ isValidate }
                  validationCallback={ (res) => this.setState({ hasEmailError: res, validate: false }) }
                  fieldAttributes={
                    {
                      autoComplete: 'off',
                      onChange: this.handleChange.bind(this, 'email'),
                      value: email || '',
                    }
                  }
                />
                <InputField
                  label={ trans('Name') }
                  name='name'
                  validateOptions={ {
                    check: true,
                    required: true,
                  } }
                  validate={ isValidate }
                  validationCallback={ (res) => this.setState({ hasNameError: res, isValidate: false }) }
                  fieldAttributes={
                    {
                      autoComplete: 'off',
                      onChange: this.handleChange.bind(this, 'name'),
                      value: name || '',
                    }
                  }
                />
                <PasswordField
                  label={ trans('Create Password') }
                  name='password'
                  strengthPop={ open }
                  validate={ isValidate }
                  helper={ true }
                  validateOptions={ {
                    check: true,
                    passwordCheck: true,
                    required: true,
                  } }
                  validationCallback={ (res) => this.setState({ hasPasswordError: res, isValidate: false }) }
                  fieldAttributes={
                    {
                      autoComplete: 'off',
                      onBlur: () => this.setState({ open: false }),
                      onChange: this.handleChange.bind(this, 'password'),
                      type: 'password',
                      value: password || '',
                    }
                  }
                />
                {/* for mobile numer */}
                <MobileField
                  label={ trans('Mobile') }
                  name='mobile'
                  countryAttributes={ {
                    onChange: this.handleChange.bind(this, 'countryCode'),
                    value: countryCode,
                  } }
                  validate={ isValidate }
                  validateOptions={ {
                    check: true,
                    mobileCheck: true,
                    required: true,
                  } }
                  validationCallback={ (res) => this.setState({ hasMobileError: res, isValidate: false }) }
                  fieldAttributes={ {
                    autoComplete: 'off',
                    maxLength: '10',
                    onChange: this.handleChange.bind(this, 'mobile'),
                    value: mobile || '',
                  } }
                />
                <Grid className="create-account__container_paper_form_submit-buttons">
                  <Button type="submit" classname="btn-outlined btn-lg create-submit" text={ trans('CREATE ACCOUNT') } />
                </Grid>
              </form>
              <Grid>
                <img className='create-account-leaf__image'src={ require('../../assets/images/leaf.png') } alt="img" />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default CreateAccount;
