import React, { Component } from 'react';
import TestStatsCard from '../../views/test-stats-card';
import { connect } from 'react-redux';
import { getPerformanceTestData } from '../../dispatchers/performance-test-action-dispatcher';
import Loader from '../../views/loader';
import MyPerformanceEmptyState from '../../views/my-performance-empty-state';

import './my-performance-test.scss';

export class MyPerformanceTest extends Component {

  componentDidMount() {
    const { match: { params: { levelId } }, getPerformanceTestData } = this.props;

    getPerformanceTestData({ levelId });
  }

  render() {
    const { testData, isLoading } =  this.props;

    return (
      <div className='my-performance-test'>
        <div className='my-performance-test__container'>
          { isLoading && <Loader /> }
          { testData.length ? testData.map((data, index) => <TestStatsCard { ...data } key={ index } index={ index }/> ): <MyPerformanceEmptyState /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ performanceTestState: { testData, isLoading } }) => ({ testData, isLoading });

const mapDispatchToProps = (dispatch) => ({
  getPerformanceTestData: (levelId) => {
    dispatch(getPerformanceTestData(levelId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPerformanceTest);