import React from 'react';
import { shallow } from 'enzyme';
import { MyPerformanceOverall } from './index';

describe('MyPerformanceOverall', () => {
  const defaultProps = {
      match: { params: { levelId: 123 } },
  };

  it('should render without crash', () => {
    shallow(<MyPerformanceOverall {...defaultProps}/>);
  });

  it('should not render <MetricsCard /> when no data is passed', () => {
    const wrapper = shallow(<MyPerformanceOverall {...defaultProps}/>);

    expect(wrapper.find('MetricsCard').length).toBe(0);
  });

  it('should render module <MetricsCard /> when module props are passed', () => {
    const moduleResult = {
      skillResult: {
        moduleResult: {
          completed: 5,
          total: 10
        },
      }
    }
    const wrapper = shallow(<MyPerformanceOverall { ...moduleResult } {...defaultProps}/>);

    expect(wrapper.find('.performance-overall-resultcard-grid__item-module').length).toBeGreaterThan(0);
  });

  it('should render task <MetricsCard /> when module task props are passed', () => {
    const moduleResult = {
      skillResult: {
        taskResult: {
          completed: 20,
          total: 80
        },
      }
    }
    const wrapper = shallow(<MyPerformanceOverall { ...moduleResult } {...defaultProps}/>);

    expect(wrapper.find('.performance-overall-resultcard-grid__item-task').length).toBeGreaterThan(0);
  });

  it('should render <OverallThemeTime />', () => {
    const wrapper = shallow(<MyPerformanceOverall {...defaultProps}/>);

    expect(wrapper.find('OverallThemeTime').length).toBeGreaterThan(0);
  });


  it('should render <OverallSkill />', () => {
    const wrapper = shallow(<MyPerformanceOverall {...defaultProps}/>);

    expect(wrapper.find('OverallSkill').length).toBeGreaterThan(0);
  });
});
