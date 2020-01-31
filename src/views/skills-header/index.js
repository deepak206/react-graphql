import React from 'react';
import { trans } from '../../utils';
import history from '../../routes/history';

import './skills-header.scss';

export default function SkillsHeader(props) {
  const { activeLevel, task, skillsList } = props;

  const handelClick = (skill) => {
    history.push(`/learner/my-performance/level-${activeLevel}/skill/${skill}`);
  }

  const getModules = () => {
    const skills = skillsList.map((skill, key) => {
      return <li
        className={ `skills-header__list_item ${task === skill.toLowerCase() ? 'skills-header__list_item-active' : ''}` }
        key={ key } onClick={ () => handelClick(skill.toLowerCase()) }>
        <img
          src={ require(`../../assets/images/learner/module-tasks/module-tasks-icon-${skill.toLowerCase()}.svg`) }
          alt={ trans(skill) } className={ `skills-header__list_item_${task === skill.toLowerCase() ? 'active' : 'disable'}` }
        />
        <span className={ `skills-header__list_item_title${task === skill.toLowerCase() ? '_active' : ''}` }>{ trans(skill) }</span>
        {task === skill.toLowerCase() && <span className="skills-header__list_item_active-arrow"></span>}
      </li>;
    });

    return skills;
  }

  return (
    <div className="skills-header">
      <ul className="skills-header__list">
        { getModules() }
      </ul>
    </div>
  );
}
