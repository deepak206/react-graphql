import React, { Component } from 'react';
import './success-or-error.scss';
import '../../assets/styles/index.scss';
import { trans } from '../../utils';
import OnBoardingBackground from '../../views/on-boarding-background/index';
import Link from '../../views/link';

export class SuccessOrError extends Component {
  constructor(props) {
    super(props);
    this.state = { isSuccess: true };
  }

  SuccessDiv = () => (
    <div>
      <div className="reset-password-error-success__container">
        <img
          src={ require('../../assets/images/icon-tick.png') }
          alt="img"
          className="reset-password-error-success__container_image-width"
        />
        <p>
          <strong>{trans('Password changed successfully!')}</strong>
        </p>
        <div className="reset-password-error-success__links">
          <dl className='reset-password-error-success__dl'>
            <dt className='reset-password-error-success__dt'><Link to='/' text={ trans('Return to Login') }></Link></dt>
          </dl>
        </div>
      </div>
    </div>
  );

  ErrorDiv = () => (
    <div>
      <div className="reset-password-error-success__container">
        <img
          src={ require('../../assets/images/icon-oh.png') }
          alt="img"
          className="reset-password-error-success__container_image-width"
        />
        <p className='reset-password-error-success__container_p' dangerouslySetInnerHTML={ {
          __html: trans('Uh-oh! Your password reset link has expired.'),
        } }></p>
        <div className="reset-password-error-success__links">
          <ul className='reset-password-error-success__ul'>
            <li className='reset-password-error-success__li'><Link to='/' text={ trans('Return to Login') }></Link></li>
            <li className='reset-password-error-success__li'><Link to='/resetpasswordsendlink' text={ trans('Resend recovery link') }></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <OnBoardingBackground
        classname="reset-password-error-success"
        isOverlay={ true }
        form={ !this.state.isSuccess ? <this.SuccessDiv /> : <this.ErrorDiv /> }
      />
    );
  }
}

export default SuccessOrError;
