import React from 'react';
import Dashboard from './index';
import { trans } from '../../utils';
import SelectBox from '../../views/select-box';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../relay/environment';
import { QueryRenderer } from 'react-relay';
import LinearProgressBar from '../../views/loader/linear-progress-bar';
import { connect } from 'react-redux';
import { getActiveLearner, resetActiveUser } from '../../dispatchers/admin-dashboard-action-dispatcher';
import './admin-dashboard.scss';

class AdminDashboard extends Dashboard {
  state = {
    field: {
      instituteId: null
    }
  };

  handleChange(field, e) {
    const { target } = e;

    this.setState({ field: { instituteId: target.value } });

    this.props.getActiveLearner(target.value);
  }

  query = graphql`
    query adminDashboardQuery {
      institutes(first: 1000, after: "0",) {
        edges {
          node {
            instituteId
            name
          }
        }
      }
  }
  `;

  componentWillUnmount() {
    this.props.resetActiveUser()
  }

  renderQuery = ({ error, props }) => {
    if (error) {
      return <div>{error.message}</div>;
    } else if (props && props.institutes) {
      const instituteList = [];
      const institutes = props.institutes.edges.map((institute) => instituteList.push({
        id: institute.node.instituteId,
        name: institute.node.name
      }));

      if (instituteList) {
        this.props.getActiveLearner(props.institutes.edges[0].node.instituteId);
        // this.setState({ field: { instituteId: props.institutes.edges[0].node.instituteId } });
      }

      return (
        <div className="admin-dashboard__content_selectbox">
          <SelectBox
            label={ trans('') }
            name="institute"
            options={ instituteList }
            fieldAttributes={ {
              onChange: this.handleChange.bind(this, 'institute'),
              value: institutes ? institutes[0].name : '',
            } }
          />
        </div>
      )
    }
    return <div className="admin-dashboard__loading-body"><LinearProgressBar className="admin-dashboard__loading-body_progress-bar"/></div>;
  }

  render() {
    const { activatedUsers } = this.props;

    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard__breadcrumb">
          <h3 className="add-institute__breadcrumb-section__title">
            {trans('Analytics Overview')}
          </h3>
        </div>
        <div className="admin-dashboard__content">
          <QueryRenderer
            environment={ environment }
            query={ this.query }
            render={
              this.renderQuery
            }
          />
          {activatedUsers &&  <div className="admin-dashboard__content_activation-card">
            <div className="admin-dashboard__content_activation-card_title">
              <span className="admin-dashboard__content_activation-card_title_span">{ trans('Activation') }</span>
            </div>
            <div className="admin-dashboard__content_activation-card_body">
              <div className="admin-dashboard__content_activation-card_body_percentage">
                { activatedUsers }%
              </div>
              <div className="admin-dashboard__content_activation-card_body_content">
                { trans('Activated Users') }
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ AdminDashboardState: { activatedUsers, isLoading, error } }) => ({ activatedUsers, isLoading, error });

const mapDispatchToProps = (dispatch) => ({
  getActiveLearner: (organizationId) => {
    dispatch(getActiveLearner(organizationId));
  },
  resetActiveUser: () => {
    dispatch(resetActiveUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
