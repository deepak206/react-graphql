import React, { Component, Fragment } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Button from '../../views/button';
import ArrowBackIcon from '../../assets/images/arrow.svg';
import DatePicker from '../../views/date-picker';
import Error from '../../views/error';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import { trans } from '../../utils';
import history from '../../routes/history';
// css for edit lisence
import './edit-license.scss';

class EditLicense extends Component {
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
          courseName: '',
          dateRangeError: '',
          endDate: '',
          instituteName: '',
          licenseCount: '',
          startDate: '',
        },
        hasEndDateError: false,
        hasInstituteNameError: false,
        hasLicenseCountError: false,
        hasStartDateError: false,
        isValidate: false,
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

    const {
      fields, hasEndDateError, hasInstituteNameError, hasLicenseCountError, hasStartDateError,
    } = this.state;

    if (!hasEndDateError && !hasInstituteNameError && !hasLicenseCountError && !hasStartDateError) {
      if (fields.startDate !== '' && fields.endDate !== '' && fields.startDate > fields.endDate) {
        fields.dateRangeError = 'End date cannot be lesser than Start date.';
      }
      const { match: { params } } = this.props;

      history.push({
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/create-license`,
      });
    }
  };

  onClickCancelHandler = (event) => {
    event.preventDefault();
    const { match: { params } } = this.props;

    // todo
    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/create-license`,
    });
  }

  render() {
    const {
      fields: {
        courseName, dateRangeError, endDate, instituteName, licenseCount, startDate,
      },
      isValidate,
    } = this.state;

    return (
      <Fragment>
        <div className="edit-license__breadcrumb-section">
          <h3 className="edit-license__breadcrumb-section__title">
            <img alt="back" src={ ArrowBackIcon } className="edit-license__breadcrumb-section__side-arrow" onClick={ this.onClickCancelHandler } />
            {instituteName || ''}
          </h3>
        </div>
        <div className="edit-license">
          <Grid item xs={ 12 }>
            <Paper className="edit-license__papper">
              <Typography variant="h4" className="edit-license__papper__heading" gutterBottom>
                {trans('Edit License')}
              </Typography>
              <form noValidate onSubmit={ this.handleSubmit }>
                <div className="edit-license__form-row">
                  <Grid container>
                    <Grid item xs={ 6 } className="edit-license__form-row__input">
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
                    <Grid item xs={ 6 } className="edit-license__form-row__input">
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
                    <Grid item xs={ 6 } className="edit-license__form-row__input day-picker">
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
                    <Grid item xs={ 6 } className="edit-license__form-row__input day-picker end-date">
                      <DatePicker
                        label={ trans('End Date') }
                        name="endDate"
                        validateOptions={ {
                          check: true,
                          required: true,
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasEndDateError: res, isValidate: false }) }
                        disabledDates={ startDate }
                        fieldAttributes={ {
                          onDayChange: this.handleDateChange.bind(this, 'endDate'),
                          value: endDate || '',
                        } }
                      />
                      {dateRangeError === '' ? null : <Error errorMessage={ dateRangeError } />}
                    </Grid>
                  </Grid>
                  <Grid item xs={ 6 } className="edit-license__form-row__input">
                    <SelectBox
                      label={ trans('Course') }
                      name="courseName"
                      options={ [ 'Professional', 'Proficient', '1 year', '6 months', 'Custom Course' ] }
                      fieldAttributes={ {
                        onChange: this.handleChange.bind(this, 'courseName'),
                        value: courseName || '',
                      } }
                    />
                  </Grid>
                </div>
                <div className="edit-license__btns">
                  <Button text={ trans('Cancel') } classname={ 'btn-back' } clickHandler={ this.onClickCancelHandler } />
                  <Button text={ trans('Save') } classname={ 'btn-outlined' } clickHandler={ this.handleSubmit } />
                </div>
              </form>
            </Paper>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default EditLicense;
