/* eslint-disable import/no-dynamic-require */
import React, { Component } from 'react';
import {
  Paper, Grid, Menu, MenuItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '../../assets/images/arrow.svg';
import { trans } from '../../utils';
import SelectBox from '../../views/select-box';
import Button from '../../views/button';
import DeletePopup from '../../views/delete-popup';
import FlashMessage from '../../views/flash-message';
import EditIcon from '../../assets/images/icon-edit.svg';
import DeleteIcon from '../../assets/images/icon-delete.svg';
import ViewIcon from '../../assets/images/icon-view.svg';
import content from './content.json';
import history from '../../routes/history';

// css for Theme course
import './theme-course.scss';

const styles = (theme) => ({
  assignThemeGrid: {
    borderRadius: '5px',
    height: '160px',
    padding: theme.spacing(4),
  },
});

const StyledMenu = withStyles({
  paper: {
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 10px 0 #e5e7ee',
    minHeight: '119px',
    width: '130px',
  },
})((props) => (
  <Menu
    getContentAnchorEl={ null }
    anchorOrigin={ {
      horizontal: 'right',
      vertical: 'bottom',
    } }
    transformOrigin={ {
      horizontal: 'right',
      vertical: 'top',
    } }
    { ...props }
  />
));

const AssignThemeGrid = withStyles(styles)((props) => {
  const { children, classes, fieldAttr } = props;

  return (
    <div className={ classes.assignThemeGrid } { ...fieldAttr } >
      { children }
    </div>
  );
});

export class ThemeCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fields: {
        modules: '',
        theme: 0,
      },
      isFlashVisible: false,
      isPopupOpen: false,
      isSaveButtonHidden: true,
    };
  }

  handleSuccess = (isFlashVisible) => {
    this.setState({ isFlashVisible });
  }

  handleDeletePopup = (isPopupOpen) => {
    this.setState({ anchorEl: null, isPopupOpen });
  }

  handleActionClick = (anchorEl) => {
    this.setState({ anchorEl });
  }

  handleChange = (event, field) => {
    const { target } = event;
    const { fields } = this.state;

    if (field === 'modules') {
      this.setState({ isSaveButtonHidden: !target.value });
    }

    fields[field] = target.value;
    this.setState({ fields });
  }

  getBack = () => {
    const { match: { params } } = this.props;

    history.push({
      courseData: this.props.location.courseData !== undefined ? this.props.location.courseData : null,
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/selected-course`,
    });
  }

  onClickDoneHandler = () => {
    const { match: { params } } = this.props;

    history.push({
      courseData: this.props.location.courseData !== undefined ? this.props.location.courseData : null,
      details: { organization: this.state.groupTitle },
      pathname: `/admin/manage-accounts/${params.institueId}/selected-course`,
    });
  }

  render() {
    const {
      anchorEl, isPopupOpen, fields: { modules, theme }, isFlashVisible, isSaveButtonHidden,
    } = this.state;

    return (
      <div className="course-theme">
        <div className="course-theme-header">
          <div className="course-theme-header-breadcrumb">
            <img alt='arrow'
              onClick={ this.getBack }
              src={ ArrowBackIcon }
              className="course-theme-header-breadcrumb__img"
            />
            {trans('Course Management')}
          </div>
        </div>
        <div className="course-theme-content">
          <div className="course-theme-content-form">
            <div className="form-level">
              <Grid item xs={ 12 }>
                <Paper className="form-level-papper">
                  <div className="form-level-papper__heading">
                    {trans('Level 1')}
                  </div>
                  <form>
                    <Grid container
                      spacing={ 3 }
                      className="form-level-papper-form">
                      <Grid item xs={ 9 } className="form-level-papper-form__select">
                        <SelectBox
                          label={ trans('Module') }
                          name="modules"
                          showFirstEmpty={ true }
                          options={ { 1: 'Module 1', 2: 'Module 2', 3: 'Module 3' } }
                          fieldAttributes={ {
                            onChange: (e) => this.handleChange(e, 'modules'),
                            value: modules || '',
                          } }
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </div>
            { modules &&
                <div className="form-module">
                  <Grid item xs={ 12 }>
                    <Paper className="form-module-papper">
                      <Grid container
                        spacing={ 3 }
                        className="form-module-papper-form">
                        <Grid item xs={ 9 } className="form-module-papper-form__select">
                          <SelectBox
                            label={ trans('Assign Theme') }
                            name="assign-theme"
                            options={ [ 'Introducing self before the class' ] }
                            fieldAttributes={ {
                              onChange: (e) => this.handleChange(e, 'theme'),
                              value: theme || '',
                            } }
                          />
                        </Grid>
                      </Grid>
                      <div className="form-module-papper-tasks">
                        <label className="form-module-papper-tasks__label">{ trans('Manage Tasks') }</label>
                        <Grid container spacing={ 4 }>
                          { content.assignTheme.map((value, index) => (
                            <Grid item xs={ 12 } sm={ 6 } key={ index }
                              className="form-module-papper-tasks-items">
                              <AssignThemeGrid fieldAttr={ { style: { backgroundColor: `${value.color}` } } }>
                                <div
                                  className="form-module-papper-tasks-items__action"
                                  onClick={ (event) => this.handleActionClick(event.currentTarget) }>
                                  <img alt='arrow'  src={ require('../../assets/images/theme-course/action-bar.svg') } />
                                </div>
                                <div
                                  className="form-module-papper-tasks-items__heading">
                                  { value.heading }
                                </div>
                                <div className="form-module-papper-tasks-items__description">
                                  <p>{ value.content }</p>
                                </div>
                                <div className="form-module-papper-tasks-items__icon">
                                  <img alt='arrow'  src={ require(`../../assets/images/theme-course/${value.image}`) } />
                                </div>
                              </AssignThemeGrid>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                      <Button
                        type="submit"
                        classname="form-module-papper__action btn-primary"
                        clickHandler={ () => this.handleSuccess(true) } text={ trans('Save') }
                      />
                    </Paper>
                  </Grid>
                </div>
            }
            <StyledMenu
              id="customized-menu"
              className="course-theme-action-menu"
              anchorEl={ anchorEl }
              keepMounted open={ Boolean(anchorEl) }
              onClose={ () => this.handleActionClick(null) }>
              <MenuItem className="course-theme-action-menu__item" >
                <ListItemIcon className="course-theme-action-menu__item-icon">
                  <img alt='arrow'  src={ ViewIcon } />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={ <span type="span" className='course-theme-action-menu__item-text'>{ trans('View') }</span> }
                />
              </MenuItem>
              <MenuItem className="course-theme-action-menu__item">
                <ListItemIcon className="course-theme-action-menu__item-icon">
                  <img alt='arrow'  src={ EditIcon } />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={ <span type="span" className='course-theme-action-menu__item-text'>{ trans('Edit') }</span> }
                />
              </MenuItem>
              <MenuItem className="course-theme-action-menu__item" onClick={ () => this.handleDeletePopup(true) }>
                <ListItemIcon className="course-theme-action-menu__item-icon">
                  <img alt='arrow'  src={ DeleteIcon } />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={ <span type="span" className='course-theme-action-menu__item-text'>{ trans('Delete') }</span> }
                />
              </MenuItem>
            </StyledMenu>
            <FlashMessage
              isFlashVisible={ isFlashVisible }
              isSuccessMessage={ true }
              callbackIsFlash={ () => this.handleSuccess(false) }/>
            <DeletePopup
              open={ isPopupOpen }
              handleClose={ () => this.handleDeletePopup(false) }
              title={ trans('Delete Reading') }
              description={ trans('Are you sure you want to delete this task?') }
              handleDelete={ () => this.handleDeletePopup(false) } />
          </div>
          { !isSaveButtonHidden &&
            <div className="course-theme-content-action">
              <Button
                text={ trans('Done') }
                classname={ 'btn-outlined' }
                clickHandler= { this.onClickDoneHandler }
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ThemeCourse;
