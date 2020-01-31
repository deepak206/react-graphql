
import React, { Component, Fragment } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './view-instructor.scss';
import DeletePopup from '../../views/delete-popup';
import crossIcon from '../../assets/images/icon-cross.svg';
import { trans } from '../../utils';
import history from '../../routes/history';
import { createGuid } from '../../utils';

const courselookup = { course1: 'Course A', course2: 'Course B', course3: 'Course C' };

class ViewInstructor extends Component {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
      selectedInstructorKey: null,
    }
  }

  editInstructor = (listItem) => {
    const { institueId } = this.props;

    history.push({ details: listItem, pathname: `/admin/manage-accounts/${institueId}/edit-instructor/${createGuid()}` });
  };

  handleDeletePopup = (isPopupOpen, key) => {
    this.setState({ anchorEl: null, isPopupOpen, selectedInstructorKey: key });
  }

  handleDelete = () => {
    const { rows } = this.props;
    const { selectedInstructorKey } = this.state;

    rows.splice(selectedInstructorKey, 1);
    this.setState({ anchorEl: null, isPopupOpen: false });
  }

  render() {
    const { rows } = this.props;
    const { isPopupOpen } = this.state;
    const titles = [ trans('Name'), trans('Login ID'), trans('Course') ];

    return (
      <ExpansionPanel defaultExpanded className="instructor-list">
        <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> } className="instructor-list__summary">
          <Typography variant="h4" className="instructor-list__summary__heading">
            {trans('Instructors Added')} ({rows.length})
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="instructor-list__detail">
          {rows
            ? rows.map((item, key) => (
              <div>
                <div>
                  <div className="instructor-list__list-section">
                    <div className="instructor-list__close" >
                      <img className="instructor-list__close__remove-icon" src={ crossIcon } alt={ trans('Remove') } onClick={ ()=>this.handleDeletePopup(true,key) }/>
                    </div>
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                      <tbody>
                        <tr>
                          {titles.map((title, titleKey) =>
                            !titleKey ? (
                              <Fragment key={ titleKey }>
                                <th rowSpan="2" align="left" valign="middle">
                                  <label key={ titleKey }>{key + 1}</label>
                                </th>
                                <th className="first-col">
                                  <label key={ titleKey }>{title}</label>
                                </th>
                              </Fragment>
                            ) : (
                              <Fragment key={ key }>
                                <th className="second-col">
                                  <label key={ key + 1 }>{title}</label>
                                </th>
                              </Fragment>
                            ),
                          )}
                          <th rowSpan="2" align="left" valign="middle">
                            <div className="instructor-list__edit" onClick={ () => this.editInstructor(item) }>
                              {trans('Edit')}
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <td className="first-col">
                            <div className="label-name">{item.firstName} {item.lastName}</div>
                          </td>
                          <td>
                            <div className="label-name">{item.loginID}</div>
                          </td>
                          <td>
                            <div className="label-name">{courselookup[item.course]}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
            : ''}

          <DeletePopup
            open={ isPopupOpen }
            handleClose={ () => this.handleDeletePopup(false) }
            title={ trans('Delete Instructor') }
            description={ trans('Are you sure you want to delete this instructor?') }
            trans={ trans }
            handleDelete={ () => this.handleDelete(false) } />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ViewInstructor;
