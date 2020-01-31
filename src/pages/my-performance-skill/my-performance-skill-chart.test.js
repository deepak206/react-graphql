import React from 'react';
import { shallow, mount } from 'enzyme';
import MyPerformanceSkillChart from './my-performance-skill-chart';

const skillData = require('./content.json');
const props = { match: {params: { levelId: 4, skill: 'reading' }}, getPerformanceSkillData: () => {} , skillData };

describe('<MyPerformanceSkillChart />', () => {
  let wrapper = shallow(<MyPerformanceSkillChart { ...props } />);
  
  it('Should render <MyPerformanceSkillChart />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render parent css for MyPerformanceSkillChart', () => {
    expect(wrapper.find('.my-performance-skill__container_chart-section_chart').length).toBeGreaterThan(0);
  });

  it('should render inner components for MyPerformanceSkill', () => {
    let wrapper = mount(<MyPerformanceSkillChart { ...props } />);
    const BarChart = wrapper.find('BarChart');
    expect(BarChart.length).toBeGreaterThan(0);
    const Charts = BarChart.find('Charts');
    expect(Charts.length).toBeGreaterThan(0);
    wrapper.unmount();
  });
  
  it('check if props render as per data ', () => {
    let wrapper = mount(<MyPerformanceSkillChart { ...props } />);
    const BarChart = wrapper.find('BarChart');
    expect(BarChart.length).toBeGreaterThan(0);
    expect(BarChart.prop('maxBarThickness')).toEqual(70);

    const Charts = BarChart.find('Charts');
    expect(Charts.length).toBeGreaterThan(0);
    expect(Charts.prop('type')).toEqual('bar');
    wrapper.unmount();
  });
});