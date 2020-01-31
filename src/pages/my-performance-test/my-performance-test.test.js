import React from 'react';
import { shallow, mount } from 'enzyme';
import { MyPerformanceTest } from './index';
import TestStatsCard from '../../views/test-stats-card';
import Loader from '../../views/loader';
import MyPerformanceEmptyState from '../../views/my-performance-empty-state';

const testData = require('./content.json');

const props = { match: { params: { levelId: 4 }}, testData, getPerformanceTestData: () => {} };

describe('MyPerformanceTest - check snapshot', () => {
  const wrapper = shallow(<MyPerformanceTest { ...props } />);

  it('Should render <MyPerformanceTest />', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('MyPerformanceTest - Check required component', () => {
  it('TestStatsCard should be defined', () => {
    expect(TestStatsCard).toBeDefined();
  });

  it('Loader should be defined', () => {
    expect(Loader).toBeDefined();
  });

  it('MyPerformanceEmptyState should be defined', () => {
    expect(MyPerformanceEmptyState).toBeDefined();
  });
});

describe('MyPerformanceTest - Should render cards', () => {
  const wrapper = mount(<MyPerformanceTest { ...props }/>);

  it('MyPerformanceTest - Should render cards', () => {
    expect(wrapper.find('.test-stats-card').length).toBe(4);
  });
});