import React from 'react';
import { shallow } from 'enzyme';
import MyPerformanceSkillRightCard from './my-performance-skill-right-card';

let props = { data: {llearningObj: '5 / 10', avgTime: "12s", acuracy: "81.5"} };

describe('<MyPerformanceSkillRightCard />', () => {
  let wrapper = shallow(<MyPerformanceSkillRightCard { ...props } />);

  it('Should render <MyPerformanceSkillRightCard />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render parent css for MyPerformanceSkillRightCard', () => {
    expect(wrapper.find('.my-performance-skill__container_card-right_content').length).toBeGreaterThan(0);
  });

  it('should render sub-parent css for MyPerformanceSkillRightCard', () => {
    expect(wrapper.find('.my-performance-skill__container_card-right_content_row-1').length).toBeGreaterThan(0); expect(wrapper.find('.my-performance-skill__container_card-right_content_row-2').length).toBeGreaterThan(0);
  });
  
  it('check if props render as per data ', () => {
    const content = wrapper.find('.my-performance-skill__container_card-right_content_row-1_p');
    expect(content.length).toBeGreaterThan(0);
    expect(content.at(0).text()).toEqual('5 / 10');
    expect(content.at(1).text()).toEqual('12s');
    expect(content.at(2).text()).toEqual('81.5%');

    const content1 = wrapper.find('.my-performance-skill__container_card-right_content_row-2');
    expect(content1.length).toBeGreaterThan(0);
    expect(content1.at(0).text()).toEqual('Learning Objectives');
    expect(content1.at(1).text()).toEqual('Avg. Time / Question');
    expect(content1.at(2).text()).toEqual('Accuracy');
  });

  it('check if props render correctly if data is changed ', () => {
    props = { data: {llearningObj: '10 / 10', avgTime: "5h 12m 12s", acuracy: "99"} };
    wrapper = shallow(<MyPerformanceSkillRightCard { ...props } />);

    const content = wrapper.find('.my-performance-skill__container_card-right_content_row-1_p');
    expect(content.length).toBeGreaterThan(0);
    expect(content.at(0).text()).toEqual('10 / 10');
    expect(content.at(1).text()).toEqual('5h 12m 12s');
    expect(content.at(2).text()).toEqual('99%');
  });
});