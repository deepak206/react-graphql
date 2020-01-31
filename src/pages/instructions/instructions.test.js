import React from 'react';
import { shallow, mount } from 'enzyme';
import Instructions from './index';
import LinearProgressBar from '../../views/linear-progress-bar';
import TestInstructions from '../../views/test-instructions';
import LearnerSubHeader from '../../views/learner-sub-header';

const props = { match: { params: { levelId: '1', moduleId: '1', type: 'quiz', id: '1' } }}

describe('Instructions - Required components should be defined', () => {
    const wrapper = shallow(<Instructions { ...props }/>);

    it('Should render <Instructions />', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Instructions LinearProgressBar should be defined', () => {
      expect(LinearProgressBar).toBeDefined();
    });

    it('Instructions TestInstructions should be defined', () => {
        expect(TestInstructions).toBeDefined();
    });

    it('Instructions TestInstructions should be defined', () => {
        expect(LearnerSubHeader).toBeDefined();
    });
});