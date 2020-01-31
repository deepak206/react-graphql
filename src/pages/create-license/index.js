/* eslint-disable sort-keys */
import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Button from '../../views/button';
import DatePicker from '../../views/date-picker';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import ViewLicense from '../view-license';
import { trans } from '../../utils';
import './create-license.scss';
import Error from '../../views/error';
import history from '../../routes/history';

const courselookup = {
  Foundation: 'Foundation',
  Professional: 'Professional',
  Proficient: 'Proficient',
  '1 year': '1 year',
  '6 months': '6 months',
  'Custom Course': 'Custom Course',
};

export class CreateLicense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      fields: {
        licenseKey: `PearB${Math.random()}`,
        licenseCount: '',
        startDate: '',
        endDate: '',
        courseName: 'Foundation',
        courseData: courselookup,
        dateRangeError: '',
        instituteName: this.props.location.institute || 'sharda University',
      },
      groupTitle: 'details' in props.location ? props.location.details.organization : '',
      hasEndDateError: true,
      hasInstituteNameError: false,
      hasLicenseCountError: true,
      hasStartDateError: true,
      isValidate: false,
      rows: [],
    };
  }

  handleChange(field, e) {
    const { target } = e;

    const { fields } = this.state;

    fields[field] = target.value;
    this.setState({ fields });
  }

  handleDateChange(field, day) {
    const { fields } = this.state;

    fields[field] = day;
    this.setState({ fields });
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);

    const {
      dateRangeError, hasEndDateError, hasInstituteNameError, hasLicenseCountError, hasStartDateError,
    } = this.state;

    if (!hasEndDateError && !hasInstituteNameError && !hasLicenseCountError && !hasStartDateError && dateRangeError !== '') {
      const { rows, fields } = this.state;

      if (fields.startDate !== '' && fields.endDate !== '' && fields.startDate > fields.endDate) {
        fields.dateRangeError = 'End date cannot be lesser than Start date.';
        return;
      }

      const updatedRows = [ ...rows, { ...fields } ];

      this.setState({
        fields: {
          licenseKey: `PearB${Math.random()}`,
          licenseCount: '',
          startDate: '',
          endDate: '',
          courseName: 'Foundation',
          courseData: courselookup,
          dateRangeError: '',
          instituteName: this.props.institute || 'sharda University',
        },
        hasEndDateError: true,
        hasInstituteNameError: false,
        hasLicenseCountError: true,
        hasStartDateError: true,
        isValidate: false,
        rows: updatedRows,
      });
    }
  };

  onClickNextHandler = () => {
    const { match: { params } } = this.props;

    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/add-instructors`,
    });
  };

  onClickCancelHandler = () => {
    const { match: { params } } = this.props;

    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/course-management`,
    });
  };

  render() {
    const {
      fields: {
        courseName, courseData, dateRangeError, endDate, instituteName, licenseCount, startDate,
      },
      isValidate,
      rows,
    } = this.state;
    const { match: { params } } = this.props;

    return (
      <div className="create-license">
        {rows.length === 0 ? null : <ViewLicense rows={ rows } params={ params } />}
        <Grid item xs={ 12 }>
          <Paper className="create-license__papper">
            <Typography variant="h4" className="create-license__papper__heading">
              {trans('Add License')}
            </Typography>
            <form noValidate onSubmit={ this.handleSubmit }>
              <div className="create-license__form-row">
                <Grid container >
                  <Grid item xs={ 6 } className="create-license__form-row__input">
                    <InputField
                      label={ trans('Institute') }
                      name="instituteName"
                      validateOptions={ {
                        check: true,
                        required: true,
                      } }
                      validate={ isValidate }
                      validationCallback={ (res) => this.setState({ hasInstituteNameError: res, isValidate: false }) }
                      fieldAttributes={ {
                        autoComplete: 'off',
                        readOnly: true,
                        value: instituteName || '',
                      } }
                    />
                  </Grid>
                  <Grid item xs={ 6 } className="create-license__form-row__input">
                    <InputField
                      label={ trans('No. of Licenses') }
                      name="licenseCount"
                      validateOptions={ {
                        check: true,
                        required: true,
                      } }
                      validate={ isValidate }
                      validationCallback={ (res) => this.setState({ hasLicenseCountError: res, isValidate: false }) }
                      fieldAttributes={ {
                        autoComplete: 'off',
                        onChange: this.handleChange.bind(this, 'licenseCount'),
                        type: 'number',
                        value: licenseCount || '',
                      } }
                    />
                  </Grid>
                  <Grid item xs={ 6 } className="create-license__form-row__input day-picker">
                    <DatePicker
                      label={ trans('Start Date') }
                      name="startDate"
                      validateOptions={ {
                        check: true,
                        required: true,
                      } }
                      validate={ isValidate }
                      validationCallback={ (res) => this.setState({ hasStartDateError: res, isValidate: false }) }
                      disabledDates={ new Date() }
                      fieldAttributes={ {
                        onDayChange: this.handleDateChange.bind(this, 'startDate'),
                        value: startDate || '',
                      } }
                    />
                  </Grid>
                  <Grid item xs={ 6 } className="create-license__form-row__input day-picker create-license__end-date">
                    <DatePicker
                      label={ trans('End Date') }
                      name="endDate"
                      validateOptions={ {
                        check: true,
                        required: true,
                      } }
                      validate={ isValidate }
                      validationCallback={ (res) => this.setState({ hasEndDateError: res, isValidate: false }) }
                      disabledDates={ startDate || new Date() }
                      fieldAttributes={ {
                        onDayChange: this.handleDateChange.bind(this, 'endDate'),
                        value: endDate || '',
                      } }
                    />
                    {dateRangeError === '' ? null : <Error errorMessage={ dateRangeError } />}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={ 6 } className="create-license__form-row__input">
                    <SelectBox
                      label={ trans('Course Name') }
                      name="courseName"
                      options={ courseData }
                      showFirstEmpty={ false }
                      fieldAttributes={ {
                        onChange: this.handleChange.bind(this, 'courseName'),
                        value: courseName || '',
                      } }
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid container className="btn-container">
                <Button type="submit" text={ trans('Save') } classname={ 'btn-primary' } />
              </Grid>
            </form>
          </Paper>
        </Grid>

        <div className="btns">
          <Button text={ trans('Back') } classname={ 'btn-back' } clickHandler={ this.onClickCancelHandler } />
          <Button text={ trans('Next') } classname={ 'btn-outlined' } clickHandler={ this.onClickNextHandler } />
        </div>
      </div>
    );
  }
}

export default CreateLicense;
