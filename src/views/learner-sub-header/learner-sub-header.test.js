import React from 'react';
import { shallow, mount } from 'enzyme';
import LearnerSubHeader from './index';

describe('LearnerSubHeader - check snapshot', () => {
    const props = { backLink: '', content: 'Quiz', type: 'quiz' };

    const wrapper = shallow(<LearnerSubHeader { ...props } />);

    it('Should render <LearnerSubHeader />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('LearnerSubHeader - check different cases as per input', () => {
    const propsWithOutLink = { backLink: '', content: 'Quiz', type: 'quiz' };

    const wrapper = shallow(<LearnerSubHeader { ...propsWithOutLink } />);

    it('Should not render back button if link is empty <LearnerSubHeader />', () => {
        expect(wrapper.find('.learner-sub-header img').length).toBe(0);
    });

    it('Should add class name as per type prop <LearnerSubHeader />', () => {
        expect(wrapper.find('.quiz-header-background').length).toBe(1);
    });

    const propsWithLink = { backLink: '/learner/modules/1', content: 'Quiz', type: 'quiz' };

    const wrapperWithLink = shallow(<LearnerSubHeader { ...propsWithLink } />);

    it('Should render back button <LearnerSubHeader />', () => {
        expect(wrapperWithLink.find('.learner-sub-header img').length).toBe(1);
    });
});