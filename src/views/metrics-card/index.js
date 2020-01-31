import React from 'react';
import { string } from 'prop-types';

import './metrics-card.scss';

const MetricsCard = (props) => {
  const { title, type, subTitle, icon, hours, minutes, className } = props;

  return (
    <div className='metrics-container'>
      <div className='metrics-container__header'>
        <div className='metrics-container__header_title'>
          {
            type === 'time' ?
              <>
              { hours }<span className='metrics-container__header_title_span'>{ hours && 'hr' } </span>
              { minutes }<span className='metrics-container__header_title_span'>{ minutes && 'min' }</span>
              </>
              : title
          }
        </div>
        <div className='metrics-container__header_sub-title'>
          { subTitle }
        </div>
      </div>
      <div className={ `metrics-container__icon ${ className }` }>
        <img className='metrics-container__icon_image' src={ require(`../../assets/images/${ icon }`) } alt='' />
      </div>
    </div>
  );
};

MetricsCard.propTypes = {
  icon: string,
  subTitle: string,
  title: string,
  type: string
};

MetricsCard.defaultProps = {
  type: 'text'
};

export default MetricsCard;
