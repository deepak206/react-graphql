import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Button from '../../views/button';
import InputField from '../../views/input-field';
import Popper from '../../views/popper';
import PasswordField from '../../views/password-field';
import SelectBox from '../../views/select-box';
import validate from '../../utils/validate';
import { poperConfig, trans } from '../../utils';
import constants from '../../constants';
import ViewInstructor from "../view-instructor";
import './addInstructor.scss';
import history from '../../routes/history';
import { createGuid } from '../../utils';

const courselookup = { course1: "Course A", course2: "Course B", course3: "Course C" };
const sectionlookup = { section1: "Section A", section2: "Section B", section3: "Section C" };
const departmentlookup = { dept1: "Department A", dept2: "Department B", dept3: "Department C" };

export class AddInstructor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      fields: {
        course: "course1",
        courseData: courselookup,
        department: "dept1",
        departmentData: departmentlookup,
        firstName: "",
        lastName: "",
        loginID: "",
        password: "",
        section: "section1",
        sectionData: sectionlookup
      },
      groupTitle: "details" in props.location ? props.location.details.organization : "",
      hasFirstNameError: true,
      hasLastNameError: true,
      hasLoginIdError: true,
      hasPasswordError: true,
      isPassHintOpen: false,
      isValidate: false,
      open: false,
      placement: null,
      rows: []
    };
  }

  handleChange(field, e) {
    const { currentTarget, target } = e;
    const { fields } = this.state;

    if (field === "password") {
      fields[field] = target.value;

      this.setState(() => ({
        anchorEl: currentTarget,
        fields,
        isPassHintOpen: validate.checkPassword(fields[field]).status,
        placement: "right"
      }));
    }

    fields[field] = target.value;
    this.setState({ fields });
  }

  toggleValidating(isValidate) {
    this.setState({ isValidate });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleValidating(true);
    const { hasFirstNameError, hasLastNameError, hasLoginIdError, hasPasswordError } = this.state;

    if (!hasFirstNameError && !hasLastNameError && !hasLoginIdError && !hasPasswordError) {
      const { rows, fields } = this.state;

      const updatedRows = [ ...rows, { ...fields } ];

      this.setState({
        fields: {
          course: "course1",
          courseData: courselookup,
          department: "dept1",
          departmentData: departmentlookup,
          firstName: "",
          lastName: "",
          loginID: "",
          password: "",
          section: "section1",
          sectionData: sectionlookup
        },
        hasFirstNameError: true,
        hasLastNameError: true,
        hasLoginIdError: true,
        hasPasswordError: true,
        isValidate: false,
        open: false,
        rows: updatedRows
      });
    }
  };

  onClickHandler = () => true;
  onClickNextHandler = () => {
    history.push({
      details: { organization: this.state.groupTitle },
      institute: "Test",
      pathname: `/admin/manage-accounts/${createGuid()}/add-learners`
    });
  };

  onClickBackHandler = () => {
    history.push({
      details: { organization: this.state.groupTitle },
      institute: "Test",
      pathname: `/admin/manage-accounts/${createGuid()}/create-license`
    });
  };

  render() {
    const { EMAIL_REGEX, ALPHA_NUMERIC_REGEX } = constants;

    const {
      fields: {
        firstName, lastName, loginID, password, department, departmentData, section, sectionData, course, courseData,
      },
      anchorEl,
      placement,
      rows,
      isPassHintOpen,
      isValidate
    } = this.state;

    const {
      location: { details }, match: { params }
    } = this.props;

    return (
      <div className="create-Instructor">
        <Popper open={ isPassHintOpen }anchorEl={ anchorEl } placement={ placement } poperConfig={ poperConfig(password) } />
        <div className="create-Instructor__content">
          {rows.length > 0 && <ViewInstructor rows={ rows } institueId={ params.institueId }/>}
          <Grid item xs={ 12 }>
            <Paper className="create-Instructor__papper">
              <Typography variant="h4" className="create-Instructor__papper__heading">
                {trans("Add Instructors")}
              </Typography>
              <form noValidate onSubmit={ this.handleSubmit }>
                <div>
                  <Typography className="create-Instructor__sub-title" variant="h5">{trans("Basic Information")}</Typography>
                  <Grid container className="create-Instructor__form-row">
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
                      <InputField
                        label={ trans("First Name") }
                        name="firstName"
                        validateOptions={ {
                          check: true,
                          reg: ALPHA_NUMERIC_REGEX,
                          regMsg: trans('First Name should be alphanumeric'),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasFirstNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          maxLength: 100,
                          onChange: this.handleChange.bind(this, "firstName"),
                          value: firstName || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
                      <InputField
                        label={ trans("Last Name") }
                        name="lastName"
                        validateOptions={ {
                          check: true,
                          reg: ALPHA_NUMERIC_REGEX,
                          regMsg: trans('Last Name should be alphanumeric'),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasLastNameError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          maxlenght: 100,
                          onChange: this.handleChange.bind(this, "lastName"),
                          value: lastName || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
                      <InputField
                        label={ trans("Login ID") }
                        name="loginID"
                        validateOptions={ {
                          check: true,
                          reg: EMAIL_REGEX,
                          regMsg: trans("Please enter a valid email address"),
                          required: true
                        } }
                        validate={ isValidate }
                        validationCallback={ (res) => this.setState({ hasLoginIdError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onChange: this.handleChange.bind(this, "loginID"),
                          value: loginID || ""
                        } }
                      />
                    </Grid>
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
                      <PasswordField
                        label={ trans(" Password") }
                        name="password"
                        strengthPop= { isPassHintOpen }
                        validate={ isValidate }
                        validateOptions={ {
                          check: true,
                          passwordCheck: true,
                          required: true
                        } }
                        onFocusOut={ (res) => this.setState({ isPassHintOpen: res }) }
                        validationCallback={ (res) => this.setState({ hasPasswordError: res, isValidate: false }) }
                        fieldAttributes={ {
                          autoComplete: "off",
                          onBlur: () => this.setState({ isPassHintOpen: false }),
                          onChange: this.handleChange.bind(this, "password"),
                          type: "password",
                          value: password || ""
                        } }
                      />
                    </Grid>
                  </Grid>
                  <hr className="create-Instructor__horizontal-divider"/>
                  <Typography className="create-Instructor__sub-title" variant="h5">{trans("Course Details")}</Typography>
                  <Grid container className="create-Instructor__form-row">
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
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
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
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
                    <Grid item xs={ 6 } className="create-Instructor__form-row__input">
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
                  </Grid>
                </div>
                <Grid container className="create-Instructor__btn-container">
                  <Button type="submit" text={ trans("Save") } classname={ "btn-primary" } />
                </Grid>
              </form>
            </Paper>
          </Grid>
        </div>
        <div className="create-Instructor__btns">
          <Button text={ trans("Back") } classname={ "btn-back" } clickHandler={ this.onClickBackHandler } />
          <Button text={ trans("next") } classname={ "btn-outlined" } clickHandler={ this.onClickNextHandler } />
        </div>
      </div>

    );
  }
}

export default AddInstructor;
