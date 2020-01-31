import React from 'react';
import { string } from 'prop-types';
import ErrorIcon from '../../assets/images/error.png';
import './error.scss';

const Error = ({ errorMessage }) => (
  <div className="error-container">
    <span className="error-container__text">
      <img className="error-container__text_image" src={ ErrorIcon } alt="error"/>{errorMessage}
    </span>
  </div>
);

Error.propTypes = { errorMessage: string.isRequired };

export default Error;
