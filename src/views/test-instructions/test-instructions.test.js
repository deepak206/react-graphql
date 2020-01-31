import React from 'react';
import { shallow, mount } from 'enzyme';
import TestInstructions from './index';
import Button from '../../views/button';

const mockCallBack = jest.fn();

const props = { levelId: '1', type: 'quiz' };

describe('TestInstructions - check snapshot', () => {
    const wrapper = shallow(<TestInstructions { ...props } />);

    it('Should render <TestInstructions />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('TestInstructions - Button', () => {
    it('Button should be defined', () => {
        expect(Button).toBeDefined();
    });

    it('should render next button correctly', () => {
        const button = mount(
            <Button text='START QUIZ' classname='btn-outlined' clickHandler={ mockCallBack }/>
        );

        button.find('button').at(0).simulate('click');
        
        expect(mockCallBack).toHaveBeenCalled();
    });
});

describe('TestInstructions - test the UI for level test', () => {
    const levelTestProps = { levelId: '1', type: 'level_test' };

    const wrapper = mount(<TestInstructions { ...levelTestProps } />);

    it('TestInstructions - Button text should be START TEST', () => {
        expect(wrapper.find('.btn-outlined').at(0).text()).toEqual("START TEST" );
    });

    it('TestInstructions - Message should be as per type', () => {
        expect(wrapper.find('.test-instructions__review-test_review-lm h3').text()).toEqual("One more step to move to the next level!" );
    });
});

describe('TestInstructions - test the UI for quiz', () => {
    const wrapper = mount(<TestInstructions { ...props } />);

    it('TestInstructions - Button text should be START QUIZ', () => {
        expect(wrapper.find('.btn-outlined').at(0).text()).toEqual("START QUIZ" );
    });

    it('TestInstructions - Message should be as per type', () => {
        expect(wrapper.find('.test-instructions__review-test_review-lm h3').text()).toEqual("Get ready for a mid-level Quiz!" );
    });
});

describe('TestInstructions - test the UI for review test', () => {
    const reviewTestProps = { levelId: '1', type: 'review_test' };

    const wrapper = mount(<TestInstructions { ...reviewTestProps } />);

    it('TestInstructions - Button text should be START TEST', () => {
        expect(wrapper.find('.btn-outlined').at(0).text()).toEqual("START TEST" );
    });

    it('TestInstructions - Message should be as per type', () => {
        expect(wrapper.find('.test-instructions__review-test_review-lm h3').text()).toEqual("Time to take the Review test" );
    });
});

describe('TestInstructions - Test button class', () => {
    const props = { levelId: '1', type: 'review_test' };

    const wrapper = mount(<TestInstructions { ...props } />);  

    it('TestInstructions - Should have btn-outlined className', () => {
        expect(wrapper.find('button').hasClass('btn-outlined')).toEqual(true);
    });
});