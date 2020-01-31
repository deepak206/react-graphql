import React from 'react';
import { trans } from '../../utils';

import './my-performance-skill.scss';

const MyPerformanceSkillRightCard = (props) => {
  const { data } = props;

  return (
        <>
            <div className='my-performance-skill__container_card-right_content'>
              <div className='my-performance-skill__container_card-right_content_row-1'>
                <img className='my-performance-skill__container_card-right_content_row-1_image'
                  src={ require('../../assets/images/learner/my-performance/check-tick-orange-icon.svg') } alt=''></img>
                <p className='my-performance-skill__container_card-right_content_row-1_p'>
                  { data.llearningObj }
                </p>
              </div>
              <div className='my-performance-skill__container_card-right_content_row-2'>
                { trans('Learning Objectives') }
              </div>
            </div>
            <div className='my-performance-skill__container_card-right_content'>
              <div className='my-performance-skill__container_card-right_content_row-1'>
                <img className='my-performance-skill__container_card-right_content_row-1_image'
                  src={ require('../../assets/images/learner/quiz/icon-clock-orange.svg') } alt=''></img>
                <p className='my-performance-skill__container_card-right_content_row-1_p'>
                  { data.avgTime }
                </p>
              </div>
              <div className='my-performance-skill__container_card-right_content_row-2'>
                { trans('Avg. Time / Question') }
              </div>
            </div>
            <div className='my-performance-skill__container_card-right_content'>
              <div className='my-performance-skill__container_card-right_content_row-1'>
                <img className='my-performance-skill__container_card-right_content_row-1_image'
                  src={ require('../../assets/images/learner/my-performance/arrow-plateorange-icon.svg') } alt=''></img>
                <p className='my-performance-skill__container_card-right_content_row-1_p'>
                  { data.acuracy }%
                </p>
              </div>
              <div className='my-performance-skill__container_card-right_content_row-2'>
                { trans('Accuracy' )}
              </div>
            </div>
        </>
  );
}

export default MyPerformanceSkillRightCard;
