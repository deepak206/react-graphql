import React from 'react';
import { shallow } from 'enzyme';
import Report from './index';
import LinearProgressBar from '../../views/linear-progress-bar';
import TestReport from '../../views/test-instructions';
import LearnerSubHeader from '../../views/learner-sub-header';

const props = { match: { params: { levelId: '1', type: 'quiz' } }}

describe('Report - Required components should be defined', () => {
    const wrapper = shallow(<Report { ...props }/>);

    it('Should render <Report />', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Report LinearProgressBar should be defined', () => {
      expect(LinearProgressBar).toBeDefined();
    });

    it('Report TestReport should be defined', () => {
        expect(TestReport).toBeDefined();
    });

    it('Report LearnerSubHeader should be defined', () => {
        expect(LearnerSubHeader).toBeDefined();
    });
});