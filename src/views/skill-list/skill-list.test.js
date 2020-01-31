import React from 'react';
import { shallow, mount } from 'enzyme';
import SkillList from './index';

let props = { colorClass: 'green', data:[{ content: 'Can understand simple technical information', linkTo: '', percentage: '77', }], sizeClass: 'small', header: 'Strong Performance', type: 'other' };

describe('<SkillList />', () => {
  let wrapper = shallow(<SkillList { ...props }/>);

  it('Should render <SkillList />', () => {
    expect(SkillList).toMatchSnapshot();
  })

  it('should render parent css for SkillList', () => {
    expect(wrapper.find('.skill-list-container').length).toBeGreaterThan(0);
  });

  it('should render header css for SkillList', () => {
    expect(wrapper.find('.skill-list-container__header').length).toBeGreaterThan(0);
    // Should render title
    expect(wrapper.find('.skill-list-container__header_span').length).toBeGreaterThan(0);
  });

  it('should render SkillCard component', () => {
    expect(wrapper.find('SkillCard').length).toBeGreaterThan(0);
  });

  it('should render correct props as supplied', () => {
    wrapper = mount(<SkillList { ...props }/>);
    expect(wrapper.find('.skill-list-container__header_span').length).toBeGreaterThan(0);
    expect(wrapper.find('.skill-list-container__header_span').text()).toEqual('Strong Performance');

    const skillCard = wrapper.find('SkillCard');
    expect(skillCard.length).toBeGreaterThan(0);
    expect(skillCard.prop('colorClass')).toEqual('green');
    expect(skillCard.prop('sizeClass')).toEqual('small');
    expect(skillCard.prop('header')).toEqual('Strong Performance');
    expect(skillCard.prop('type')).toEqual('other');

    const CircularChart = wrapper.find('CircularChart');
    expect(CircularChart.length).toBeGreaterThan(0);
    expect(CircularChart.prop('percentage')).toEqual('77');
    expect(skillCard.prop('colorClass')).toEqual('green');
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
    wrapper = mount(<SkillList { ...props }/>);
    expect(wrapper.find('.skill-list-container__header_span').length).toBeGreaterThan(0);
    expect(wrapper.find('.skill-list-container__header_span').text()).toEqual('Weak Performance');

    const skillCard = wrapper.find('SkillCard');
    expect(skillCard.length).toBeGreaterThan(0);
    expect(skillCard.prop('colorClass')).toEqual(undefined);
    expect(skillCard.prop('sizeClass')).toEqual('x-small');
    expect(skillCard.prop('header')).toEqual('Weak Performance');
    expect(skillCard.prop('type')).toEqual('weak');

    const CircularChart = wrapper.find('CircularChart');
    expect(CircularChart.length).toBeGreaterThan(0);
    expect(CircularChart.prop('percentage')).toEqual('56');
    expect(CircularChart.prop('colorClass')).toEqual('');
    expect(CircularChart.prop('sizeClass')).toEqual('x-small');
    expect(CircularChart.prop('header')).toEqual('Weak Performance');
    expect(CircularChart.prop('type')).toEqual('weak');

    const content = wrapper.find('.skill-list-container__performance-tile_content');
    expect(content.length).toBeGreaterThan(0);
    expect(content.text()).toEqual('Can skim a short text to identify it’s main purpose');
  });
});