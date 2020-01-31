import React from 'react';
import history from '../../routes/history';

import './learner-sub-header.scss';

export default function LearnerSubHeader(props) {
  const { backLink, content, type, breadcrumbs } = props;

  const backHandler = () => {
    history.push(backLink);
  }

  return (
    <div className={ `learner-sub-header ${type}-header-background bredcrumbs-title__main` }>
      {backLink && (<p onClick={ backHandler }>
        <img alt="back"
          src={ require('../../assets/images/learner/back-icon.svg') }/>
      </p>) }
      { content && (<h3 className={ `${type}-header-background__heading` }>
        { content }
      </h3>)}
      { breadcrumbs }
    </div>
  );
}
