import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import ArrowBackIcon from '../../assets/images/arrow.svg';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import Button from '../../views/button';
import history from '../../routes/history';
import './edit-institute.scss';
import { trans } from '../../utils';

export class EditInstitute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      fields: {
        address: '',
        city: '',
        institutename: ('details' in props.location) ? props.location.details.institute : '',
        town: '',
      },
      hasAddressError: false,
      hasCityError: false,
      hasInstituteNameError: false,
      hasTownError: false,
      isValidate: false,
    };
  }

  handleChange(field, e) {
    const { target } = e;

    const { fields } = this.state;

    fields[field] = target.value;

    this.setState({ fields });
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    const { details } = this.props.location;

    event.preventDefault();
    this.toggleValidating(true);
    history.push({ details, pathname: '/admin/manage-accounts' });
  };

  onClickCancelHandler = () => {
    const { details } = this.props.location;

    history.push({ details, pathname: '/admin/manage-accounts' });
  }

  render() {
    const {
      fields: {
        institutename, town, address, city,
      },
      isValidate,
    } = this.state;

    return (
      <div className="edit-institute__manage-section">
        <div className="edit-institute__breadcrumb-section">
          <h3 className="edit-institute__breadcrumb-section__title">
            <img
              src={ ArrowBackIcon }
              className="edit-institute__breadcrumb-section__side-arrow"
              onClick={ this.onClickCancelHandler }
              alt={ trans('Back') }
            />
            { trans('Institutes') }
          </h3>
        </div>
        <div className="edit-institute__form-section">
          <div className="edit-institute">
            <div className="edit-institute__form">
              <Grid item xs={ 12 }>
                <Paper className="edit-institute__papper">
                  <Typography variant="h4" className="edit-institute__papper__heading" gutterBottom>
                    {trans('Edit Institute')}
                  </Typography>
                  <form  noValidate onSubmit={ this.handleSubmit }>
                    <div className="edit-institute__form-row">
                      <Grid container>
                        <Grid item xs={ 6 } className="edit-institute__form-row__input">
                          <InputField
                            label={ trans('Institute Name') }
                            name="institutename"
                            validateOptions={ {
                              check: true,
                              required: true,
                            } }
                            validate={ isValidate }
                            validationCallback={ (res) => this.setState({ hasInstituteNameError: res, isValidate: false }) }
                            fieldAttributes={ {
                              autoComplete: 'off',
                              onChange: this.handleChange.bind(this, 'institutename'),
                              value: institutename || '',
                            } }
                          />
                        </Grid>
                        <Grid item xs={ 6 } className="edit-institute__form-row__input">
                          <InputField
                            label={ trans('Address') }
                            name="address"
                            validateOptions={ {
                              check: true,
                              required: true,
                            } }
                            validate={ isValidate }
                            validationCallback={ (res) => this.setState({ hasAddressError: res, isValidate: false }) }
                            fieldAttributes={ {
                              autoComplete: 'off',
                              onChange: this.handleChange.bind(this, 'address'),
                              value: address || '',
                            } }
                          />
                        </Grid>
                        <Grid item xs={ 6 } className="edit-institute__form-row__input">
                          <InputField
                            label={ trans('Town/Locality') }
                            name="town"
                            validateOptions={ {
                              check: true,
                              required: true,
                            } }
                            validate={ isValidate }
                            validationCallback={ (res) => this.setState({ hasTownError: res, isValidate: false }) }
                            fieldAttributes={ {
                              autoComplete: 'off',
                              onChange: this.handleChange.bind(this, 'town'),
                              value: town || '',
                            } }
                          />
                        </Grid>
                        <Grid item xs={ 6 } className="edit-institute__form-row__input">
                          <SelectBox
                            label={ trans('City') }
                            name="city"
                            validate={ isValidate }
                            options={ [ 'Mumbai', 'Delhi' ] }
                            validateOptions={ {
                              check: true,
                              required: true,
                            } }
                            validationCallback={ (res) => this.setState({ hasCityError: res, isValidate: false }) }
                            fieldAttributes={ {
                              onChange: this.handleChange.bind(this, 'city'),
                              value: city || '',
                            } }
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </form>
                </Paper>
              </Grid>
            </div>
            <div className="edit-institute__form-section__btns">
              <Button text={ trans('Cancel') } classname={ 'btn-back' } clickHandler={ this.onClickCancelHandler } />
              <Button text={ trans('Save') } classname={ 'btn-outlined' } clickHandler={ this.handleSubmit } />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default EditInstitute;
