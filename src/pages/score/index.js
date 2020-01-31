import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import DialogBox from '../../views/dialog-box';
import Button from '../../views/button';
import Layout from '../../views/layout';
import { trans, interpolate } from '../../utils';
import history from '../../routes/history';

import './score.scss';

const userData = JSON.parse(localStorage.getItem('userData'));

class Score extends Component {

  state = {
    activeLevel: 1,
    isOpen: false,
    testScore: Math.floor(Math.random() * 90),
    userName: `${userData.firstName} ${userData.lastName}`,
  };

  componentWillMount = () => {
    const { testScore } = this.state;

    let level = 0;

    switch (true) {
      case testScore > 0 && testScore < 22:
        level = 1;
        break;

      case testScore >= 22 && testScore <= 29:
        level = 2;
        break;

      case testScore >= 30 && testScore <= 35:
        level = 3;
        break;

      case testScore >= 36 && testScore <= 42:
        level = 4;
        break;

      case testScore >= 43 && testScore <= 50:
        level = 5;
        break;

      case testScore >= 51 && testScore <= 58:
        level = 6;
        break;

      case testScore >= 59 && testScore <= 66:
        level = 7;
        break;

      case testScore >= 67 && testScore <= 75:
        level = 8;
        break;

      case testScore >= 76 && testScore <= 84:
        level = 9;
        break;

      case testScore >= 85 && testScore <= 90:
        level = 10;
        break;

      default:
        break;
    }

    this.setState({ activeLevel: level });
    localStorage.setItem('activeLevel', level);
  }

  getLevels = () => {
    const { activeLevel } = this.state;

    const points = Array(...Array(10));

    const level = points.map((point, key) => {
      const className = activeLevel - 1 === key ? 'active' : '';

      return <li className={ className } key={ key }>{key + 1}</li>;
    });

    return level;
  }

  getStartedClicked = () => {
    history.push('/score-card-welcome');
  }

  handleClickOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      testScore, activeLevel, userName, isOpen,
    } = this.state;

    return (
      <Layout>
        <div className="score-container" >
          <div className="score-container__points-container">
            <div className="score-container__points-container_points-message">
              <p className="score-container__points-container_points-message_score-text" dangerouslySetInnerHTML={ {
                __html: trans(
                  `Congratulations userName, you have achieved an <span>
                  Advanced Score on GSE</span> and <span>B1 in CEFR </span>`,
                ).replace('userName', userName),
              } }>
              </p>
              <p className="score-container__points-container_points-message_gse" onClick={ this.handleClickOpen }>
                <span className="score-container__points-container_points-message_gse_qmark">?</span>{ trans('What is GSE and CEFR?') }
              </p>
            </div>
            <div className="score-container__points-container_score-section">
              <div className="score-container__points-container_score-section_score">
                { testScore }  <span className="score-container__points-container_score-section_score_total-scroe">/ 90</span></div>
              <div className="score-container__points-container_score-section_test-score">{ trans('Test Score') }</div>
            </div>
          </div>
          <div className="score-container__levels">
            <label> { trans('Levels') } </label>
            <ul className="score-container__levels_score-points">
              { this.getLevels() }
            </ul>
          </div>
          <div className="score-container__level-text">
            { interpolate('Based on your score, you directly can jump to Level %(activeLevel)s',
              { activeLevel })
            }
          </div>
          <div className="score-container__btn-outer">
            <Button classname={ 'btn-outlined' } clickHandler={ this.getStartedClicked } text={ trans('Continue') }/>
          </div>
          <DialogBox isOpen={ isOpen } handleClose={ this.handleClose } title={ trans('What is GSE and CEFR?') }>
            <Grid className="dailogbox-container__dialog-box-content_main-container dailogbox-container__main-container-score">
              <Typography gutterBottom>
            The Global Scale of English (GSE) is the first truly global English
            language standard. It extends the Common European Framework of Reference
            (CEFR) by pinpointing on a scale from 10 to 90 on what needs to be mastered
            for the four skills of speaking, listening, reading and writing within a CEFR
            level, using a more granular approach.
              </Typography>
            </Grid>
            <Grid className="dailogbox-container__score-pop-up-img">
              <img src={ require('../../assets/images/level-slider-pop-up.png') } alt="level-slider-pop-up"/>
            </Grid>
          </DialogBox>
        </div>
      </Layout>
    );
  }
}

export default Score;
