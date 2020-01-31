import React from 'react';
import { shallow, mount } from 'enzyme';
import SkillsHeader from './index';

const props = { activeLevel: '4', task: 'reading', skillsList: [ "Reading", "Listening", "Writing", "Speaking", "Grammar", "Vocabulary" ]};

describe('SkillsHeader - check snapshot', () => {
    const wrapper = shallow(<SkillsHeader { ...props } />);

    it('Should render <SkillsHeader />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('SkillsHeader - Reading tab should be active as per props', () => {

    const wrapper = mount(<SkillsHeader { ...props } />);

    it('Reading tab should have active class', () => {
        expect(wrapper.find('.skills-header__list_item').at(0).hasClass('skills-header__list_item-active')).toEqual(true);
    });
});