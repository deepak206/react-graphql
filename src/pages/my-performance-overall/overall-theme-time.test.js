import React from 'react';
import { shallow } from 'enzyme';
import OverallThemeTime from './overall-theme-time';

describe('OverallThemeTime', () => {
  it('should render without crash', () => {
    shallow(<OverallThemeTime />);
  });

  const wrapper = shallow(<OverallThemeTime />);

  it('should render <BarChart /> when data is passed', () => {
    const themegraph = {
      themegraph: {
        social: [70,50,20,30,50,10],
        professional: [50,60,50,30,20,30],
      }
    }
  
    const wrapper = shallow(<OverallThemeTime { ...themegraph }/>);

    expect(wrapper.find('BarChart').length).toBeGreaterThan(0);
  });

  it('should not crashed when data is not passed', () => {
    const themegraph = {
      themegraph: {}
    }
  
    const wrapper = shallow(<OverallThemeTime { ...themegraph }/>);

    expect(wrapper.find('BarChart').length).toBeGreaterThan(0);
  });


  it('should render legends', () => {
    expect(wrapper.find('.stackchart-paper-heading-legend').length).toBeGreaterThan(0);
  })

  it('should not render Doughnut when no data is passed', () => {
    const themegraph = {}
  
    const wrapper = shallow(<OverallThemeTime { ...themegraph }/>);

    expect(wrapper.find('DoughnutChart').length).toBe(0);
  });

  it('should render Doughnut', () => {
    const themegraph = {
      timeGraph: [ 60, 20, 40, 30, 20, 10 ]
    }
  
    const wrapper = shallow(<OverallThemeTime { ...themegraph }/>);

    expect(wrapper.find('DoughnutChart').length).toBeGreaterThan(0);
  });
});
