import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '../../views/button';
import { connect } from 'react-redux';
import InputField from "../../views/input-field";
import validate from '../../utils/validate';
import SelectBox from "../../views/select-box";
import urlChanger from '../../utils/url-changer';
import PasswordField from '../../views/password-field';
import { poperConfig, trans } from '../../utils';
import { addLearnerData } from '../../dispatchers/add-learner-action-dispatcher'
import constants from "../../constants";
import history from '../../routes/history';
import './add-learner.scss';
import { getInstituteNameById } from '../../dispatchers/add-institutes-action-dispatcher';
import { breadcrumb } from '../../dispatchers/breadcrumb-action-dispatcher';
import Popper from '../../views/popper';
const learnerlookup = { master: "Master" };

class AddLearner extends Component {
  constructor(props) {
    super(props);
    let instituteId = '';

    const { match: { params: { params } } } = props;

    if (params) {
      // decode the url params
      // eslint-disable-next-line prefer-destructuring
      instituteId = urlChanger.decode(params).instituteId;
    }

    this.state = {
      anchorEl: null,
      instituteId,
      fields: {
        email: "",
        firstName: "",
        lastName: "",
        learnerData: learnerlookup,
        learnerType: "master",
        licenseKey: "License",
        loginID: "",
        productId: "",
        password: "",
        placementTest: true,
      },
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
      hasEmailError: true,
      hasFirstNameError: true,
      hasLastNameError: true,
      hasLicenseKeyError: true,
      hasLoginIdError: true,
      hasPasswordError: true,
      isValidate: false,
      open: false,
      isReadOnly:true,
      placement: null,
      loading: false,
      progress: 0,
    };
  }

  componentWillUnmount = () => {
    this.props.breadcrumb({});
  }

  componentDidMount = () => {
    const { breadcrumbsData } = this.props;
    const { instituteId } = this.state;

    if (!breadcrumbsData.breadcrumb) {
      this.props.getInstitute(instituteId, "add-learner");
    }
  }

  saveUserData = () => {
    const { instituteId } = this.state;

    const { hasEmailError, hasFirstNameError, hasLastNameError, fields, hasPasswordError } = this.state;
    const { LEARNER_PRODUCT_IDENTIFIER } = constants;

    fields.productId = LEARNER_PRODUCT_IDENTIFIER;

    if (!hasEmailError && !hasFirstNameError && !hasLastNameError && !hasPasswordError) {
      this.props.addLearnerData(fields, instituteId);
    }

  }

  handleChange(field, e) {
    const { target } = e;
    const { fields } = this.state;

    if (field === 'placementTest') {
      fields.placementTest = !fields.placementTest
      fields[field] = fields.placementTest;
    }
    else {
      fields[field] = target.value;
    }

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
  };

  onClickHandler = () => true;
  onClickNextHandler = () => {
    history.push({
      pathname: `/admin/manage-institutes`,
    });
  };
  handleClick=(event) => {
    this.setState({isReadOnly:false})
  }

