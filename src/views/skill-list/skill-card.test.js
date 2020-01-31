import React from 'react';
import { shallow, mount } from 'enzyme';
import SkillCard from './skill-card';

let props = { colorClass: 'green', data:[{ content: 'Can understand simple technical information', linkTo: '', percentage: '77', }], sizeClass: 'small', header: 'Strong Performance', type: 'other' };

describe('<SkillCard />', () => {
  let wrapper = shallow(<SkillCard { ...props }/>);

  it('Should render <SkillCard />', () => {
    expect(SkillCard).toMatchSnapshot();
  })

  it('should render parent css for SkillCard', () => {
    expect(wrapper.find('.skill-list-container__performance-tile').length).toBeGreaterThan(0);
  });

  it('should render inner css for SkillCard', () => {
    expect(wrapper.find('.skill-list-container__performance-tile_left-icon').length).toBeGreaterThan(0);
    expect(wrapper.find('.skill-list-container__performance-tile_content').length).toBeGreaterThan(0);
    expect(wrapper.find('.skill-list-container__performance-tile_right-icon').length).toBeGreaterThan(0);
  });

  it('should render CircularChart component', () => {
    expect(wrapper.find('CircularChart').length).toBeGreaterThan(0);
  });

  it('should render correct props as supplied', () => {
    wrapper = mount(<SkillCard { ...props }/>);

    const CircularChart = wrapper.find('CircularChart');
    expect(CircularChart.length).toBeGreaterThan(0);
    expect(CircularChart.prop('percentage')).toEqual('77');
    expect(CircularChart.prop('colorClass')).toEqual('green');
    expect(CircularChart.prop('sizeClass')).toEqual('small');
    expect(CircularChart.prop('header')).toEqual('Strong Performance');
    expect(CircularChart.prop('type')).toEqual('other');

    const content = wrapper.find('.skill-list-container__performance-tile_content');
    expect(content.length).toBeGreaterThan(0);
    expect(content.text()).toEqual('Can understand simple technical information');

    const contentIcon = wrapper.find('.skill-list-container__performance-tile_right-icon');
    expect(contentIcon.length).toBeGreaterThan(0);
    contentIcon.find('img').at(0).simulate('click');
    wrapper.unmount();
  });

  it('should render correct props on change in props', () => {
    props = { data:[{ content: 'Can skim a short text to identify it’s main purpose', linkTo: '', percentage: '56', }], sizeClass: 'x-small', header: 'Weak Performance', type: 'weak' };
    wrapper = mount(<SkillCard { ...props }/>);

    const CircularChart = wrapper.find('CircularChart');
    expect(CircularChart.length).toBeGreaterThan(0);
    expect(CircularChart.prop('percentage')).toEqual('56');
    expect(CircularChart.prop('sizeClass')).toEqual('x-small');
    expect(CircularChart.prop('header')).toEqual('Weak Performance');
    expect(CircularChart.prop('type')).toEqual('weak');

    const content = wrapper.find('.skill-list-container__performance-tile_content');
    expect(content.length).toBeGreaterThan(0);
    expect(content.text()).toEqual('Can skim a short text to identify it’s main purpose');
  });
});