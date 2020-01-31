import React, { Component } from 'react';
import './send-link-success.scss';
import '../../assets/styles/index.scss';
import { trans } from '../../utils';
import OnBoardingBackground from '../../views/on-boarding-background/index';
import Link from '../../views/link';

export class SendLinkSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = { userEmail: 'anoushka.mehta@gmail.com' };
  }

  render() {
    const { userEmail } = this.state;

    return (
      <OnBoardingBackground
        classname="send-link-success"
        isOverlay={ true }
        form={
          <div>
            <div className="send-link-success__container">
              <img
                src={ require('../../assets/images/icon-tick.png') }
                alt="img"
                className="send-link-success__container_image"
              />
              <p className='send-link-success__container_p'>
                { trans('We just sent a password reset e-mail to') }
                <strong> { userEmail && userEmail }</strong>
              </p>

              <div className="send-link-success__container_links">
                <ul className='send-link-success__container_links_ul'>
                  <li className='send-link-success__container_links_li'><Link to='/' text={ trans('Return to Login') }></Link></li>
                  <li className='send-link-success__container_links_li'><Link to='/resetpasswordsendlink' text={ trans('Resend recovery link') }></Link></li>
                </ul>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export default SendLinkSuccess;
