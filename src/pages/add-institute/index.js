import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Typography } from '@material-ui/core';
import { isEqual, isEmpty } from 'lodash';
import InputField from '../../views/input-field';
import SelectBox from '../../views/select-box';
import Button from '../../views/button';
import urlChanger from '../../utils/url-changer';
import CheckBox from '../../views/check-box';
import { trans } from '../../utils';
import history from '../../routes/history';
import constants from '../../constants';
import ArrowBackIcon from '../../assets/images/arrow.svg';
import LinearProgressBar from '../../views/loader/linear-progress-bar';
import { emptyTheStore } from '../../actions/add-institute-action-type';
import {
  addInstitutesData,
  getCitiesData,
  instituteById,
  updateInstituteData,
  getCourseByProduct
} from '../../dispatchers/add-institutes-action-dispatcher';

// css for add institute
import './add-institute.scss';

class AddInstitute extends Component {
  constructor(props) {
    super(props);
    let instituteId = '';

    const { match: { params: { params } } } = props;

    const decodedParams = urlChanger.decode(params);

    if (params && decodedParams) {
      // decode the url params
      // eslint-disable-next-line prefer-destructuring
      instituteId = decodedParams.instituteId;
    }

    this.state = {
      anchorEl: null,
      instituteId,
      fields: {
        addressString: '',
        city: '',
        name: '',
        // static for now
        country: 'india',
      },
      isFlashVisible: false,
      isChecked: !!instituteId,
      hasAddressError: true,
      hasInstituteNameError: true,
      isValidate: false,
    };
  }

  handleChange(field, e) {
    const { target } = e;
    const { fields } = this.state;
    const { SPL_CHAR_REGEX, ALPHA_NUMERIC_REGEX } = constants;

    const setFieldState = (value, regex) => {
      if (value === '' || regex.test(value)) {
        fields[field] = target.value;

        this.setState({ fields });
      }
    };

    if (field === 'addressString') {
      setFieldState(target.value, SPL_CHAR_REGEX);
    } else if (field === 'name') {
      setFieldState(target.value, ALPHA_NUMERIC_REGEX);
    } else {
      fields[field] = target.value;
    }

    this.setState({ fields });
  }

  componentDidMount() {
    const { getCitiesData, citiesData } = this.props;

    const { instituteId } = this.state;

    // getting the product course
    this.props.getCourseByProduct();

    if (instituteId) {
      this.props.getInstituteById(instituteId);
    } else {
      // Empty the store when adding the institute
      this.props.emptyTheStore();
    }

    if (isEmpty(citiesData)) {
      // if cities data is empty load city data
      getCitiesData();
    }
  }

  componentDidUpdate() {
    const { fields } = this.state;

    const { instituteId } = this.state;

    if (!isEqual(fields, this.props.fields) && instituteId) {
      this.setState({
        hasAddressError: false,
        hasInstituteNameError: false,
        fields: this.props.fields
      });
    }
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);
    const { hasInstituteNameError, hasAddressError, fields, instituteId } = this.state;

