import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import {
  object, string, func,
} from 'prop-types';
import Error from '../error';
import './password-field.scss';
import fieldValidation from '../../utils/validate';
import { checkValidationRule } from '../../utils';

const checkColor = (passwordLength) => {
  const points = Array(...Array(5));

  let counter = 0;

  const level = points.map((point, key) => {
    let className = '';

    if (passwordLength.length === 8 && !counter) className = 'red';

    if ((passwordLength.length >= 9 && passwordLength.length < 12) && counter < 3) className = 'orange';

    if (passwordLength.length >= 12) className = 'active';

    counter += 1;
    return <li className={ className } key={ key }></li>;
  });

  return level;
};

const PasswordField = ({
  name,
  fieldAttributes,
  label,
  helper,
  strengthPop,
  validate,
  validationRule,
  validateOptions,
  validationCallback,
}) => {
  const [ errors, setError ] = useState({});

  const { value } = fieldAttributes;

  const { [name]: error = '' } = errors;

  const handleErrors = (errorMsg, isVisible, e) => {
    const err = { [name]: errorMsg };

    if (checkValidationRule(isVisible, validationRule)) {
      setError({ ...err });
    } else if (isVisible === 'VALIDATE_ON_TYPE'  && e.key !== 'Enter') {
      // this added because we want to unset error on type
      setError({ err: '' });
    }

    validationCallback(!!errorMsg);
  };

  const validateFields = (isVisible, e) => {
    const {
      check, required, passwordCheck, confirmPassword, newPass,
    } = validateOptions;

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

    if (passwordCheck) {
      const errorMsg = fieldValidation.checkPassword(value);

      if (errorMsg.message) {
        handleErrors(errorMsg.message, isVisible, e);

        return;
      }
    }

    if (confirmPassword) {
      const errorMsg = fieldValidation.validateConfirmPassword(value, newPass);

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

  const helperCheck = () => {
    let helperText = '';

    // if (helper) {
    //   helperText =
    //   <Grid className="password-field__hint">
    //     {trans('Your password must have at least 8 characters and have at least one number')}
    //   </Grid>;
    // }

    if (error) {
      helperText = <Error errorMessage={ error }/>;
    }

    return helperText;
  };

  return (
    <Grid className={ `password-field ${!!error && 'password-field--error'}` }>
      { !!label
          &&
          <label className= "password-field__label">
            { label }
            { strengthPop
              &&
              <div className="password-field__dots">
                <ul>
                  { checkColor(fieldAttributes.value) }
                </ul>
              </div>
            }
          </label>
      }
      <input
        className={ `password-field__input ${!!error && 'password-field__input--error'}` }
        name={ name }
        onBlur= { (e) =>  validateFields('VALIDATE_ON_BLUR', e) }
        onKeyUp= { (e) => validateFields('VALIDATE_ON_TYPE', e) }
        { ...fieldAttributes } />
      { helperCheck() }
    </Grid>
  );
};

PasswordField.propTypes = {
  fieldAttributes: object,
  label: string.isRequired,
  name: string.isRequired,
  validationCallback: func.isRequired,
};

PasswordField.defaultProps = {
  check: false,
  fieldAttributes: {},
};

export default PasswordField;
