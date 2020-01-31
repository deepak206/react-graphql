import React, { Component, Fragment } from 'react';
import { trans } from '../../utils';
import LearnerSubHeader from '../../views/learner-sub-header';
import SimpleTabs from '../../views/simple-tabs';
import LevelDrawer from '../../views/level-drawer';
import Configurations from '../../constants/configurations';

import './my-performance.scss';

class MyPerformance extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { levelId } }  } = props;

    this.state = {
      activeLevel: levelId,
    };
  }

  render() {
    const { activeLevel } = this.state;

    const { subRoutes, urlPrefix, location: { pathname }, match: { params: { levelId } } } = this.props;

    const activePath = pathname.split("/");

    return (
      <div className="my-performance">
        <LevelDrawer activeLevel={ activeLevel }  currentLevel={ levelId } startsAt={ 1 } />
        <LearnerSubHeader
          type={ 'my-performance' }
          content={
            <Fragment>
              <strong>{trans('Level')} {levelId}:</strong> { trans('My Performance') }
            </Fragment>
          }
        />
        <SimpleTabs activeLevel={ levelId } subRoutes={ subRoutes } urlPrefix={ urlPrefix }
          activeTab={ activePath[4] } myPerformanceTabs={ Configurations.myPerformanceTabs }/>
      </div>
    );
  }
}

export default MyPerformance;
