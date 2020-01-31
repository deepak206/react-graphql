import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import {
  object, string, func,
} from 'prop-types';
import './input-field.scss';
import Error from '../error';
import fieldValidation from '../../utils/validate';
import { checkValidationRule } from '../../utils';

const InputField = ({
  name,
  fieldAttributes,
  classname,
  label,
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
    } else if (isVisible === 'VALIDATE_ON_TYPE' && e.key !== 'Enter') {
      // this added because we want to unset error on type
      setError({ err: '' });
    }

    validationCallback(!!errorMsg);
  };

  const validateFields = (isVisible, e) => {
    const {
      check, required, reg, regMsg,
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

    if (reg) {
      const errorMsg = fieldValidation.reg(reg, value, regMsg);

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
    <Grid className={ `input-box ${!!error && 'input-box--error'}` }>
      { !!label
          &&
          <label className= "input-box__label">
            { label }
          </label>
      }
      <input
        className={ `input-box__field ${classname} ${!!error && 'input-box__field--error'}` }
        name={ name }
        onBlur= { (e) =>  validateFields('VALIDATE_ON_BLUR', e) }
        onKeyUp= { (e) => validateFields('VALIDATE_ON_TYPE', e) }
        { ...fieldAttributes } />
      { !!error
        && <Error errorMessage={ error }/>
      }
    </Grid>
  );
};

InputField.propTypes = {
  fieldAttributes: object,
  classname: string,
  label: string.isRequired,
  name: string.isRequired,
  validationCallback: func.isRequired,
};

InputField.defaultProps = {
  fieldAttributes: {},
  classname: "",
  validateOptions: {
    check: false,
  },
};

export default InputField;