    this.setState({ isFlashVisible: true });
    if (!hasInstituteNameError && !hasAddressError ) {
      const { citiesData } = this.props;

      let fieldData =  fields;

      // Assign first value when city is empty
      if (!fields.city) {
        fieldData = {
          ...fields,
          city: citiesData[0].id
        }
      }

      if (instituteId) {
        this.props.updateInstituteData( { fields: fieldData }, instituteId );

        return;
      }
      this.props.addInstitutesData({ fields: fieldData });
    }
  };

  onClickBackHandler = (event) => {
    event.preventDefault();
    history.push({
      pathname: `/admin/manage-institutes`,
    });
  }

  render() {
    const { ALPHA_NUMERIC_REGEX, SPL_CHAR_REGEX } = constants;
    const {
      fields: {
        name, country, addressString, city
      },
      hasAddressError,
      instituteId,
      hasInstituteNameError,
      isChecked,
      isValidate
    } = this.state;

    const {
      isLoading,
      citiesData,
      isPageLoading,
      courseData
    } = this.props;

    if (isPageLoading) {
      return  <div className="add-inst-loader"> <LinearProgressBar/> </div>;
    }

    return (
      <div className="add-institute">
        <div className="add-institute__breadcrumb">
          <h3 className="add-institute__breadcrumb-section__title">
            <img src={ ArrowBackIcon } alt={ trans('Back') }
              className="add-institute__breadcrumb-section__side-arrow" onClick={ this.onClickBackHandler } />
            {trans('Manage Accounts')}
          </h3>
        </div>
        <div className="add-institute__form-section">
          <div className="add-institute__content">
            <Grid item xs={ 12 }>
              <form noValidate onSubmit={ this.handleSubmit }>
                <Paper className="add-institute__papper">
                  <Typography variant="h4" className="add-institute__papper__heading" gutterBottom>
                    {trans(`${!!instituteId ? 'Edit' : 'Add'} Institute`)}
                  </Typography>
                  <div className="add-institute__form-row">
                    <Grid  container spacing={ 4 }>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <InputField
                          label={ trans('Institute Name') }
                          name="name"
                          validateOptions={ {
                            check: true,
                            reg: ALPHA_NUMERIC_REGEX,
                            regMsg: trans('Only alphanumeric characters are allowed'),
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasInstituteNameError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'name'),
                            value: name || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <SelectBox
                          label={ trans('Country') }
                          name="country"
                          options={ { india: 'India' } }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'country'),
                            value: country || '',
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <SelectBox
                          label={ trans('City') }
                          name="city"
                          options={ citiesData }
                          fieldAttributes={ {
                            onChange: this.handleChange.bind(this, 'city'),
                            value: city,
                          } }
                        />
                      </Grid>
                      <Grid item xs={ 6 } className="add-institute__form-row__input">
                        <InputField
                          label={ trans('Address') }
                          name="addressString"
                          validateOptions={ {
                            check: true,
                            required: true,
                            reg: SPL_CHAR_REGEX,
                            regMsg: trans(`Only ${',.-/"\\()<>!'} characters are allowed`),
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasAddressError: res, isValidate: false }) }
                          fieldAttributes={ {
                            autoComplete: 'off',
                            maxLength: '100',
                            onChange: this.handleChange.bind(this, 'addressString'),
                            value: addressString || '',
                          } }
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
                {/* will not load when no course is present */}

                <Fragment>
                  { !isEmpty(courseData) &&
                    <Paper className="add-institute__papper">
                      <div className="add-institute__select-course">
                        <Typography variant="h4" className="add-institute__course__heading" gutterBottom>
                          {trans('Select Course')}
                        </Typography>
                        <div className="add-institute__select-course_section" >
                          <CheckBox
                            id={ 'course_id' }
                            isDisabled={ false }
                            fieldAttributes={ {
                              onChange: () => this.setState({ isChecked: !isChecked }),
                            } }
                            isChecked={ isChecked }
                            label={ courseData }
                            isToggleCheckbox={ false }/>
                        </div>
                      </div>
                    </Paper>
                  }
                  <div className="add-institute__btns">
                    <Button
                      type="submit"
                      disabled={ !!hasAddressError || !!hasInstituteNameError || !isChecked }
                      text={ !!instituteId ? trans('Save') : trans('Add Institute') }
                      loading={ isLoading }
                      disableHoverOnButtonLoader={ true }
                      classname={ (!!hasAddressError || !!hasInstituteNameError || !isChecked) ?'btn-outlined-disabled':'btn-outlined' } />
                  </div>

                </Fragment>
              </form>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ addInstitutesState: {
  isLoading, error, citiesData, fields, isPageLoading, courseData
} }) => ({
  isLoading, error, citiesData, fields, isPageLoading, courseData
});

const mapDispatchToProps = (dispatch) => ({
  addInstitutesData: (fields) => {
    dispatch(addInstitutesData(fields));
  },
  getInstituteById: (id) => {
    dispatch(instituteById(id))
  },
  updateInstituteData: (fields, instituteId) => {
    dispatch(updateInstituteData(fields, instituteId))
  },
  emptyTheStore: () => {
    dispatch(emptyTheStore())
  },
  getCitiesData: () => {
    dispatch(getCitiesData());
  },
  getCourseByProduct: () => {
    dispatch(getCourseByProduct());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddInstitute);
