import React from 'react';
import { shallow, mount } from 'enzyme';
import { MyPerformanceSkill } from './index';

const skillData = require('./content.json');
const props = { match: {params: { levelId: 4, skill: 'reading' }}, getPerformanceSkillData: () => {} , skillData };

describe('<MyPerformanceSkill />', () => {
  let wrapper = shallow(<MyPerformanceSkill { ...props } />);

  it('Should render <MyPerformanceSkill />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render parent css for MyPerformanceSkill', () => {
    expect(wrapper.find('.my-performance-skill').length).toBeGreaterThan(0);
  });
  it('should render sub-parent css for MyPerformanceSkill', () => {
    expect(wrapper.find('.my-performance-skill__container').length).toBeGreaterThan(0); expect(wrapper.find('.my-performance-skill__container_card').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-skill__container_card-left').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-skill__container_card-right').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-skill__container_chart-section').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-skill__container_performance').length).toBeGreaterThan(0);
    
  });
  it('should render inner components for MyPerformanceSkill', () => {
    expect(wrapper.find('SkillsHeader').length).toBeGreaterThan(0);
    expect(wrapper.find('Loader').length).toEqual(0);
    expect(wrapper.find('CircleChart').length).toBeGreaterThan(0);
    expect(wrapper.find('MyPerformanceSkillRightCard').length).toBeGreaterThan(0);
    expect(wrapper.find('Switch').length).toBeGreaterThan(0);
    expect(wrapper.find('MyPerformanceSkillChart').length).toBeGreaterThan(0);
    expect(wrapper.find('SkillList').length).toBeGreaterThan(0);
  });
  
  it('check if props render as per data ', () => {
    const header = wrapper.find('SkillsHeader');
    expect(header.length).toBeGreaterThan(0);
    expect(header.prop('task')).toEqual('reading');
    expect(header.prop('activeLevel')).toEqual(4);

    const CircleChart = wrapper.find('CircleChart');
    expect(CircleChart.length).toBeGreaterThan(0);
    expect(CircleChart.prop('percentageValue')).toEqual("80");
    expect(CircleChart.prop('strokeWidth')).toEqual(12);
    expect(CircleChart.prop('radius')).toEqual(43);
    expect(CircleChart.prop('showText')).toEqual(false);

    const Switch = wrapper.find('Switch');
    expect(Switch.length).toBeGreaterThan(0);
    expect(Switch.prop('id')).toEqual("1");
    expect(Switch.prop('isChecked')).toEqual(false);
    expect(Switch.prop('isDisabled')).toEqual(false);
    expect(Switch.prop('labelOff')).toEqual("Level");
    expect(Switch.prop('labelOn')).toEqual("Module");

    const SkillList_strong = wrapper.find('.my-performance-skill__container_performance_strong').find('SkillList');
    expect(SkillList_strong.length).toBeGreaterThan(0);
    expect(SkillList_strong.prop('header')).toEqual("Strong Performance");
    expect(SkillList_strong.prop('type')).toEqual('strong');

    const SkillList_weak = wrapper.find('.my-performance-skill__container_performance_weak').find('SkillList');
    expect(SkillList_weak.length).toBeGreaterThan(0);
    expect(SkillList_weak.prop('header')).toEqual("Needs Improvement");
    expect(SkillList_weak.prop('type')).toEqual('weak');
  });
});