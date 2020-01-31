import React, { Component, Fragment } from 'react';
import { formatDate } from 'react-day-picker/moment';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './view-license.scss';
import crossIcon from '../../assets/images/icon-cross.svg';
import { trans } from '../../utils';
import history from '../../routes/history';
import DeletePopup from '../../views/delete-popup';
import { createGuid } from '../../utils';

class ViewLicense extends Component {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
      selectedLicenseKey: null,
    }
  }

  editLicense = (listItem) => {
    const { params } = this.props;

    history.push({ details: listItem, pathname: `/admin/manage-accounts/${params.institueId}/edit-license/${createGuid()}` });
  };

  handleDeletePopup = (isPopupOpen, key) => {
    this.setState({ anchorEl: null, isPopupOpen, selectedLicenseKey: key });
  }

  handleDelete = () => {
    const { rows } = this.props;
    const { selectedLicenseKey } = this.state;

    rows.splice(selectedLicenseKey, 1);
    this.setState({ anchorEl: null, isPopupOpen: false });
  }

  render() {
    const { rows } = this.props;
    const { isPopupOpen } = this.state;
    const titles = [ trans('License Key'), trans('No. of Licenses'), trans('Start Date'), trans('End Date'), trans('Course') ];

    return (
      <ExpansionPanel defaultExpanded className="license-list">
        <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> } className="license-list__summary">
          <Typography variant="h4" className="license-list__heading">
            {trans('License Batch Added')} ({rows ? rows.length : 0})
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="license-list__expansion-detail">
          {rows
            ? rows.map((item, key) => (
              <div key={ item.licenseKey }>
                <div>
                  <div className="license-list__list-section">
                    <div className="license-list__close" onClick={ () => this.handleDeletePopup(true, key) }>
                      <img className="license-list__close__remove-icon" src={ crossIcon } alt={ 'remove' } />
                    </div>
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                      <tbody>
                        <tr>
                          {titles.map((title, titleKey) =>
                            !titleKey ? (
                              <Fragment>
                                <th rowSpan="2" align="left" valign="middle">
                                  <label>{key + 1}</label>
                                </th>
                                <th>
                                  <label key={ title }>{title}</label>
                                </th>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <th>
                                  <label key={ title }>{title}</label>
                                </th>
                              </Fragment>
                            ),
                          )}
                          <th rowSpan="2" align="left" valign="middle">
                            <div className="license-list__edit-link" onClick={ () => this.editLicense(item) }>
                              {trans('Edit')}
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <td>
                            <div className="label-name">{item.licenseKey}</div>
                          </td>
                          <td>
                            <div className="label-name">{item.licenseCount}</div>
                          </td>
                          <td>
                            <div className="label-name">{formatDate(item.startDate, 'DD/MM/YYYY')}</div>
                          </td>
                          <td>
                            <div className="label-name">{formatDate(item.endDate, 'DD/MM/YYYY')}</div>
                          </td>
                          <td>
                            <div className="label-name">{item.courseName}</div>
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
            title={ trans('Delete License Batch') }
            description={ trans('Are you sure you want to delete this license batch?') }
            trans={ trans }
            handleDelete={ () => this.handleDelete(false) } />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ViewLicense;
