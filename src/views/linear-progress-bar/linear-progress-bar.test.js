import React from 'react';
import { shallow, mount } from 'enzyme';
import LinearProgressBar from './index';

describe('LinearProgressBar - check snapshot', () => {
    const wrapper = shallow(<LinearProgressBar completeTest={ 100 } />);

    it('Should render <LinearProgressBar />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('LinearProgressBar - Check UI for more than 85%', () => {
    const wrapper = mount(<LinearProgressBar completeTest={ 100 } />);

    it('<LinearProgressBar /> - Should add full-bar className', () => {
        expect(wrapper.find('.linerar-progress-bar__full-bar').length).toBe(1);
    });

    it('<LinearProgressBar /> - Should add progress-complete-text className', () => {
        expect(wrapper.find('.linerar-progress-bar__bar_progress-complete-text').length).toBe(1);
    });

    it('<LinearProgressBar /> - Check the innerHTML content of a paragraph', () => {
        expect(wrapper.find('.linerar-progress-bar__bar_progress-complete-text span').text()).toEqual("100 % completed" );
    });
});

describe('LinearProgressBar - Check UI for less than 85%', () => {
    const wrapper = mount(<LinearProgressBar completeTest={ 80 } />);

    it('<LinearProgressBar /> - Should add full-bar className', () => {
        expect(wrapper.find('.linerar-progress-bar__full-bar').length).toBe(0);
    });

    it('<LinearProgressBar /> - Should add bar-text className', () => {
        expect(wrapper.find('.linerar-progress-bar__bar-text').length).toBe(1);
    });

    it('<LinearProgressBar /> - Check the innerHTML content of a paragraph', () => {
        expect(wrapper.find('.linerar-progress-bar__progress-text span').text()).toEqual("80 % completed" );
    });
});