  handlePasswordChange = (field, e) => {
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
    }
  }

  onClickBackHandler = () => {
    const { match: { params: { params } } } = this.props

    history.push({
      pathname: `/admin/manage-institutes/institute/manage-learner/list/${params}`,
    });
  };

  onClickArrowHandler = () => {
    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/`
    })
  }

  render() {
    const { EMAIL_REGEX, ALPHA_REGEX } = constants;

    const {
      fields: { email, firstName, lastName, learnerData, learnerType, password }, isValidate, anchorEl,
      open,
      placement,
      isReadOnly
    } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="create-learner">
        <Popper
          open={ open }
          anchorEl={ anchorEl }
          placement={ placement }
          poperConfig={ poperConfig(password) } />
        <div className="create-learner__form">
          <Grid item xs={ 12 }>
            <Paper className="create-learner__papper add-learner">
              <Typography variant="h4" className="create-learner__papper__heading">
                {trans('Enter Learner Details')}
              </Typography>
              <form noValidate onSubmit={ this.handleSubmit } >
                <div >
                  <Typography className="create-learner__section-title" variant="h5">{trans("Basic Information")}</Typography>
                  <Grid className="create-learner__form-row" container>
                    {/* <Grid item xs={ 6 } className="create-learner__form-row__input">
                        <InputField

                          label={ trans("License Key") }
                          name="licenseKey"
                          fieldAttributes={
                            {
                              readOnly: true,
                              disabled: true,
                              value: licenseKey
                            } }
                          validationCallback={ (res) => this.setState({ hasEmailError: res, isValidate: false }) }
                          classname="licenseKey"
                        />

                      </Grid> */}
                    <Grid item xs={6} className="create-learner__form-row__input">
                      <InputField
                        label={ trans("Email") }
                        name="email"
                        validateOptions={ {
                          check: true,
                          reg: EMAIL_REGEX,
                          regMsg: trans("Please enter a valid email address"),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasEmailError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onClick:this.handleClick.bind(this),
                          onFocus:this.handleClick.bind(this),
                          readOnly: isReadOnly,
                          onChange: this.handleChange.bind(this, "email"),
                          value: email || ""
                        } }
                      />
                      {/* <input type="text" name="email" autoComplete="user-password" style={{ display: "none" }}></input> */}
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Learner Type") }
                        name="learnerType"
                        options={ learnerData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "learnerType"),
                          value: learnerType || ""
                        } }
                      />
                    </Grid>

                    <Grid item xs={6} className="create-learner__form-row__input">
                      {/* <input type="text" name="firstName" autoComplete="user-password" style={{ display: "none" }}></input> */}
                      <InputField
                        label={ trans("First Name") }
                        name="firstName"
                        validateOptions={ {
                          check: true,
                          reg: ALPHA_REGEX,
                          regMsg: ("Numbers and special characters are not allowed."),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasFirstNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          maxLength: 40,
                          onClick:this.handleClick.bind(this),
                          onFocus:this.handleClick.bind(this),
                          readOnly: isReadOnly,
                          onChange: this.handleChange.bind(this, "firstName"),
                          value: firstName || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={6} className="create-learner__form-row__input">
                      <InputField
                        label={ trans("Last Name") }
                        name="lastName"
                        validateOptions={ {
                          check: true,
                          reg: ALPHA_REGEX,
                          regMsg: ("Numbers and special characters are not allowed."),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasLastNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          maxLength: 40,
                          onClick:this.handleClick.bind(this),
                          onFocus:this.handleClick.bind(this),
                          readOnly: isReadOnly,
                          onChange: this.handleChange.bind(this, "lastName"),
                          value: lastName || ""
                        } }
                      />
                      {/* <input type="text" name="lastName" autoComplete="user-password" style={{ display: "none" }}></input> */}
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      {/* <input type="password" name="password" autoComplete="user-password" style={ { display: "none" } }></input> */}
                      <PasswordField
                        label={ trans('Password') }
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
                            onChange: this.handlePasswordChange.bind(this, 'password'),
                            onFocus:this.handleClick.bind(this),
                            onClick:this.handleClick.bind(this),
                            readOnly: isReadOnly,
                            type: 'password',
                            value: password || '',
                          }
                        }
                      />
                    </Grid>
                  </Grid>

                </div>
                <Grid container className="create-learner__btn-container">
                  <Button type="submit" text={ trans('Save') } classname={ 'btn-primary' } loading={ isLoading } clickHandler={ this.saveUserData } />
                </Grid>
              </form>
            </Paper>
          </Grid>
          <div className="create-learner__btns">
            <Button text={ trans('Back') } classname={ 'btn-back' } clickHandler={ this.onClickBackHandler } />
            <Button text={ trans('next') } classname={ 'btn-outlined' } clickHandler={ this.onClickNextHandler } />
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ addLearnerState: { isLoading, error }, breadcrumbsState: { breadcrumbsData } }) => ({ isLoading, error, breadcrumbsData });

const mapDispatchToProps = (dispatch) => ({
  addLearnerData: (fields, instituteId) => {
    dispatch(addLearnerData(fields, instituteId));
  },
  getInstitute: (id, type) => {
    dispatch(getInstituteNameById(id, type));
  },
  breadcrumb: (data) => {
    dispatch(breadcrumb(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLearner);
