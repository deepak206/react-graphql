import React, { Component } from 'react';
import './welcome.scss';
import { Grid, Typography } from '@material-ui/core';
import DialogBox from '../../views/dialog-box';
import Button from '../../views/button';
import history from '../../routes/history';
import Link from '../../views/link';
import { trans } from '../../utils';
import Layout from '../../views/layout';

class Welcome extends Component {
  state = {
    isOpen: false,
  };

  handleClickOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  onClickHandler = () => history.push('/score');

  render() {
    const { isOpen } = this.state;

    return (
      <Layout>
        <div className="welcome-container">
          <div className="welcome-container__middle-section">
            <div className="welcome-container__middle-section_heading">
              <h3>
                { trans('Let\'s Get Started') }
              </h3>
              <p>{ trans('Take a quick test to know your current level') }</p>
            </div>
            <div className="welcome-container__middle-section_box">
              <ul>
                <li><img alt="clock" src={ require('../../assets/images/icon-clock.png') }/> { trans('10-15 mins') }</li>
                <li><img alt="light" src={ require('../../assets/images/icon-light.png') }/> { trans('Adapts based on your answer') }</li>
                <li><img alt="headphone" src={ require('../../assets/images/icon-hp.png') }/> { trans('Headset required') }</li>
              </ul>
              <div className="welcome-container__middle-section_box_take-test-btn">
                <Button classname={ 'btn-outlined btn-lg' } clickHandler={ this.onClickHandler } text={ trans('Take the test') } />
              </div>
              <div className="welcome-container__middle-section_box_leaf-blue">
                <img alt="leaf" src={ require('../../assets/images/welcome-leaf-blue.png') }/>
              </div>
            </div>
            <p className="welcome-container__middle-section_tc welcome-container__middle-section_blue" onClick={ this.handleClickOpen }>
              <span className="welcome-container__middle-section_tc_qmark">?</span>{ trans('Why should I take the test?') }
            </p>
          </div>
          <DialogBox isOpen={ isOpen } handleClose={ this.handleClose } title={ trans('Why should I take this test?') }>
            <Grid className="dailogbox-container__dialog-box-content_main-container dailogbox-container__main-container-welcome-dialog">
              <Typography gutterBottom>
                {trans('Instant, accurate results to help learners get mapped to their current English proficiency level')}
              </Typography>
              <Typography gutterBottom>
                {trans('Evaluation across writing, listening, reading, grammar and vocabulary')}
              </Typography>
              <Typography gutterBottom>
                {trans('Accurate GSE score (10-90) mapped to CEFR')}
              </Typography>
              <Typography gutterBottom>
                {trans('Uses integrated skill testing – dual skills such as listening & writing, listening and speaking tested together to reflect real life circumstances')}
              </Typography>
            </Grid>
            <Grid className="dailogbox-container__link-action">
              <Typography gutterBottom>
                <Link to={ '/welcome' } text={ trans('Read More') }/>
              </Typography>
            </Grid>
          </DialogBox>
        </div>
      </Layout>
    );
  }
}

export default Welcome;
