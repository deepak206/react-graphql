import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '../../views/button';
import { connect } from 'react-redux';
import InputField from "../../views/input-field";
import urlChanger from '../../utils/url-changer';
import LinearProgressBar from '../../views/loader/linear-progress-bar'
import SelectBox from "../../views/select-box";
import { trans } from '../../utils';
import { getLearnerData } from "../../service/get-learner-data.service";
import { editLearnerData } from '../../dispatchers/edit-learner-action-dispatcher'
import constants from "../../constants";
import { getInstituteNameById } from '../../dispatchers/add-institutes-action-dispatcher';
import history from '../../routes/history';
import './edit-learner.scss';
import { breadcrumb } from '../../dispatchers/breadcrumb-action-dispatcher';

const learnerlookup = { master: "Master" };

class EditLearner extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { params } } } = props;

    const { instituteId, learnerId } = urlChanger.decode(params);

    this.state = {
      anchorEl: null,
      instituteId,
      learnerId,
      fields: {
        firstName: "",
        lastName: "",
        email: "",
        learnerData: learnerlookup,
        learnerType: "master",
        loginID: "",
        password: "",
      },
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
      hasEmailError: true,
      hasFirstNameError: false,
      hasLastNameError: false,
      hasLicenseKeyError: true,
      hasLoginIdError: true,
      hasPasswordError: true,
      isValidate: false,
      open: false,
      placement: null,
      loading: false,
      loader: true,
      progress: 0,
    };
  }

  componentDidMount() {
    const { breadcrumbsData } = this.props;

    const { instituteId, learnerId } = this.state;

    if (!breadcrumbsData.breadcrumb) {
      this.props.getInstitute(instituteId, "edit-learner");
    }
    getLearnerData(learnerId).then((res) => {
      this.setState({
        fields: { firstName: res.learner.firstName, lastName: res.learner.lastName, learnerType: "master", email: res.learner.email, learnerData: learnerlookup },
        loader: false
      })
    })
      .catch((error) => {
        history.push({
          pathname: `/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId })}`,
        });
      });

  }

  componentWillUnmount = () => {
    this.props.breadcrumb({});
  }

  saveUserData = () => {
    const { fields, hasFirstNameError, hasLastNameError, instituteId, learnerId } = this.state;
    if (!hasLastNameError && !hasFirstNameError && fields.firstName && fields.lastName) {
      this.props.editLearnerData(learnerId, fields, instituteId);
    }
    else {
      this.setState({ isValidate: true })
    }

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
    event.preventDefault();
    this.toggleValidating(true);
  };

  onClickHandler = () => true;

  onClickBackHandler = () => {
    const { instituteId } = this.state;

    history.push({
      pathname: `/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId })}`,
    });
  };

  render() {

    const { EMAIL_REGEX, ALPHA_REGEX } = constants;
    const {
      fields: { firstName, lastName, learnerData, learnerType, email }, isValidate, loader
    } = this.state;
    // const { licenseKey }=this.props;
    const { isLoading } = this.props;

    return (
      <div className="edit-learner">
        {/* <div className="edit-learner__breadcrumb">
          <h3 className="edit-learner__breadcrumb-section__title">
            <img src={ArrowBackIcon} alt={trans('Back')}
              className="edit-learner__breadcrumb-section__side-arrow" onClick={this.onClickBackHandler} />
            {trans('Learner Management')}
          </h3>
        </div> */}
        {(!loader) ?
          (<div className="edit-learner__form">
            <Grid item xs={12}>
              <Paper className="edit-learner__papper add-learner">
                <Typography variant="h4" className="edit-learner__papper__heading">
                  {trans('Edit Learner')}
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <div >
                    <Typography className="edit-learner__section-title" variant="h5">{trans("Basic Information")}</Typography>
                    <Grid className="edit-learner__form-row" container>
                      {/* <Grid item xs={6} className="edit-learner__form-row__input">
                  <InputField

                    label={trans("License Key")}
                    name="licenseKey"
                    fieldAttributes={
                      {
                        readOnly: true,
                        disabled: true,
                        value: licenseKey ||"PB1234562"
                      }}
                    validationCallback={(res) => this.setState({ hasEmailError: res, isValidate: false })}
                    classname="disabled"
                  />

                </Grid> */}
                      <Grid item xs={6} className="edit-learner__form-row__input">
                        <InputField
                          label={trans("Email")}
                          name="email"
                          validateOptions={{
                            check: true,
                            reg: EMAIL_REGEX,
                            regMsg: trans("Please enter a valid email address"),
                            required: true
                          }}
                          // validate={isValidate}
                          validationCallback={(res) => this.setState({ hasEmailError: res, isValidate: false })}
                          fieldAttributes={{
                            autoComplete: "off",
                            readOnly: true,
                            disabled: true,
                            value: email || ""
                          }}
                          classname="disabled"
                        />
                      </Grid>
                      <Grid item xs={6} className="edit-learner__form-row__input">
                        <SelectBox
                          label={trans("Learner Type")}
                          name="learnerType"
                          options={learnerData}
                          showFirstEmpty={false}
                          fieldAttributes={{
                            onChange: this.handleChange.bind(this, "learnerType"),
                            value: learnerType || ""
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} className="edit-learner__form-row__input">
                        <InputField
                          label={trans("First Name")}
                          name="firstName"
                          validateOptions={{
                            check: true,
                            reg: ALPHA_REGEX,
                            regMsg: ("Numbers and special characters are not allowed."),
                            required: true
                          }}
                          validate={isValidate}
                          validationCallback={(res) => this.setState({ hasFirstNameError: res, isValidate: false })}
                          fieldAttributes={{
                            autoComplete: "off",
                            maxLength: 40,
                            onChange: this.handleChange.bind(this, "firstName"),
                            value: firstName || ""
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} className="edit-learner__form-row__input">
                        <InputField
                          label={trans("Last Name")}
                          name="lastName"
                          validateOptions={{
                            check: true,
                            reg: ALPHA_REGEX,
                            regMsg: ("Numbers and special characters are not allowed."),
                            required: true
                          }}
                          validate={isValidate}
                          validationCallback={(res) => this.setState({ hasLastNameError: res, isValidate: false })}
                          fieldAttributes={{
                            autoComplete: "off",
                            maxLength: 40,
                            onChange: this.handleChange.bind(this, "lastName"),
                            value: lastName || ""
                          }}
                        />
                      </Grid>
                    </Grid>

                  </div>
                </form>
              </Paper>
            </Grid>
            <div className="edit-learner__btns">
              <Button text={trans('Cancel')} classname={'btn-cancel'} clickHandler={this.onClickBackHandler} />
              <Button text={trans('Save')} classname={'btn-outlined'} disableHoverOnButtonLoader={true} loading={isLoading} clickHandler={this.saveUserData} />
            </div>
          </div>) : (
            <div className="edit-learner__progress-bar">
              <LinearProgressBar />
            </div>
          )
        }
      </div>

    );
  }
}

const mapStateToProps = ({ EditLearnerState: { isLoading, error }, breadcrumbsState: { breadcrumbsData } }) => ({ isLoading, error, breadcrumbsData });

const mapDispatchToProps = (dispatch) => ({
  editLearnerData: (learnerId, fields, instituteId) => {
    dispatch(editLearnerData(learnerId, fields, instituteId));
  },
  getInstitute: (id, type) => {
    dispatch(getInstituteNameById(id, type));
  },
  breadcrumb: (data) => {
    dispatch(breadcrumb(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLearner);
