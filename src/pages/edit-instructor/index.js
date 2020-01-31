import React, { Component, Fragment } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Button from '../../views/button';
import PasswordField from '../../views/password-field';
import ArrowBackIcon from '../../assets/images/arrow.svg';
import constants from '../../constants';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import { trans } from '../../utils';
import history from '../../routes/history';
// css for edit instructor
import './edit-instructor.scss';

const courselookup = { 1: 'Course A', 2: 'Course B', 3: 'Course C' };
const sectionlookup = { 1: 'Section A', 2: 'Section B', 3: 'Section C' };
const departmentlookup = { 1: 'Department A', 2: 'Department B', 3: 'Department C' };

class EditInstructor extends Component {
  constructor(props) {
    super(props);

    if (props.location && props.location.details) {
      this.state = {
        anchorEl: null,
        fields: {
          ...props.location.details,
        },
        hasEndDateError: false,
        hasInstituteNameError: false,
        hasLicenseCountError: false,
        hasStartDateError: false,
        isValidate: false,
      };
    } else {
      this.state = {
        anchorEl: null,
        fields: {
          course: '',
          courseData: courselookup,
          department: '',
          departmentData: departmentlookup,
          firstName: '',
          lastName: '',
          loginID: '',
          password: '',
          section: '',
          sectionData: sectionlookup,
        },
        groupTitle: 'details' in props.location ? props.location.details.organization : '',
        hasFirstNameError: true,
        hasLastNameError: true,
        hasLoginIdError: true,
        hasPasswordError: true,
        isValidate: false,
        open: false,
        placement: null,
        rows: []
      };
    }
  }

  handleChange(field, e) {
    const { target } = e;
    const { fields } = this.state;

    fields[field] = target.value;
    this.setState({ fields });
  }

  handleDateChange(field, day) {
    const { fields } = this.state;

    fields[field] = day.toLocaleDateString();
    this.setState({ fields });
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);

    const { match: { params } } = this.props;

    const {
      fields, hasEndDateError, hasInstituteNameError, hasLicenseCountError, hasStartDateError,
    } = this.state;

    if (!hasEndDateError && !hasInstituteNameError && !hasLicenseCountError && !hasStartDateError) {
      if (fields.startDate !== '' && fields.endDate !== '' && fields.startDate > fields.endDate) {
        fields.dateRangeError = 'End date cannot be lesser than Start date.';
      }
      history.push({
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/add-instructors`,
      });
    }
  };

  onClickCancelHandler = (event) => {
    const { match: { params } } = this.props;

    event.preventDefault();
    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/add-instructors`,
    });
  }

  render() {
    const { EMAIL_REGEX, ALPHA_NUMERIC_REGEX } = constants;
    const {
      fields: {
        firstName, lastName, loginID, password, department, departmentData, section, sectionData, course, courseData,
      },
      isValidate,
    } = this.state;

    return (
      <Fragment>
        <div className="edit-Instructor__breadcrumb-section">
          <h3 className="edit-Instructor__breadcrumb-section__title">
            <img src={ ArrowBackIcon } alt={ trans('Back') } className="edit-Instructor__breadcrumb-section__side-arrow" onClick={ this.onClickCancelHandler } />
            {trans('Instructor Management')}
          </h3>
        </div>
        <div className="edit-Instructor">
          <div className="edit-Instructor__form">
            <Grid item xs={ 12 }>
              <Paper className="edit-Instructor__papper">
                <Typography variant="h4" className="edit-Instructor__papper__heading" gutterBottom>
                  {trans('Edit Instructor')}
                </Typography>
                <form noValidate onSubmit={ this.handleSubmit }>
                  <div >
                    <Typography className="edit-Instructor__sub-title" variant="h5">{trans('Basic Information')}</Typography>
                    <Grid container className="edit-Instructor__form-row">
                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <InputField
                          label={ trans('First Name') }
                          name="firstName"
                          validateOptions={ {
                            check: true,
                            reg: ALPHA_NUMERIC_REGEX,
                            regMsg: trans('First Name should be alphanumeric'),
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasFirstNameError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: 100,
                            onChange: this.handleChange.bind(this, 'firstName'),
                            value: firstName || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <InputField
                          label={ trans('Last Name') }
                          name="lastName"
                          validateOptions={ {
                            check: true,
                            reg: ALPHA_NUMERIC_REGEX,
                            regMsg: trans('Last Name should be alphanumeric'),
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasLastNameError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: 100,
                            onChange: this.handleChange.bind(this, 'lastName'),
                            value: lastName || '',
                          } }
                        />
                      </Grid>

                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <InputField
                          label={ trans('Login ID') }
                          name="loginID"
                          validateOptions={ {
                            check: true,
                            reg: EMAIL_REGEX,
                            regMsg: trans('Please enter a valid email address'),
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasLoginIdError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            onChange: this.handleChange.bind(this, 'loginID'),
                            value: loginID || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <PasswordField
                          label={ trans(' Password') }
                          name="password"
                          strengthPop={ this.state.open }
                          validate={ isValidate }
                          validateOptions={ {
                            check: true,
                            passwordCheck: true,
                            required: true,
                          } }
                          validationCallback={ (res) => this.setState({ hasPasswordError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            onChange: this.handleChange.bind(this, 'password'),
                            type: 'password',
                            value: password || '',
                          } }
                        />
                      </Grid>
                    </Grid>
                    <hr className="edit-Instructor__horizontal-divider"/>
                    <Typography className="edit-Instructor__sub-title" variant="h5">{trans('Course Details')}</Typography>
                    <Grid container className="edit-Instructor__form-row">
                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <SelectBox
                          label={ trans('Department') }
                          name="department"
                          options={ departmentData }
                          showFirstEmpty={ false }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'department'),
                            value: department || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <SelectBox
                          label={ trans('Section') }
                          name="section"
                          options={ sectionData }
                          showFirstEmpty={ false }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'section'),
                            value: section || '',
                          } }
                        />
                      </Grid>

                      <Grid item xs={ 6 } className="edit-Instructor__form-row__input">
                        <SelectBox
                          label={ trans('Course') }
                          name="course"
                          options={ courseData }
                          showFirstEmpty={ false }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'course'),
                            value: course || '',
                          } }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="edit-Instructor__btns">
                    <Button text={ trans('Cancel') } classname={ 'btn-back' } />
                    <Button type="submit" text={ trans('Save') } classname={ 'btn-outlined' }/>
                  </div>
                </form>
              </Paper>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditInstructor;
