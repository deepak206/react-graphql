import React from 'react';
import { trans, indexFormat, getModuleUrl } from '../../utils';
import RangeSlider from '../../views/range-slider/range-slider';
import history from '../../routes/history';
import { connect } from 'react-redux';
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';
import { leftNavigation } from '../../dispatchers/left-navigation-action-dispatcher';

import './learner-dashboard-level-slider.scss';

const LearnerDashboardLevelSlider = (props) => {
  const levelValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

  const GoToModule_ClickHandler = () => {
    const { courseInstanceId, levelId, moduleid } = props;

    props.leftNavigation();
    props.breadcrumbsData({});
    history.push(getModuleUrl( {
      courseId: courseInstanceId,
      levelId,
      moduleId: moduleid
    } ));
  };

  return (
    <div className='dashboard-slider'>
      <div className='dashboard-slider__main'>
        <div className='dashboard-slider__main_text'>
          { trans('Levels') }
        </div>
        <div className='dashboard-slider__main_content'>
          <div className='dashboard-slider__main_content_area'>
            <span className="dashboard-slider__main_content_left"/>
            <RangeSlider className="dashboard-slider__main_slider" { ...props }/>
            <span className="dashboard-slider__main_content_right"/>
          </div>

          <div className="dashboard-slider__main_content_tickmarks">
            {
              levelValues.map((item, index) => {
                return <p className={ `dashboard-slider__main_content_tickmarks_p 
                ${ props.enabledLevels.includes(item) && "dashboard-slider__main_content_tickmarks_enabled"} 
                ${ props.activeLevel === item && "dashboard-slider__main_content_tickmarks_active"}` } key ={ index }>{ indexFormat(item) }</p>
              })
            }
          </div>
          {
            <div className={ `dashboard-slider__main_content_go-to-level 
            ${props.enabledLevels[0] !== props.activeLevel && !props.isSliderLoading && "dashboard-slider__main_content_go-to-level_show"}` }>
              <p>{ trans('Go to level') } { props.activeLevel } </p>
              <img className='dashboard-slider__main_content_go-to-level_img'
                src={ require('../../assets/images/learner/learner-dashboard/right-arrow.svg') } alt='go to level'
                onClick={ GoToModule_ClickHandler }/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumbsData: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  },
  leftNavigation: () => {
    dispatch(leftNavigation());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(LearnerDashboardLevelSlider);
