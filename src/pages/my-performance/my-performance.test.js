import React from 'react';
import { shallow, mount } from 'enzyme';
import MyPerformance from './index';
import LearnerSubHeader from '../../views/learner-sub-header';
import SimpleTabs from '../../views/simple-tabs';
import LevelDrawer from '../../views/level-drawer';
import MyPerformanceSkill from '../my-performance-skill';
import MyPerformanceTest from '../my-performance-test';
import MyPerformanceOverall from '../my-performance-overall';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./index');

const props = {
    activeLevel: '4',
    activeTab: ["", "learner", "my-performance", "level-4", "overall"],
    urlPrefix: '/learner/my-performance/level-4',
    skillsList : [ "Reading", "Listening", "Writing", "Speaking", "Grammar", "Vocabulary" ],
    subRoutes: [
    {
      component: MyPerformanceOverall,
      exact: true,
      path: '/overall',
      title: 'Overall',
    },
    {
      component: MyPerformanceSkill,
      exact: true,
      path: '/skill/:skill',
      title: 'Skill',
    },
    {
      component: MyPerformanceTest,
      exact: true,
      path: '/test',
      title: 'Test',
    },
  ]
};

describe('MyPerformance - check snapshot', () => {

    const wrapper = shallow(<MyPerformance { ...props } />);

    wrapper.setState({
      activeLevel: 4,
    });

    it('Should render <MyPerformance />', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('LearnerSubHeader should be defined', () => {
        expect(LearnerSubHeader).toBeDefined();
    });

    it('SimpleTabs should be defined', () => {
        expect(SimpleTabs).toBeDefined();
    });

    it('LevelDrawer should be defined', () => {
        expect(LevelDrawer).toBeDefined();
    });
});
