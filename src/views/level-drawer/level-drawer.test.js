import React from 'react';
import { shallow, mount } from 'enzyme';
import LevelDrawer from './index';

describe('LevelDrawer - check snapshot', () => {
    const props = { activeLevel: '4',  startsAt: 1, currentLevel: '3' };

    const wrapper = shallow(<LevelDrawer { ...props } />);

    it('Should render <LevelDrawer />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('LevelDrawer - Check levels for different state', () => {
    const props = { activeLevel: '4',  startsAt: 1, currentLevel: '3' };

    const wrapper = mount(<LevelDrawer { ...props } />);

    expect(wrapper.find('.level-drawer__container_list_item-active').length).toBe(1);
    expect(wrapper.find('.level-drawer__container_list_item-disabled').length).toBe(6);
    expect(wrapper.find('.level-drawer__container_list_item-visited').length).toBe(3);
});

describe('LevelDrawer - Should open drawer on button click', () => {
    const props = { activeLevel: '4',  startsAt: 1, currentLevel: '3' };

    const wrapper = mount(<LevelDrawer { ...props } />);

    expect(wrapper.find('.level-drawer__arrow-icon-hide').length).toBe(1);

    wrapper.find('.level-drawer__arrow-icon-hide img').simulate('click');
    expect(wrapper.find('.level-drawer__arrow-icon-active').length).toBe(1);
});