import React from 'react';
import { string } from 'prop-types';

import './circular-chart.scss';

const CircularChart = (props) => {
  const { colorClass, percentage, sizeClass, type } = props;
  const colorCls = type === 'strong' ? 'blue' : type === 'weak' ? 'brown' : colorClass;

  return (
    <div className='circular-chart-container'>
      <div className={ `circular-chart-container__c100 p${percentage} ${sizeClass}` }>
        <span className={ `${sizeClass}-text circular-chart-container__c100_text-${ colorCls }` }>
          {` ${percentage}% `}
        </span>
        <div className={ `slice circular-chart-container__c100_slice-${ colorCls }` }>
          <div className={ `bar circular-chart-container__c100_circle-${ colorCls }` }></div>
          <div className={ `fill circular-chart-container__c100_fill-${ colorCls }` }></div>
        </div>
      </div>
    </div>
  );
};

CircularChart.propTypes = {
  colorClass: string,
  percentage: string,
  sizeClass: string,
  type: string,
};

CircularChart.defaultProps = {
  colorClass: '',
  percentage: '70',
  sizeClass: 'x-small',
  type: 'strong',
};

export default CircularChart;
