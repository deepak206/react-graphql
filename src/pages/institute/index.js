import React, { Component } from 'react';
import './institute.scss';
import SimpleTable from '../../views/simple-table';
// import SearchBox from '../../views/search-box';
import Button from '../../views/button';
import history from '../../routes/history';
import { trans } from '../../utils';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import urlChanger from '../../utils/url-changer';
import environment from '../../relay/environment';
import CONSTANTS from '../../constants';
import { breadcrumb } from '../../dispatchers/breadcrumb-action-dispatcher';
import { connect } from 'react-redux';

export class Institute extends Component {
  state = {
    pageId: 0,
    totalCount: 0
  };

  handleClickOpen = () => {
    history.push({
      pathname: `/admin/manage-institutes/AddInstitute`
    });
  };

  query = graphql`
    query institutesQuery($pageId: String, $redordPerPage: Int) {
      institutes(first: $redordPerPage, after: $pageId){
          edges {
            node {
              instituteId
              name
              subscribedLearnersCount
            }
            cursor
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
  `;

  managePageCount = (pageId) => this.setState({ pageId });

  //filterRows = (keyword) => {
  // if (keyword) {
  //   const { rows } = this.state;
  //   const filteredRows = rows.filter((row) => row.institute === keyword);

  //   this.setState({ rows: filteredRows });
  // } else {
  //   this.setState({ rows: rowsData });
  // }
  //};

  handleRowClick = (row) => {
    const breadCrumbObject = {
      breadcrumb: [
        { route: '/admin/manage-institutes', title: 'Manage Accounts' },
        {
          route: encodeURI(`/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId: row.instituteId })}`),
          title: row.name
        }
      ],
      textColor: "#5d5d5d",
      backgroundColor: "#F5F5F5",
      operator: ">",
      fontSize: "14px",
      pageTitle: null,
      descriptionColor: null,
      descriptionFontSize: null
    };

    this.props.breadcrumb(breadCrumbObject);

    history.push(encodeURI(`/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId: row.instituteId })}`));
  }

  editInstitute = (row) => history.push(encodeURI(`/admin/manage-institutes/institute/edit/${urlChanger.encode({ instituteId: row.instituteId })}`));

  renderQuery = ({ error, props }) => {
    const { totalCount } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    } else if (props && props.institutes) {
      const institutes = props.institutes.edges.map((institute) => institute.node);

      if(totalCount !== props.institutes.totalCount) {
        this.setState({ totalCount: props.institutes.totalCount })
      }

      return <SimpleTable
        rows={ institutes }
        titles={ CONSTANTS.INSTITUTES_LIST_TITLES }
        type={ 'institute' }
        totalCount={ props.institutes.totalCount }
        managePageCount={ this.managePageCount }
        redordPerPage={ CONSTANTS.RECORD_PER_PAGE }
        handleRowClick= {
          this.handleRowClick
        }
        actions={
          [
            { type: 'Edit', icon: 'edit', event: this.editInstitute }
          ]
        }
      />;
    }

    return <SimpleTable
      titles={ CONSTANTS.INSTITUTES_LIST_TITLES }
      type={ 'institute' }
      totalCount={ totalCount }
      managePageCount={ this.managePageCount }
      redordPerPage={ CONSTANTS.RECORD_PER_PAGE }
      noRecord={ !(props && !props.institutes) }
    />;
  }

  render() {
    const { pageId } = this.state;

    return (
      <div className="institute-list">
        <div className="institute-list__container">
          <div className="header-container">
            <div>
              <h3 className='header-container__title'>{trans('Manage Accounts')}</h3>
            </div>
            <div className="header-container__sub-header-right">
              {/* <SearchBox title={ searchField } t={ trans } clickHandler={ this.filterRows }/> */}
              <Button classname={ 'btn-outlined' } clickHandler={ this.handleClickOpen } text={ trans('Add Institute') } />
            </div>
          </div>
          <QueryRenderer
            environment={ environment }
            query={ this.query }
            variables={ {
              pageId,
              redordPerPage: CONSTANTS.RECORD_PER_PAGE
            } }
            render={
              this.renderQuery
            }
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumb: (data) => {
    dispatch(breadcrumb(data));
  }
});

export default connect(null, mapDispatchToProps)(Institute);
