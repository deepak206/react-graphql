import React, { Component } from 'react';
import SimpleTable from '../../views/simple-table';
import Button from '../../views/button';
import history from '../../routes/history';
import { trans } from '../../utils';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import CONSTANTS from '../../constants';
import { DeleteLearnerMutation } from '../../service/mutations/delete-learner-mutation'

import './learner-management.scss';

class LearnerListing extends Component {
  state = {
    pageId: 0,
    totalCount: 0
  };

  handleClickOpen = () => {
    history.push({
      pathname: `/admin/manage-accounts/add-learner`
    });
  };

  managePageCount = (pageId) => this.setState({ pageId });

  handleRowClick = () => null;

  deleteLearner = (row) => {
    const deleteAction = DeleteLearnerMutation(row.email);

    console.log(deleteAction);
  }

  editLearner = (row) => {
    history.push(`/admin/manage-accounts/edit-learner/${this.propsinstituteId}/?email=${row.email}`);
  }

  renderQuery = () => {
    const { totalCount } = this.state;

    const { getInstitute } = this.props;

    if (getInstitute && getInstitute.learners) {
      const learners = getInstitute.learners.edges.map((institute) => institute.node);

      if(totalCount !== getInstitute.learners.totalCount) {
        this.setState({ totalCount: getInstitute.learners.totalCount })
      }

      return <SimpleTable
        rows={ learners }
        titles={ CONSTANTS.LEARNER_LIST_TITLES }
        type={ 'learner' }
        totalCount={ getInstitute.learners.totalCount }
        managePageCount={ this.managePageCount }
        redordPerPage={ CONSTANTS.RECORD_PER_PAGE }
        handleRowClick= {
          this.handleRowClick
        }
        actions={
          [
            { type: 'Delete', icon: 'delete', event: this.deleteLearner },
            { type: 'Edit', icon: 'edit', event: this.editLearner }
          ]
        }
      />;
    }

    return <SimpleTable
      titles={ CONSTANTS.LEARNER_LIST_TITLES }
      type={ 'learner' }
      totalCount={ totalCount }
      managePageCount={ this.managePageCount }
      redordPerPage={ CONSTANTS.RECORD_PER_PAGE }
      noRecord={ false }
    />;
  }

  render() {
    return (
      <div className="learner-management__container">
        <div className="header-container">
          <div>
            <h3 className='header-container__title'>{trans('Learner Management')}</h3>
          </div>
          <div className="header-container__sub-header-right">
            <Button classname={ 'btn-outlined' } clickHandler={ this.handleClickOpen } text={ trans('Add Learner') } />
          </div>
        </div>
        { this.renderQuery() }
      </div>
    );
  }
}

export default createRefetchContainer(
  LearnerListing,
  {
    getInstitute: graphql`
        fragment learnerListing_getInstitute on Institute @argumentDefinitions(first: { type: "Int", defaultValue: 15 }, after: { type: "String", defaultValue: "0" }) {
          learners(first: $first, after: $after) @connection(key: "learnerManagement_learners") {
            edges{
              node{
                id
                firstName
                email
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
          }
        }
      `,
  },
  graphql`
      query learnerListingRefetchQuery {
        getInstitute {
          ...learnerListing_getInstitute
        }
      }
    `
);