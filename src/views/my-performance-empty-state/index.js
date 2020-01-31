import React from 'react';
import { string } from 'prop-types';
import { trans } from '../../utils';
import Link from '../../views/link';

import './my-performance-empty-state.scss';

const MyPerformanceEmptyState = (props) => {
  const { activeLevel } = props;

  return (
    <div className='my-performance-empty-container'>
      <div className='my-performance-empty-container__icon'>
        <img className='my-performance-empty-container__icon_image'
          src={ require(`../../assets/images/learner/performance/empty-state-icon.svg`) } alt=''></img>
      </div>
      <div className='my-performance-empty-container__title'>
        { trans('No Data yet!') }
      </div>
      <div className='my-performance-empty-container__sub-title'>
        <p className="my-performance-empty-container__sub-title_p" dangerouslySetInnerHTML={ {
          __html: trans(
            `Get started on your learning journey to see your performance overview here`,
          ),
        } }>
        </p>
      </div>
      <div className='my-performance-empty-container__link'>
        <Link to={ `/learner/modules/level-${ activeLevel }` } text={ trans('Go to Module') }/>
      </div>
    </div>
  );
}

MyPerformanceEmptyState.propTypes = {
  activeLevel: string,
};

MyPerformanceEmptyState.defaultProps = {
  activeLevel: '1',
};

export default MyPerformanceEmptyState;
