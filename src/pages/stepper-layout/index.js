import React, { Component } from 'react';
import SubHeader from '../../views/sub-header';
import StepperRouter from './stepper-router';
import { getShortName } from '../../utils';
// import HorizontalLinearStepper from '../../views/horizontal-linear-stepper';

// css for layout of institutes configuration
import './config-stepper.scss';

class StepperLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: this.getActiveStep(props),
      groupTitle: 'details' in props.location ? props.location.details.organization : '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ activeStep: this.getActiveStep(this.props) })
    }
  }

  getActiveStep = (props) => {
    const { subRoutes, location: { pathname } } = props;

    let active = 0;

    subRoutes.map((route, index) => {
      if ( pathname.indexOf(getShortName(route.title)) !== -1) {
        // for skip the step for selected course
        if (index >= 2 ) {
          active = index -1;
        } else {
          active = index;
        }
      }

      return null;
    });

    return active;
  }

  render() {
    const { groupTitle, activeStep } = this.state;
    const { subRoutes, location: { details }, urlPrefix } = this.props;

    return (
      <div className="institute-stepper">
        <div className="institute-stepper-container">
          <div className="institute-stepper__breadcrumb">
            <SubHeader
              breadcrumb={ [
                { details, route: '/admin/manage-accounts', title: 'Manage Accounts' },
                { details, route: '/admin/manage-accounts/institute', title: groupTitle },
              ] }
            />
            <h3 id="groupTitle">{ groupTitle }</h3>
          </div>
          <div className="institute-stepper-form">
            {/* <HorizontalLinearStepper subRoutes={ subRoutes } activeStep={ activeStep }/> */}
            <div className="institute-stepper-form-content">
              <StepperRouter subRoutes={ subRoutes } urlPrefix={ urlPrefix }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepperLayout;
