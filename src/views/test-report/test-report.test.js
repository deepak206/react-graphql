import React from 'react';
import { shallow, mount } from 'enzyme';
import TestReport from './index';
import Button from '../../views/button';
import LevelSuccessPopup from './level-success-popup';

import testSuccessIcon from '../../assets/images/learner/quiz/test_success_icon.svg';
import testRetakeIcon from '../../assets/images/learner/quiz/retake-test-icon.svg';
import reviewTestSuccessIcon from '../../assets/images/learner/quiz/review_test_success_complete.svg';
import levelTestSuccessIcon from '../../assets/images/learner/quiz/level_test_success_complete.svg';

const mockCallBack = jest.fn();

const props = { levelId: '1', type: 'quiz', score: '60', id: '1' };

describe('TestReport - check snapshot', () => {
    const wrapper = shallow(<TestReport { ...props } />);

    it('Should render <TestInstructions />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('TestReport - Button', () => {
    it('Button should be defined', () => {
        expect(Button).toBeDefined();
    });

    it('should render next button correctly', () => {
        const button = mount(
            <Button text='retake test' classname='btn-outlined' clickHandler={ mockCallBack }/>
        );

        button.find('button').at(0).simulate('click');
        
        expect(mockCallBack).toHaveBeenCalled();
    });
});

describe('TestReport - test the UI for quiz with score less than 70%', () => {
    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be continue', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("continue" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').text()).toEqual("Before we jump to the review test, let us help you strengthen your low performing skills via personalized remediation" );
    });

    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test img').props().src.default).toEqual(testRetakeIcon);
    });
});

describe('TestReport - test the UI for quiz with score greater than 70%', () => {
    const props = { levelId: '1', type: 'quiz', score: '72', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be continue', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("continue" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').text()).toEqual("You're halfway through! Take a review test before unlocking rest of the modules" );
    });

    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test img').props().src.default).toEqual(testSuccessIcon);
    });
});

describe('TestReport - test the UI for Review Test with score less than 70%', () => {
    const props = { levelId: '1', type: 'review_test', score: '62', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be retake test', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("retake test" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').at(0).text()).toEqual("Retake the review test, improve your score & get access to rest of the learning modules" );
    });

    it('TestInstructions - Should enable link after description', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').at(1).hasClass('gse')).toEqual(true);
    });

    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test img').props().src.default).toEqual(testRetakeIcon);
    });
});

describe('TestReport - test the UI for Review Test with score greater than 70%', () => {
    const props = { levelId: '1', type: 'review_test', score: '72', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be continue', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("continue" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').text()).toEqual("You’ve unlocked the next module! Continue with your learning journey" );
    });

    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test img').props().src.default).toEqual(reviewTestSuccessIcon);
    });
});

describe('TestReport - test the UI for Level Test with score less than 70%', () => {
    const props = { levelId: '1', type: 'level_test', score: '62', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be retake test', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("retake test" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').at(0).text()).toEqual("Retake the level test to strengthen your low performing skills before continuing with the remaining modules" );
    });

    it('TestInstructions - Should enable link after description', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text p').at(1).hasClass('gse')).toEqual(true);
    });

    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test img').props().src.default).toEqual(testRetakeIcon);
    });
});

describe('TestReport - test the UI for Level Test with score greater than 70%', () => {
    const props = { levelId: '1', type: 'level_test', score: '72', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Button text should be continue', () => {
        expect(wrapper.find('.test-report-container__btn-center .btn-outlined').at(0).text()).toEqual("continue" );
    });

    it('TestInstructions - Description should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_review-text').at(1).find('p').text()).toEqual("Congratulations! You’ve made it to the next level" );
    });

    it('TestInstructions - Should disable certificate section', () => {
        expect(wrapper.find('.certificate-section').length).toEqual(0);
    });
    
    it('TestInstructions - Description icon should be as per type', () => {
        expect(wrapper.find('.test-report-container__review-test_review-f2_icon-review-test').at(1).find('img').props().src.default).toEqual(levelTestSuccessIcon);
    });
});

describe('TestReport - test the UI for Level Test with score greater than 70% and level greater 6', () => {
    const props = { levelId: 7, type: 'level_test', score: '72', id: '1' };

    const wrapper = mount(<TestReport { ...props } />);

    it('TestInstructions - Should enable certificate section', () => {
        expect(wrapper.find('.test-report-container__certificate-section').length).toEqual(1);
    });
});