import React from 'react';
import {
  object, string, number, oneOfType, bool,
} from 'prop-types';
import { trans } from '../../utils';

import './switch.scss';

const Switch = ({
  classname,
  isDisabled,
  isChecked,
  id,
  fieldAttributes,
  labelOn,
  labelOff,
}) => {

  const renderChkToggle = (
    <div className="switch-container">
      <label className="switch-container__toggle-label">
        <input
          className={ `switch-container__toggle-label_checkbox ${classname}` }
          checked={ isChecked }
          disabled={ isDisabled }
          id={ id }
          value={ id }
          type="checkbox"
          { ...fieldAttributes } />
        <span className={ `switch-container__back ${isChecked === true ? 'backOn' : ''}` }>
          <span className="switch-container__back_toggle"></span>
          <span className="switch-container__back_label on">{ trans(labelOn) }</span>
          <span className="switch-container__back_label off">{ trans(labelOff) }</span>
        </span>
      </label>
    </div>
  );

  return (
    <> { renderChkToggle } </>
  );
};

Switch.propTypes = {
  IsDisabled: bool,
  classname: string,
  fieldAttributes: object,
  id: oneOfType([
    string.isRequired,
    number.isRequired,
  ]),
  isChecked: bool,
  labelOff: string,
  labelOn: string,
};

Switch.defaultProps = {
  classname: '',
  fieldAttributes: {},
  isChecked: false,
  isDisabled: false,
  labelOff: 'Level',
  labelOn: 'Module',
};

export default Switch;
