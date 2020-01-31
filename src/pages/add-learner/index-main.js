import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '../../views/button';
import InputField from "../../views/input-field";
import SelectBox from "../../views/select-box";
import DatePicker from '../../views/date-picker';
import CheckBox from '../../views/check-box';
import { trans } from '../../utils';
import constants from "../../constants";
import history from '../../routes/history';
import { createGuid } from '../../utils';
import './add-learner.scss';

const courselookup = { course1: "Course A", course2: "Course B", course3: "Course C" };
const sectionlookup = { section1: "Section A", section2: "Section B", section3: "Section C" };
const departmentlookup = { dept1: "Department A", dept2: "Department B", dept3: "Department C" };
const instructorlookup = { instr1: "Instructor A", instr2: "Instructor B", instr3: "Instructor C" };
const learnerlookup = { trial: "Trial", master: "Master", subscribed: "Subscribed" };
const levellookup = { level1: 'Level 1', level2: 'Level 2', level3: 'Level 3' };
const licenselookup = { lic1: 'License 1', lic2: 'License 2', lic3: 'License 3' };

class AddLearner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      fields: {
        course: "course1",
        courseData: courselookup,
        department: "dept1",
        departmentData: departmentlookup,
        email: "",
        enrolmentNo: "",
        expiryDate: "",
        firstName: "",
        instructor: "instr1",
        instructorData: instructorlookup,
        lastName: "",
        learnerData: learnerlookup,
        learnerType: "",
        level: 'level1',
        levelData: levellookup,
        licenseData: licenselookup,
        licenseKey: "",
        loginID: "",
        password: "",
        placementTest: true,
        section: "section1",
        sectionData: sectionlookup,
      },
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
      hasEmailError: true,
      hasEnrolmentNoError: true,
      hasExpiryDateError: true,
      hasFirstNameError: true,
      hasLastNameError: true,
      hasLicenseKeyError: true,
      hasLoginIdError: true,
      hasPasswordError: true,
      isValidate: false,
      open: false,
      placement: null,
    };
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
      pathname: `/admin/manage-accounts`,
    });
  };

  onClickBackHandler = () => {
    history.push({
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${createGuid()}/add-instructors`,
    });
  };

  fileUpload = () => {
    this.fileInput.click();
  }

  fileName = () => {
    return this.fileInput.value
  }

  render() {
    const { EMAIL_REGEX } = constants;

    const {
      fields: { email, enrolmentNo, expiryDate, firstName, lastName, level, levelData, licenseData, licenseKey,
        learnerData, learnerType, department, departmentData, instructor, instructorData, section, sectionData, course, courseData, placementTest },
      isValidate
    } = this.state;

    return (
      <div className="create-learner">
        <div className="create-learner__form">
          <div className="create-learner__bulk-section">
            <h4 className="create-learner__bulk-section__title">{trans('Bulk Upload Learners')}</h4>
            <div className="create-learner__bulk-section--gray-box">{
                            <>
                                <span className="create-learner__bulk-section--dark-green" ><a href="https://go.microsoft.com/fwlink/?LinkID=521962" download>Download</a></span> <span>the excel template, fill learner data and upload the file </span>
                            </>
            }
            </div>
            {trans('Upload an excel file with a list of learners to be added')}
            <div className="create-learner__bulk-section__upload">
              <div className="create-learner__bulk-section__drag-drop">
                {trans('Drag and drop or')}
                <input type="file" id="file-upload" ref={ (fileInput) => this.fileInput = fileInput } onChange={ this.fileName } className="file-upload" />
                <Button text={ trans('BROWSE FILES') } classname={ 'btn-primary' } clickHandler={ (event) => this.fileUpload(event) } />
              </div>
            </div>

            <Grid container >
              <Grid item xs={ 6 } className="create-learner__form-row__input">
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
              </Grid>
            </Grid>
            <div className="create-learner__bulk-section__btn-save">
              <Button type="submit" text={ trans('Save') } classname={ 'btn-primary' } />
            </div>

          </div>
          <div className="create-learner__or">
                        OR
          </div>
          <Grid item xs={ 12 }>
            <Paper className="create-learner__papper add-learner">
              <Typography variant="h4" className="create-learner__papper__heading">
                {trans('Enter Learner Details')}
              </Typography>
              <form noValidate onSubmit={ this.handleSubmit }>
                <div >
                  <Typography className="create-learner__section-title" variant="h5">{trans("Basic Information")}</Typography>
                  <Grid className="create-learner__form-row" container>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("License Key") }
                        name="licenseKey"
                        options={ licenseData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "licenseKey"),
                          value: licenseKey || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
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
                          onChange: this.handleChange.bind(this, "email"),
                          value: email || ""
                        } }
                      />
                    </Grid>

                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <InputField
                        label={ trans("First Name") }
                        name="firstName"
                        validateOptions={ {
                          check: true,
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasFirstNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onChange: this.handleChange.bind(this, "firstName"),
                          value: firstName || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <InputField
                        label={ trans("Last Name") }
                        name="lastName"
                        validateOptions={ {
                          check: true,
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasLastNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onChange: this.handleChange.bind(this, "lastName"),
                          value: lastName || ""
                        } }
                      />
                    </Grid>
                  </Grid>
                  <hr className="create-learner__horizontal-divider"/>
                  <Typography className="create-learner__section-title" variant="h5">{trans("Course Details")}</Typography>
                  <Grid className="create-learner__form-row" container>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Course") }
                        name="course"
                        options={ courseData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "course"),
                          value: course || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Instructor") }
                        name="instructor"
                        options={ instructorData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "instructor"),
                          value: instructor || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Department") }
                        name="department"
                        options={ departmentData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "department"),
                          value: department || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Section") }
                        name="section"
                        options={ sectionData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "section"),
                          value: section || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <InputField
                        label={ trans("Enrollment No. (optional)") }
                        name="enrolmentNo"
                        validateOptions={ {
                          check: true,
                          required: false
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasEnrolmentNoError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onChange: this.handleChange.bind(this, "enrolmentNo"),
                          type: 'number',
                          value: enrolmentNo || ""
                        } }
                      />
                    </Grid>
                  </Grid>
                  <hr className="create-learner__horizontal-divider"/>
                  <Typography className="create-learner__section-title" variant="h5">{trans("Access Type")}</Typography>
                  <Grid className="create-learner__form-row" container>
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
                    {learnerType !== 'subscribed' &&
                      <Grid item xs={ 6 } className="create-learner__form-row__input day-picker expiryDate">
                        <DatePicker
                          label={ trans('Expiry Date') }
                          name="expiryDate"
                          validateOptions={ {
                            check: true,
                            required: true,
                          } }
                          validate={ isValidate }
                          validationCallback={ (res) => this.setState({ hasExpiryDateError: res, isValidate: false }) }
                          fieldAttributes={ {
                            onDayChange: this.handleDateChange.bind(this, 'expiryDate'),
                            value: expiryDate || '',
                          } }
                        />
                      </Grid>
                    }
                    <Grid item xs={ 6 } className="create-learner__form-row__input">
                      <SelectBox
                        label={ trans("Direct Level") }
                        name="level"
                        options={ levelData }
                        showFirstEmpty={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, "level"),
                          value: level || ""
                        } }
                      />
                    </Grid>
                  </Grid>

                  <Grid>
                    <Grid item xs={ 6 } className="create-learner__checkbox-field">
                      <CheckBox id="placementTest"
                        isDisabled={ false }
                        fieldAttributes={ {
                          onChange: this.handleChange.bind(this, 'placementTest'),
                        } }
                        isChecked={ placementTest }
                        label={ trans('Placement Test') } isToggleCheckbox={ false } />
                    </Grid>
                  </Grid>
                </div>
                <Grid container className="create-learner__btn-container">
                  <Button type="submit" text={ trans('Save') } classname={ 'btn-primary' } />
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

export default AddLearner;
