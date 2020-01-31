/* eslint-disable import/no-dynamic-require */
import React, { Fragment } from 'react';
import './horizontalLinearStepper.scss';
import {
  number, string, bool,
} from 'prop-types';
import { getShortName } from '../../utils';

const HorizontalLinearStepper = ({ activeStep, isStepperHidden, subRoutes }) => {
  const getIcon = (title, index) => {
    const activeUrl = `manage-accounts-${getShortName(title)}${index < activeStep || index === activeStep ? '-active.svg' : '.svg'}`;

    return activeUrl;
  };

  const stepClass = (index) => {
    if (index < activeStep) {
      return 'visited';
    }
    if (activeStep === index) {
      return 'active';
    }
    return '';
  };

  return (
    <Fragment>
      { !isStepperHidden&& <div className="stepper-tab">
        <ul className="stepper-tab-list">
          { subRoutes
          // Skip selected course route
            .filter((step, index) => index !== 2)
            .map((step, index) => (
              <li className={ `${stepClass(index)} stepper-tab-list__item` } key={ index }>
                <div className="stepper-tab-list__item-icon">
                  <img alt={ step.title } src={ require(`../../assets/images/manage-accounts/${getIcon(step.title, index)}`) } />
                </div>
                {step.title}
                <div className="stepper-tab-list__item-dot" />
              </li>
            ))}
        </ul>
      </div>}
    </Fragment>
  );
}

HorizontalLinearStepper.propTypes = {
  activeStep: number,
  institute: string,
  isStepperHidden: bool,
};

HorizontalLinearStepper.defaultProps = {
  activeStep: 0,
  isStepperHidden: false,
};

export default HorizontalLinearStepper;