import React from 'react';
import './on-boarding-background.scss';
import '../../assets/styles/index.scss';
import Layout from '../layout';

export default function OnBoardingBackground(props) {
  return (
    <Layout>
      <div className={ props.classname }>
        <div className="on-boarding-container">
          { props.heading }
          { props.isOverlay && <div className="on-boarding-container__overlay" /> }
          
          <div className="on-boarding-container__form">
            {
              !props.isOverlay&&
            <><div className="on-boarding-container__form__man"></div>
            <div className="on-boarding-container__form__background"></div>
          <div className="on-boarding-container__form__girl"></div>
          {/* <div className="on-boarding-container__form__msg"></div>
          <div className="on-boarding-container__form__group"></div>
          <div className="on-boarding-container__form__leaf">
          </div> */}
            <div className="on-boarding-container__form__leaf-image">
            </div>
          </>
            }
            {/* form container */}
            {props.form}

          </div>
          { props.formBottomContent }
        </div>
      </div>
    </Layout>
  );
}
