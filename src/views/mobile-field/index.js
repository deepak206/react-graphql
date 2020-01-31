import React, { useEffect, useState } from 'react';
import { Grid, Select, MenuItem } from '@material-ui/core';
import {
  object, string, func,
} from 'prop-types';
import './mobile-field.scss';
import Error from '../error';
import fieldValidation from '../../utils/validate';
import { checkValidationRule } from '../../utils';
// need to implement the arrow
// import ArrowIcon from '../../assets/images/down-arrow.svg';

const mobileCodes = {
  canada: '+1', india: '+91', uk: '+44',
};

const MobileField = ({
  countryAttributes,
  name,
  fieldAttributes,
  label,
  validate,
  validationRule,
  validateOptions,
  validationCallback,
}) => {
  const [ errors, setError ] = useState({});

  const [ fieldClass, setFieldClass ] = useState(0);

  const { value } = fieldAttributes;

  const { [name]: error = '' } = errors;

  const handleErrors = (errorMsg, isVisible, e) => {
    const err = { [name]: errorMsg };

    if (checkValidationRule(isVisible, validationRule)) {
      setError({ ...err });
    } else if (isVisible === 'VALIDATE_ON_TYPE' && e.key !== 'Enter') {
      // this added because we want to unset error on type
      setError({ err: '' });
    }

    validationCallback(!!errorMsg);
  };

  const validateFields = (isVisible, e) => {
    const { check, required, mobileCheck } = validateOptions;

    if (!check) {
      return;
    }

    if (required) {
      const errorMsg = fieldValidation.required(value, label);

      if (errorMsg) {
        handleErrors(errorMsg, isVisible, e);

        return;
      }
    }

    if (mobileCheck) {
      const errorMsg = fieldValidation.mobileCheck(value);

      if (errorMsg) {
        handleErrors(errorMsg, isVisible, e);

        return;
      }
    }

    handleErrors('', isVisible, e);
  };

  // componentDidupdate
  useEffect(
    () => {
      if (validate) {
        validateFields('VALIDATE_ON_FORM_SUBMIT');
      }
    },
  );

  return (
    <Grid className={ `mobile-form ${!!error && 'mobile-form--error'}` }>
      { !!label
          &&
          <label className= "mobile-form__label">
            { label}
          </label>
      }
      <Grid className={ `mobile-form-fields ${fieldClass} ${!!error && 'mobile-form-fields--error'}` }>
        <Select
          disableUnderline={ true }
          className="mobile-form-fields__select"
          inputProps={ { className: 'mobile-form-fields-material__select' } }
          { ...countryAttributes }>
          { Object.keys(mobileCodes).map((e, index) => <MenuItem key={ index } value={ mobileCodes[e] }>{mobileCodes[e]}</MenuItem>)}
        </Select>
        <input
          className="mobile-form-fields__input"
          name={ name }
          onFocus={ () => setFieldClass('focused') }
          // for validate on focus out
          onBlur= { (e) => {
            setFieldClass('');
            validateFields('VALIDATE_ON_BLUR', e);
          } }
          onKeyUp= { (e) => validateFields('VALIDATE_ON_TYPE', e) }
          { ...fieldAttributes }
        />
      </Grid>
      { !!error
        && <Error errorMessage={ error }/>
      }
    </Grid>
  );
};

MobileField.propTypes = {
  fieldAttributes: object,
  label: string.isRequired,
  name: string.isRequired,
  validationCallback: func.isRequired,
};

MobileField.defaultProps = {
  fieldAttributes: {},
};

export default MobileField;
