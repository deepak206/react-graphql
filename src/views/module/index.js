/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import history from '../../routes/history';
import { indexFormat, getModuleUrl, getTaskUrl } from '../../utils';
import './module-card.scss';
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';

const Module = (props) => {
  const {
    activeLevel,
    cardDetails: {
      id,
      name,
      thumbnailUrl,
      orderNumber
    },
    courseId,
    totalTasks,
    completeTasks,
    active,
    userRole,
    progressBar,
    levelName
  } = props;

  const cardClickHandler = () => {
    if (active || completeTasks === totalTasks || userRole === 'master') {
      const BreadCrumbsData = {
        courseId,
        levelId: activeLevel
      };

      const urlData = {
        courseId,
        levelId: activeLevel,
        moduleId: id
      };

      props.breadcrumbs({
        loaded: true,
        fontSize: "16px",
        descriptionFontSize: "21px",
        pageTitle: `Module ${indexFormat(orderNumber)}`,
        activelast: true,
        breadcrumbs: [
          {
            title: levelName,
            route: getModuleUrl(BreadCrumbsData),
          }
        ] });

      history.push({
        activeLevel,
        activeModule: id,
        pathname: getTaskUrl(urlData),
        moduleData: props.cardDetails
      });
    }
  };

  return (
    <Card className={ `module-card ${(active || completeTasks === totalTasks || userRole === 'master') && 'clickable'}` } onClick={ cardClickHandler }>
      {userRole !== 'master' && <div className="module-card__icon-tick-green">
        {(totalTasks === completeTasks)
          ? <img alt="img"
            src={ require('../../assets/images/learner/learner-module/green-tick-icon.svg') }/>
          : !active && (<img alt="icon"
            src={ require('../../assets/images/learner/learner-module/module-lock-icon.svg') }/>)
        }
      </div> }
      <div className="module-card__box-img" style={ { backgroundImage: `url(${thumbnailUrl})` } }>
      </div>
      <p className={ `${(totalTasks === completeTasks || active) ? `module-card__card-title-2` : `module-card__card-title-4` }` }>{ name }</p>
      <div className="module-card__num">{  indexFormat(parseInt(orderNumber))  }</div>
      {/* {((totalTasks === completeTasks || active) && userRole !== 'master') && ( */}
      <div className="module-card__num_loader">
        <div className="module-card__num_loader_bar" style={ progressBar }/>
        <div className="module-card__num_loader_number">0%</div>
        {/* <div className="module-card__num_loader_number">{completeTasks} / {totalTasks} tasks completed</div> */}
      </div>
      {/* )} */}
    </Card>
  );
}

Module.defaultProps = {
  active: 0,
  totalTasks: 10,
  completeTasks: 0,
  userRole: 'master',
  progressBar: {
    width: "0%"
  }
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumbs: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  } });

export default connect(null, mapDispatchToProps)(Module);
