/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Paper, Typography, Grid } from '@material-ui/core';
import Layout from '../../views/layout';
import Button from '../../views/button';
import constants from '../../constants';
import { trans, interpolate } from '../../utils';
import { loginForNewUser } from '../../dispatchers/auth-action-dispatcher';

// css for score-card
import './score-card-welcome.scss';

const userName = 'Deepak';

const ScoreCardWelcome = (props) => {
  const getStarted = () => {
    // assuming for now
    props.loginForNewUser('deepak@pearson.com');
  };

  const items = [
    {
      text: trans('Theme-based learning simulating work & social scenarios'),
    },
    {
      text: trans('GSE mapped content'),
    },
    {
      text: trans('AI powered speaking & remediation'),
    },
    {
      text: trans('Level completion certificate'),
    },
    {
      text: trans('Digital badges connecting learners to real jobs'),
    },
  ];

  return (
    <Layout>
      <Grid className="welcome">
        <Grid className="welcome-section">
          <Typography variant="h4" className="welcome-section__heading">
            { interpolate('Hi %(userName)s, welcome to MePro!', { userName }) }
          </Typography>
          <Paper className="welcome-section__paper">
            <Carousel
              showThumbs={ false }
              showStatus={ false }
              stopOnHover= { false }
              showArrows={ false }
              width="280px"
              interval={ constants.SLIDER_INTERVAL }
              autoPlay
              infiniteLoop>
              { items.map((slideText, index) => (
                <div className="welcome-section-slider" key={ index }>
                  <img
                    alt="welcome-slides"
                    src={ require(`../../assets/images/score-card-welcome/slide-${index}.svg`) } className="welcome-section-slider__slides" />
                  <div className="welcome-section-slider__text">{ slideText.text || '' }</div>
                </div>
              ))}
            </Carousel>
            <Grid className="welcome-section__image">
              <img src={ require('../../assets/images/leaf.png') } alt="img" />
            </Grid>
          </Paper>
          <div className="btns welcome-section__action">
            <Button text={ trans('Get Started') } classname={ 'btn-outlined' } clickHandler={ getStarted } />
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginForNewUser: (fields) => {
    dispatch(loginForNewUser(fields));
  },
});

export default connect(null, mapDispatchToProps)(ScoreCardWelcome);
