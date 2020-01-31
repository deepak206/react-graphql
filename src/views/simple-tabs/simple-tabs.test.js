import React from 'react';
import { shallow, mount } from 'enzyme';
import SimpleTabs from './index';
import MyPerformanceOverall from '../../pages/my-performance-overall';
import MyPerformanceSkill from '../../pages/my-performance-skill';
import MyPerformanceTest from '../../pages/my-performance-test';
import { BrowserRouter } from 'react-router-dom';
import Configurations from '../../constants/configurations';

const props = {
    activeLevel: '4',
    activeTab: "overall",
    urlPrefix: '/learner/my-performance/level-4',
    myPerformanceTabs: Configurations.myPerformanceTabs,
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

describe('SimpleTabs - check snapshot', () => {

    const wrapper = shallow(<SimpleTabs { ...props } />);

    it('Should render <SimpleTabs />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('MyPerformance - check tab functionality', () => {
    const wrapper = mount(<BrowserRouter><SimpleTabs { ...props } /></BrowserRouter>);

    expect(wrapper.find('.simple-tabs__container_tabs').length).toBe(3);
});