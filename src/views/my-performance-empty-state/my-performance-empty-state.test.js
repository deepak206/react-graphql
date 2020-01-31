import React from 'react';
import { shallow, mount } from 'enzyme';
import MyPerformanceEmptyState from './index';

let props = { activeLevel: '1' };

describe('<MyPerformanceEmptyState />', () => {
  let wrapper = shallow(<MyPerformanceEmptyState { ...props }/>);

  it('Should render <MyPerformanceEmptyState />', () => {
    expect(MyPerformanceEmptyState).toMatchSnapshot();
  })

  it('should render parent css for MyPerformanceEmptyState', () => {
    expect(wrapper.find('.my-performance-empty-container').length).toBeGreaterThan(0);
  });

  it('should render inner css for MyPerformanceEmptyState', () => {
    expect(wrapper.find('.my-performance-empty-container__icon').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-empty-container__icon_image').length).toBeGreaterThan(0);
    expect(wrapper.find('.my-performance-empty-container__title').length).toBeGreaterThan(0);

    expect(wrapper.find('.my-performance-empty-container__sub-title_p').length).toBeGreaterThan(0);

    expect(wrapper.find('.my-performance-empty-container__link').length).toBeGreaterThan(0);
});

  it('should render Link component', () => {
    expect(wrapper.find('Link').length).toBeGreaterThan(0);
  });

  it('should render correct props as supplied', () => {
    wrapper = mount(<MyPerformanceEmptyState { ...props }/>);

    const Link = wrapper.find('Link');
    expect(Link.length).toBeGreaterThan(0);
    expect(Link.prop('to')).toEqual('/learner/modules/level-1');
    expect(Link.prop('text')).toEqual('Go to Module');

    const content = wrapper.find('.my-performance-empty-container__title');
    expect(content.length).toBeGreaterThan(0);
    expect(content.text()).toEqual('No Data yet!');

    const link = wrapper.find('.lnk-blue');
    expect(link.length).toBeGreaterThan(0);
    link.simulate('click');
    wrapper.unmount();
  });

  it('should render correct props on change in props', () => {
    props = { activeLevel: '5' };
    wrapper = mount(<MyPerformanceEmptyState { ...props }/>);

    const Link = wrapper.find('Link');
    expect(Link.length).toBeGreaterThan(0);
    expect(Link.prop('to')).toEqual('/learner/modules/level-5');
    expect(Link.prop('text')).toEqual('Go to Module');
  });
});