import React, { Component } from 'react';
import { trans, interpolate, formatTitleToCamelCase, getLocalStorageData } from '../../utils';
import history from '../../routes/history';
import Button from '../../views/button';
import LevelSuccessPopup from './level-success-popup';
import CONSTANTS from '../../constants';
import CircleChart from '../circle-chart';

import './test-report.scss';

const userData = getLocalStorageData('userData');

class TestReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: !!((props.levelId >= 7 && props.score > CONSTANTS.PASSING_SCORE && props.type === 'level_test')),
    };
  }

    onClickHandler = () => {
      const { levelId } = this.props;

      history.push(`/learner/modules/level-${levelId}`);
    }

    getReviewMessage = () => {
      const { type, score } = this.props;

      let message = '';

      switch(true) {
        case type === 'quiz' && score <= CONSTANTS.PASSING_SCORE:
          message = trans('Before we jump to the review test, let us help you strengthen your low performing skills via personalized remediation');
          break;

        case type === 'quiz' && score > CONSTANTS.PASSING_SCORE:
          message = trans('You\'re halfway through! Take a review test before unlocking rest of the modules');
          break;

        case type === 'review_test' && score <= CONSTANTS.PASSING_SCORE:
          message = trans('Retake the review test, improve your score & get access to rest of the learning modules');
          break;

        case type === 'review_test' && score > CONSTANTS.PASSING_SCORE:
          message = trans('You’ve unlocked the next module! Continue with your learning journey');
          break;

        case type === 'level_test' && score <= CONSTANTS.PASSING_SCORE:
          message = trans('Retake the level test to strengthen your low performing skills before continuing with the remaining modules');
          break;

        case type === 'level_test' && score > CONSTANTS.PASSING_SCORE:
          message = trans('Congratulations! You’ve made it to the next level');
          break;

        default:
          break;
      }

      return message;
    }

    getMessageBlockIcon = () => {
      const { type, score } = this.props;

      let icon = '';

      switch(true) {
        case type === 'quiz' && score <= CONSTANTS.PASSING_SCORE:
          icon ='retake-test-icon.svg';
          break;

        case type === 'quiz' && score > CONSTANTS.PASSING_SCORE:
          icon ='test_success_icon.svg';
          break;

        case type === 'review_test' && score <= CONSTANTS.PASSING_SCORE:
          icon ='retake-test-icon.svg';
          break;

        case type === 'review_test' && score > CONSTANTS.PASSING_SCORE:
          icon ='review_test_success_complete.svg';
          break;

        case type === 'level_test' && score <= CONSTANTS.PASSING_SCORE:
          icon ='retake-test-icon.svg';
          break;

        case type === 'level_test' && score > CONSTANTS.PASSING_SCORE:
          icon ='level_test_success_complete.svg';
          break;

        default:
          break;
      }

      return icon;
    }

    handlePopupOnCloseHandler = () => {
      this.setState({ isOpen: false });
    };

    render() {
      const { levelId, type, score, id } = this.props;

      const { isOpen } = this.state;

      return (
        <div className="test-report-container">
          <div className="test-report-container__review-test test-report-container__review-quiz">
            <div className="test-report-container__review-quiz_review-fl">
              <div className="test-report-container__review-quiz_review-fl_mlevel">
                <strong>{trans('Level')} { levelId }: { formatTitleToCamelCase(type) } {type === 'quiz' && `${id} ` }{trans('Score')}</strong>
                <p className="test-report-container__review-quiz_review-fl_mlevel_name">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="test-report-container__review-quiz_review-fl_mlevel_mail">{ userData.email }</p>
              </div>
              <div className="test-report-container__review-quiz_review-fl_section-score">{ score }%</div>
            </div>
            <div className="test-report-container__review-quiz_chart-section">
              <hr className="test-report-container__review-quiz_chart-section_hr"/>
              <div className="test-report-container__review-quiz_chart-section_chart">
                <div className="test-report-container__review-quiz_chart-section_chart_inner-section">
                  <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA">
                    <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-icons">
                      <img src={ require('../../assets/images/learner/quiz/icon-questions-orange.svg') } alt={ trans('question') }/>
                    </div>
                    <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-score">
                      <p className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-score_p-16">12 / 16</p>
                      <p className="size12">{trans('Answered Correctly')}</p>
                    </div>
                  </div>
                  <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA">
                    <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-icons">
                      <img src={ require('../../assets/images/learner/quiz/icon-clock-orange.svg') } alt={ trans('clock') } />
                    </div>
                    <div className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-score">
                      <p className="test-report-container__review-quiz_chart-section_chart_inner-section_sideA_chart-score_p-16">18:25</p>
                      <p className="size12">{trans('Time Taken')}</p>
                    </div>
                  </div>
                </div>
                <div className="test-report-container__review-quiz_chart-section_chart_charts">
                  <div className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart">
                    <CircleChart
                      percentageValue={ score }
                      strokeWidth={ 5 }
                      pathStroke={ CONSTANTS.CIRCLE_CHART_PATH_STROKE_COLOR_1 }
                      radius={ 32 }
                      index={ 1 }
                      showText={ true }
                      xaxis={ 50 }
                      yaxis={ 44 }
                      height={ 44 }
                      width={ 100 }
                      textAttributes={ {
                        fill: CONSTANTS.CIRCLE_CHART_TEXT_COLOR_1,
                        fontSize: 16,
                        fontWeight: 600
                      } }
                    />
                    <p className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart_p">{trans('Reading')}</p>
                  </div>
                  <div className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart">
                    <CircleChart
                      percentageValue={ score }
                      strokeWidth={ 5 }
                      pathStroke={ CONSTANTS.CIRCLE_CHART_PATH_STROKE_COLOR_3 }
                      radius={ 32 }
                      index={ 2 }
                      showText={ true }
                      xaxis={ 50 }
                      yaxis={ 44 }
                      height={ 44 }
                      width={ 100 }
                      textAttributes={ {
                        fill: CONSTANTS.CIRCLE_CHART_TEXT_COLOR_3,
                        fontSize: 16,
                        fontWeight: 600
                      } }
                    />
                    <p className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart_p">{trans("Listening")}</p>
                  </div>
                  <div className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart">
                    <CircleChart
                      percentageValue={ score }
                      strokeWidth={ 5 }
                      pathStroke={ CONSTANTS.CIRCLE_CHART_PATH_STROKE_COLOR_4 }
                      radius={ 32 }
                      index={ 3 }
                      showText={ true }
                      xaxis={ 50 }
                      yaxis={ 44 }
                      height={ 44 }
                      width={ 100 }
                      textAttributes={ {
                        fill: CONSTANTS.CIRCLE_CHART_TEXT_COLOR_4,
                        fontSize: 16,
                        fontWeight: 600
                      } }
                    />
                    <p className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart_p">{trans('Grammar')}</p>
                  </div>
                  <div className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart">
                    <CircleChart
                      percentageValue={ score }
                      strokeWidth={ 5 }
                      pathStroke={ CONSTANTS.CIRCLE_CHART_PATH_STROKE_COLOR_5 }
                      radius={ 32 }
                      index={ 4 }
                      showText={ true }
                      xaxis={ 50 }
                      yaxis={ 44 }
                      height={ 44 }
                      width={ 100 }
                      textAttributes={ {
                        fill: CONSTANTS.CIRCLE_CHART_TEXT_COLOR_5,
                        fontSize: 16,
                        fontWeight: 600
                      } }
                    />
                    <p className="test-report-container__review-quiz_chart-section_chart_charts_circular-chart_p">{trans('Vocabulary')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(score > CONSTANTS.PASSING_SCORE && type === 'level_test' && levelId >= 7) && (
            <div className="test-report-container__certificate-section">
              <div className="test-report-container__certificate-section_certificate">
                <img src={ require('../../assets/images/learner/quiz/img-certificate-large.svg') } alt={ trans("certificate") } />
                <p className="size14">{ trans("Download your level completion certificate") }</p>
                <div>
                  <Button text={ trans("Download") } classname={ 'btn-primary' }/>
                </div>
              </div>
              <div className="test-report-container__certificate-section_certificate test-report-container__certificate-section_certificate-pearson">
                <img src={ require('../../assets/images/learner/quiz/img-badge-large.jpg') } alt={ trans("badge") } />
                <p className="size16">{ trans("You've earned a Pearson badge") }</p>
                <p className="size14">{ interpolate("Pearson MePro Level %(levelId)s Progressive", { levelId }) }</p>
              </div>
            </div>
          )}
          {(score > CONSTANTS.PASSING_SCORE && type === 'level_test' && levelId < 7) &&
            <div className="test-report-container__review-test test-report-container__certificate-review-test">
              <div className="test-report-container__certificate-review-test_review-f2 rev-test">
                <div className="test-report-container__certificate-review-test_review-f2_icon-review-test">
                  <img src={ require(`../../assets/images/learner/quiz/img-certificate-small.svg`) } alt={ trans('test') }/>
                </div>
                <div className="test-report-container__certificate-review-test_review-f2_review-text">
                  <p className="size16">{ trans("Download your level completion certificate") }</p>
                </div>
                <div>
                  <Button text={ trans("Download") } classname={ 'btn-primary' }/>
                </div>
              </div>
            </div>
          }
          <div className={ `test-report-container__review-test test-report-container__${type}-review-test-${score <= CONSTANTS.PASSING_SCORE ? `greater` : `less`}` }>
            <div className="test-report-container__review-test_review-f2 test-report-container__review-test_rev-test">
              <div className="test-report-container__review-test_review-f2_icon-review-test">
                <img src={ require(`../../assets/images/learner/quiz/${this.getMessageBlockIcon()}`) } alt={ trans('test') }/>
              </div>
              <div className="test-report-container__review-test_review-f2_review-text">
                <p className="test-report-container__review-test_review-f2_review-text_p">{ this.getReviewMessage() }</p>
                {(score <= CONSTANTS.PASSING_SCORE && type !== 'quiz') && (
                  <p className="test-report-container__review-test_review-f2_review-text_gse">
                    <span className="test-report-container__review-test_review-f2_review-text_qmark">?</span>{ trans("Why should I retake the test?") }
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="test-report-container__btn-center">
            <Button
              text={
                (score <= CONSTANTS.PASSING_SCORE && type !== 'quiz') ? trans('retake test') : trans('continue')
              } classname={ 'btn-outlined' } clickHandler={ this.onClickHandler } />
          </div>
          <LevelSuccessPopup isOpen={ isOpen } handleClose={ this.handlePopupOnCloseHandler } levelId={ levelId }/>
        </div>
      );
    }
}

export default TestReport;
