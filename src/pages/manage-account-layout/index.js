import React, { Component } from 'react';
import SubHeader from '../../views/sub-header';
import StepperRouter from '../stepper-layout/stepper-router';
import { connect } from 'react-redux';

// css for layout of institutes configuration
import './manage-account-layout.scss';

class ManageAccountLayout extends Component {
  render() {
    const { subRoutes, urlPrefix, breadcrumbsData } = this.props;

    return (
      <div className="manage-account-layout">
        <div className="manage-account-layout-container">
          <div className="manage-account-layout__breadcrumb">
            { <SubHeader
              breadcrumb={  (breadcrumbsData.breadcrumb) ? (breadcrumbsData.breadcrumb) : [] }
              arrowcrumb={ breadcrumbsData.arrowcrumb }
              textColor={ breadcrumbsData.textColor }
              backgroundColor={ breadcrumbsData.backgroundColor }
              fontSize={ breadcrumbsData.fontSize }
              pageTitle={ breadcrumbsData.pageTitle }
              arrowCrumbTitle={ breadcrumbsData.arrowCrumbTitle }
              titleStyle= { {
                color: breadcrumbsData.descriptionColor || 'white',
                fontSize: breadcrumbsData.descriptionFontSize || '14px'
              } }
              activeClass={ breadcrumbsData.activeClass }
            />
            }
          </div>
          <div className="manage-account-layout-form">
            <div className="manage-account-layout-form-content">
              <StepperRouter subRoutes={ subRoutes } urlPrefix={ urlPrefix }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ breadcrumbsState: { breadcrumbsData } }) => ({ breadcrumbsData }))(ManageAccountLayout);
