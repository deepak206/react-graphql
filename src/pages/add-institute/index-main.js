import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import Button from '../../views/button';
import MobileField from '../../views/mobile-field';
import './add-institute.scss';
import constants from '../../constants';
import history from '../../routes/history';
import { trans, createGuid, indexFormat } from '../../utils';

class IndexMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fields: {
        address: '',
        city: '',
        countryCode: '+91',
        department: [ { 'hasDepartmentError': true, section: [], 'value': ' ' } ],
        instituteName: '',
        mobile: '',
        pincode: '',
        town: '',
      },
      hasAddressError: true,
      hasInstituteNameError: true,
      hasMobileError: true,
      hasPincodeError: true,
      hasTownError: true,
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

  handleDepartmemtChange(field, index, e) {
    const { fields } = this.state;
    const { department } = fields;

    department[index].value = e.target.value
    fields[department] = department;
    this.setState({ fields })
  }

  handleSectionChange(field, index, sectionIndex, e) {
    const { fields } = this.state;
    const { department } = fields;

    department[index].section[sectionIndex].value = e.target.value
    fields[department] = department;
    this.setState({ fields })
  }

  addDepartment = (e) => {
    e.preventDefault();
    const { fields } = this.state;
    const { department } = fields;
    const departments = department.concat([ { 'hasDepartmentError': true, section: [], 'value': '' } ])

    fields["department"] = departments
    this.setState({ fields })
  }

  addSection = (index) => (e) => {
    e.preventDefault();
    const { fields } = this.state;
    const { department } = fields;

    let { length } = department[index].section;

    length++;
    department[index].section.push({ 'hasSectionError': true, label: `Section ${length}`, "value": "" })
    fields[department] = department
    this.setState({ fields })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);
    const { hasInstituteNameError, hasAddressError, hasTownError } = this.state;

    if (!hasInstituteNameError && !hasAddressError && !hasTownError) {
      history.push({ details: { organization: this.state.fields.instituteName }, pathname: `/admin/manage-accounts/${createGuid()}/assign-admin` });
    }
  };

  onClickBackHandler = (event) => {
    history.push({
      pathname: `/admin/manage-accounts/`
    });
  };

  render() {
    const { ALPHA_NUMERIC_REGEX } = constants;
    const {
      fields: {
        countryCode, department, instituteName, town, address, city, mobile, pincode
      },
      isValidate,
    } = this.state;

    return (
      <div className="add-institute">
        <div className="add-institute__breadcrumb">
          <h3 className="add-institute__breadcrumb__title">{trans('Manage Accounts')}</h3>
          <span className="add-institute__breadcrumb__sub-title">{trans('Institute')}</span>
        </div>
        <div className="add-institute__form-section">
          <div className="add-institute__content">
            <Grid item xs={ 12 }>
              <Paper className="add-institute__papper">
                <Typography variant="h4" className="add-institute__papper__heading" gutterBottom>
                  {trans('Add Institute')}
                </Typography>
                <p className="add-institute__papper__sub-heading"> {trans('Enter the details of your new institute')}</p>
                <form noValidate onSubmit={ this.handleSubmit }>
                  <div className="add-institute__form-row">
                    <Grid  container spacing={ 4 }>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <InputField
                          label={ trans('Institute Name') }
                          name="instituteName"
                          validateOptions={ {
                            check: true,
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasInstituteNameError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'instituteName'),
                            value: instituteName || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
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
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'address'),
                            value: address || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
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
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'town'),
                            value: town || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <SelectBox
                          label={ trans('City') }
                          name="city"
                          options={ [ 'Mumbai', 'Delhi' ] }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'city'),
                            value: city || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <InputField
                          label={ trans('Pincode') }
                          name="pincode"
                          validateOptions={ {
                            check: true,
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasPincodeError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'pincode'),
                            value: pincode || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
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
                      </Grid>
                    </Grid>
                  </div>
                  {department.map((dept, index) => (
                    <div key={ index } >
                      <hr className="add-institute__horizontal-divider"/>
                      <div className="add-institute__department-title"> {trans('Department')} {indexFormat((index + 1), 2)} </div>
                      <div className="add-institute__dynamic-form-row">
                        <Grid item xs={ 6 } className="add-institute__dynamic-form-row__input">
                          <InputField
                            label={ trans('Name') }
                            name="dept"
                            validateOptions={ {
                              check: true,
                              reg: ALPHA_NUMERIC_REGEX,
                              regMsg: trans('Department Name should be alphanumeric'),
                              required: false,
                            } }
                            validate={ isValidate }
                            validationCallback={ (res) => this.setState({ [department[index].hasDepartmentError]: res, isValidate: false }) }
                            fieldAttributes={ {
                              autoComplete: 'off',
                              maxLength: '100',
                              onChange: this.handleDepartmemtChange.bind(this, 'dept', index),
                              value: dept.value || '',
                            } }
                          />
                        </Grid>
                        <Grid className="dynamic-input" container>
                          {dept.section && dept.section.map((sect, sectionIndex) => (
                            <Grid item xs={ 6 } className="add-institute__dynamic-form-row__input" key={ sectionIndex }>
                              <InputField
                                label={ sect.label }
                                name="sect"
                                validateOptions={ {
                                  check: true,
                                  reg: ALPHA_NUMERIC_REGEX,
                                  regMsg: trans('Section Name should be alphanumeric'),
                                  required: false,
                                } }
                                validate={ isValidate }
                                validationCallback={ (res) => this.setState({ [department[index]
                                  .section[sectionIndex].hasSectionError]: res, isValidate: false }) }
                                fieldAttributes={ {
                                  autoComplete: 'off',
                                  maxLength: '100',
                                  onChange: this.handleSectionChange.bind(this, 'sect', index, sectionIndex),
                                  value: sect.value || '',
                                } }
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <div className='add-institute__add-section' onClick={ this.addSection(index) }>{trans('+ Add Section')}</div>
                      </div>
                    </div>
                  ))}
                  <Button text={ '+ CREATE DEPARTMENT' } classname={ 'btn-primary' } clickHandler={ this.addDepartment } />
                  <div className="add-institute__btns">
                    <Button text={ 'Back' } classname={ 'btn-back' } clickHandler={ this.onClickBackHandler } />
                    <Button type="submit" text={ 'Save' } classname={ 'btn-outlined' } />
                  </div>
                </form>
              </Paper>
            </Grid>
          </div>
        </div>

      </div>
    );
  }
}

export default IndexMain;