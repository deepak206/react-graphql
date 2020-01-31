import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import InputField from '../../views/input-field';
import PasswordField from '../../views/password-field';
import constants from '../../constants';
import { trans, poperConfig } from '../../utils';
import validate from '../../utils/validate';
import Button from '../../views/button';
import history from '../../routes/history';
import Popper from '../../views/popper';

import './assignAdmin.scss';

class AssignAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fields: {
        confirmPassword: '',
        email: '',
        name: '',
        password: '',
      },
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
      hasConfirmPasswordError: true,
      hasEmailError: true,
      hasNameError: false,
      hasPasswordError: true,
      isPassHintOpen: false,
      isValidate: false,
      placement: null,
    };
  }

  handleChange(field, e) {
    const { currentTarget, target } = e;
    const { fields } = this.state;

    fields[field] = target.value;

    if (field === 'password') {
      this.setState(() => ({
        anchorEl: currentTarget,
        fields,
        isPassHintOpen: validate.checkPassword(fields[field]).status,
        placement: 'left',
      }));
    } else {
      this.setState({ fields });
    }
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  onClickNextHandler = (event) => {
    event.preventDefault();
    this.toggleValidating(true);
    const { match: { params } } = this.props;
    const {
      hasConfirmPasswordError, hasEmailError, hasNameError, hasPasswordError,
    } = this.state;

    if (!hasConfirmPasswordError && !hasEmailError && !hasNameError && !hasPasswordError) {
      history.push({ details: { organization: this.state.groupTitle }, pathname: `/admin/manage-accounts/${params.institueId}/course-management` });
    }
  }

  render() {
    const { EMAIL_REGEX } = constants;
    const {
      anchorEl,
      fields: {
        email,
        name,
        password,
        confirmPassword,
      },
      isPassHintOpen,
      isValidate,
      placement,
    } = this.state;

    return (
      <div className="assign-admin">
        <Popper
          open={ isPassHintOpen }
          anchorEl={ anchorEl }
          placement={ placement }
          poperConfig={ poperConfig(password) } />
        <div className="assign-admin__container">
          <Grid item xs={ 12 }>
            <Paper className="assign-admin-paper">
              <Typography variant="h4" className="assign-admin-paper__text" gutterBottom>
                { trans('Assign Admin') }
              </Typography>
              <form className="assign-admin__form">
                <div className="assign-admin-fields">
                  <Grid container spacing={ 4 }>
                    <Grid item xs={ 6 } className="assign-admin-fields__input">
                      <InputField
                        label={ trans('Admin Email') }
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
                    </Grid>
                    <Grid item xs={ 6 } className="assign-admin-fields__input">
                      <InputField
                        label={ trans('Admin Name (optional)') }
                        name='name'
                        validateOptions= { {
                          check: false,
                          required: false,
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasNameError: res, isValidate: false }) }
                        fieldAttributes= {
                          {
                            autoComplete: 'off',
                            onChange: this.handleChange.bind(this, 'name'),
                            value: name || '',
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="assign-admin-fields__input">
                      <PasswordField
                        label={ trans('New Password') }
                        name='password'
                        strengthPop= { isPassHintOpen }
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
                            onBlur: () => this.setState({ isPassHintOpen: false }),
                            onChange: this.handleChange.bind(this, 'password'),
                            type: 'password',
                            value: password || '',
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="assign-admin-fields__input">
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
                            onChange: this.handleChange.bind(this, 'confirmPassword'),
                            type: 'password',
                            value: confirmPassword || '',
                          }
                        }
                      />
                    </Grid>
                  </Grid>
                </div>
              </form>
            </Paper>
          </Grid>
        </div>
        <div className="btns assign-admin__action">
          <Button
            text={ trans('next') }
            classname={ 'btn-outlined' }
            clickHandler= { this.onClickNextHandler }
          />
        </div>
      </div>
    );
  }
}

export default AssignAdmin;
