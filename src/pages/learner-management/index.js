import React, { Component } from 'react';
import SimpleTable from '../../views/simple-table';
import Button from '../../views/button';
import history from '../../routes/history';
import { trans } from '../../utils';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import urlChanger from '../../utils/url-changer';
import environment from '../../relay/environment';
import CONSTANTS from '../../constants';
import DeletePopup from '../../views/delete-popup';
import { deleteLearnerData } from '../../dispatchers/delete-learner-action-dispatcher';
import { getInstituteNameById } from '../../dispatchers/add-institutes-action-dispatcher';
import { breadcrumb } from '../../dispatchers/breadcrumb-action-dispatcher';

import { connect } from 'react-redux';

import './learner-management.scss';

export class LearnerManagement extends Component {
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
      instituteId,
      pageId: 0,
      totalCount: 0,
      listUpdated: false,
      isPopupOpen: false,
      row: {},
      isLoading: false
    };
  }

  componentDidMount = () => {
    const { breadcrumbsData } = this.props;

    const { instituteId } = this.state;

    if(!breadcrumbsData.breadcrumb) {
      this.props.getInstitute(instituteId, "learner-listing");
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { errors, isLoading } = this.props;

    if(prevProps.lastHit !== this.props.lastHit) {
      if(!errors && !isLoading) {
        // this.setState({ listUpdated: !this.state.listUpdated, isPopupOpen: false, row: {},  isLoading: false });
        this.setState({ listUpdated: !this.state.listUpdated, row: {} });
      } else {
        this.setState({ isPopupOpen: false, row: {},  isLoading: false });
      }
    }
  }

  handleClickOpen = () => {
    const { breadcrumbsData } = this.props;

    const { instituteId } = this.state;

    const breadCrumbObject = {
      breadcrumb: [
        { route: '/admin/manage-institutes', title: 'Manage Accounts' },
        {
          route: encodeURI(`/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId })}`),
          title: breadcrumbsData.breadcrumb[1].title
        }
      ],
      textColor: "#5d5d5d",
      backgroundColor: "#ffffff",
      operator: ">",
      fontSize: "14px",
      pageTitle: breadcrumbsData.breadcrumb[1].title,
      descriptionColor: "#000000",
      descriptionFontSize: "21px",
      activeClass: true
    };

    this.props.breadcrumb(breadCrumbObject);

    history.push({
      pathname: encodeURI(`/admin/manage-institutes/institute/manage-learner/new/${urlChanger.encode({ instituteId })}`)
    });
  };

  query = graphql`
    query learnerManagementQuery($pageId: String, $redordPerPage: Int, $instituteId: String) {
      getInstitute(instituteId: $instituteId){
        name
        learners(first: $redordPerPage, after: $pageId, sort: {order: DESC, field: "createdOn"}) {
          edges{
            node{
              userId
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

  handleRowClick = () => null;

  handleDeletePopup = (isPopupOpen) => {
    this.setState({ isPopupOpen, row: {} });
  }

  handleDelete = () => {
    this.setState({ isLoading: true });

    this.props.deleteLearner(this.state.row.userId);
  }

  deleteLearner = (row) => {
    this.setState({ isPopupOpen: true, row: row });
  }

  editLearner = (row) => {
    const { breadcrumbsData } = this.props;

    const { instituteId } = this.state;

    const arrowObject = {
      breadcrumb: [],
      arrowcrumb: [
        {
          route: encodeURI(`/admin/manage-institutes/institute/manage-learner/list/${urlChanger.encode({ instituteId })}`),
          title: breadcrumbsData.breadcrumb[1].title
        }
      ],
      textColor: "#5d5d5d",
      backgroundColor: "#ffffff",
      operator: ">",
      fontSize: "14px",
      arrowCrumbTitle: "Learner Management",
      descriptionColor: "#000000",
      descriptionFontSize: "21px",
      activeClass: true
    };

    this.props.breadcrumb(arrowObject);
    history.push(`/admin/manage-institutes/institute/manage-learner/edit/${urlChanger.encode({ instituteId, learnerId: row.userId })}`);
  }

  renderQuery = ({ error, props }) => {
    const { totalCount, isPopupOpen, instituteId } = this.state;

    if (props && props.getInstitute.learners) {
      const breadCrumbObject = {
        breadcrumb: [
          { route: '/admin/manage-institutes', title: 'Manage Accounts' },
          {
            route: `/admin/manage-institutes/institute/manage-learner/list/${ urlChanger.encode({ instituteId }) }`,
            title: props.getInstitute.name
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

      if (isPopupOpen) {
        this.setState({ isPopupOpen: false, isLoading: false });
      }

      const learners = props.getInstitute.learners.edges.map((institute) => institute.node);

      if(totalCount !== props.getInstitute.learners.totalCount) {
        this.setState({ totalCount: props.getInstitute.learners.totalCount })
      }

      return <SimpleTable
        rows={ learners }
        titles={ CONSTANTS.LEARNER_LIST_TITLES }
        type={ 'learner' }
        totalCount={ props.getInstitute.learners.totalCount }
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
        noRecord={ props.getInstitute.learners.totalCount ? true : false }
      />;
    }

    return <SimpleTable
      titles={ CONSTANTS.LEARNER_LIST_TITLES }
      type={ 'learner' }
      totalCount={ totalCount }
      managePageCount={ this.managePageCount }
      redordPerPage={ CONSTANTS.RECORD_PER_PAGE }
      noRecord={ !(props && !props.getInstitute.learners) }
    />;
  }

  render() {
    const { pageId, isPopupOpen, isLoading, instituteId } = this.state;

    return (
      <div className="learner-management">
        <div className="learner-management__container">
          <div className="header-container">
            <div>
              <h3 className='header-container__title'>{trans('Learner Management')}</h3>
            </div>
            <div className="header-container__sub-header-right">
              <Button classname={ 'btn-outlined' } clickHandler={ this.handleClickOpen } text={ trans('Add Learner') } />
            </div>
          </div>
          <QueryRenderer
            environment={ environment }
            query={ this.query }
            variables={ {
              pageId,
              redordPerPage: CONSTANTS.RECORD_PER_PAGE,
              instituteId: instituteId,
              listUpdated: this.state.listUpdated
            } }
            render={
              this.renderQuery
            }
          />
        </div>
        {isPopupOpen && <DeletePopup
          open={ isPopupOpen }
          handleClose={ () => this.handleDeletePopup(false) }
          title={ trans('Delete Learner') }
          description={ trans('Are you sure you want to delete this learner?') }
          trans={ trans }
          isLoading={ isLoading }
          disableHoverOnButtonLoader={ true }
          handleDelete={ () => this.handleDelete() } />}
      </div>
    );
  }
}

const mapStateToProps = ({ DeleteLearnerState: { isLoading, errors, lastHit }, breadcrumbsState: { breadcrumbsData } }) => ({ isLoading, errors, lastHit, breadcrumbsData });

const mapDispatchToProps = (dispatch) => ({
  deleteLearner: (id) => {
    dispatch(deleteLearnerData(id));
  },
  getInstitute: (id, type) => {
    dispatch(getInstituteNameById(id, type));
  },
  breadcrumb: (data) => {
    dispatch(breadcrumb(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnerManagement);
