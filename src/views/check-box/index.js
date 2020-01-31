import React from 'react';
import {
  object, string, number, oneOfType, func, bool,
} from 'prop-types';
import './checkBox.scss';

const CheckBox = ({
  classname,
  isDisabled,
  isChecked,
  id,
  fieldAttributes,
  label,
  isToggleCheckbox,
}) => {
  const renderChk = (
        <>
        <div className="custom-checkbox">
          <input
            className={ `styled-checkbox ${classname}` }
            checked={ isChecked }
            disabled={ isDisabled }
            id={ id }
            value={ label }
            type="checkbox"
            { ...fieldAttributes } />
          { !!label
        && <label htmlFor={ id }>
          { label }
        </label>
          }
        </div>
        </>
  );

  const renderChkToggle = (
    <>
    <div className="custom-checkbox">
      <label className="toggle-label">
        <input
          className={ `styled-checkbox ${classname}` }
          checked={ isChecked }
          disabled={ isDisabled }
          id={ id }
          value={ label }
          type="checkbox"
          { ...fieldAttributes } />
        <span className={ `${isChecked === true ? 'backOn back' : 'back'}` }>
          <span className="toggle"></span>
          <span className="label on"></span>
          <span className="label off"></span>
        </span>
      </label>
    </div>
    </>
  );

  return (
    <>
    { isToggleCheckbox === undefined || isToggleCheckbox === false
      ? renderChk : renderChkToggle
    }
    </>
  );
};

CheckBox.propTypes = {
  className: string,
  disabled: bool,
  fieldAttributes: object,
  id: oneOfType([
    string.isRequired,
    number.isRequired,
  ]),
  isChecked: bool.isRequired,
  label: string,
  onChange: func,
};

CheckBox.defaultProps = {
  classname: '',
  fieldAttributes: {},
  isChecked: false,
  isDisabled: false,
};

export default CheckBox;
