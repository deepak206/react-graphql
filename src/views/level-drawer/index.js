import React, { useState, useEffect } from 'react';
import { indexFormat, trans } from '../../utils';
import history from '../../routes/history';

import './level-drawer.scss';

export default function LevelDrawer( props ) {
  const { activeLevel, startsAt, currentLevel } = props;

  const [ drawer, drawerToggle ] = useState(false);

  const [ currentActiveLevel, setCurrentActiveLevel ] = useState(currentLevel);

  useEffect(() => {
    if(currentActiveLevel !== currentLevel) {
      setCurrentActiveLevel(currentLevel)
    }
  }, [ currentActiveLevel, currentLevel ]);

  const arrowIcon = drawer ? 'toggle-arrow-up.svg' : 'toggle-arrow-down.svg';

  const handelLevelClick = (level) => {
    drawerToggle(!drawer);
    history.push(`/learner/my-performance/level-${level}/overall`);
  }

  const getLevels = () => {

    const levels = Array.from([ ...Array(10).keys() ]).filter((x) => x >= startsAt - 1).map((x) => {
      const key = x + 1;

      const className = currentLevel === key ? 'active' : activeLevel < key ? 'disabled' : 'default';

      if (activeLevel === key  ||  activeLevel > key) {
        return <li className={ `level-drawer__container_list_item level-drawer__container_list_item-${className}` }
          key={ key }
          onClick={ () => handelLevelClick(key) }>{ indexFormat(key) }</li>;
      }

      return <li className={ `level-drawer__container_list_item level-drawer__container_list_item-${className}` } key={ key }>{ indexFormat(key) }</li>;
    });

    return levels;
  }

  return (
    <div className={ `level-drawer ${!drawer && `level-drawer-hide`}` }>
      <div className="level-drawer__container">
        <div className="level-drawer__container_level-text">{ trans('Levels') }</div>
        <ul className="level-drawer__container_list">
          { getLevels() }
        </ul>
      </div>
      <div className={ `level-drawer__arrow-icon-${drawer ? 'active' : 'hide'}` } >
        <img
          src={
            require(
              `../../assets/images/learner/my-performance/${arrowIcon}`) }
          alt={ trans('arrow') }
          onClick={ () => drawerToggle(!drawer) }
        />
      </div>
    </div>
  );
}