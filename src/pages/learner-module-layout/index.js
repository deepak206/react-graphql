import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import StepperRouter from '../stepper-layout/stepper-router';
import SubHeader from '../../views/sub-header';

import './learner-module.scss'

const LearnerModuleLayout = (props) => {
  const { subRoutes, urlPrefix, breadcrumbsData, isZoom } = props;

  return (
    <div
      className={ `learner-module ${ ( isZoom || isEmpty(breadcrumbsData) ) && 'background-remove' }` }>
      { !isZoom && !isEmpty(breadcrumbsData) &&
          <SubHeader
            pageDescription={ breadcrumbsData.description }
            pageTitle={ breadcrumbsData.pageTitle }
            activeImage={ !!breadcrumbsData.activeImage }
            backgroundColor= "#005a70"
            breadcrumb={ breadcrumbsData.breadcrumbs || [] }
            operator={ <div className='seprator-operator'/> }
            activeClass={ !!breadcrumbsData.activelast }
          />
      }
      <div className="learner-module__tile-section">
        <StepperRouter subRoutes={ subRoutes } urlPrefix={ urlPrefix } />
      </div>
    </div>
  )
}

export default connect(({ breadcrumbsState: { breadcrumbsData, isZoom } }) => ({ breadcrumbsData, isZoom }))(LearnerModuleLayout);
