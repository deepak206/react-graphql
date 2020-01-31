import React from 'react';
import { string, array } from 'prop-types';
import SkillCard from './skill-card';
import { trans } from '../../utils';

import './skill-list.scss';

const SkillList = (props) => {
  const emptyDataText = props.type === 'weak' ? 'You don’t have any tasks that need improvement yet'
    : props.type === 'strong' ? 'You don’t have any tasks that have strong performance' : '';

  return (
    <div className='skill-list-container'>
      <div className='skill-list-container__header'>
        <span className='skill-list-container__header_span'>{ trans(props.header) }</span>
      </div>
      {
        props.data && props.data.length > 0 ? <SkillCard { ...props } /> :
          <div className='skill-list-container_empty-text'>{ emptyDataText }</div>
      }
    </div>
  );
};

SkillList.propTypes = {
  colorClass: string,
  sizeClass: string,
  header: string,
  data: array,
  type: string,
};

SkillList.defaultProps = {
  type: 'strong',
};

export default SkillList;
