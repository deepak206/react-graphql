import React from 'react';
import { shallow, mount } from 'enzyme';
import TestStatsCard from './index';
import BarChart from '../charts/bar-chart';
import CircleChart from '../circle-chart';
import readingIcon from '../../assets/images/theme-course/reading.svg';
import listenIcon from '../../assets/images/theme-course/listen.svg';
import grammerIcon from '../../assets/images/theme-course/grammer.svg';
import vocabIcon from '../../assets/images/theme-course/vocab.svg';

const props = {
  title: "Quiz 1 Results",
  index: 0,
  remediation: [
    {
      "image": "reading.svg",
      "status": true,
      "title": "Reading"
    },
    {
      "image": "listen.svg",
      "status": true,
      "title": "Listening"
    },
    {
      "image": "grammer.svg",
      "status": false,
      "title": "Grammar"
    },
    {
      "image": "vocab.svg",
      "status": false,
      "title": "Vocabulary"
    }
  ],
  result: {
    score: 50,
    total_answers: 10,
    total_questions: 16,
    avg_time: 7
  },
  graph: [ 50, 30, 20, 40 ]
};

const propsWithoutRemediation = {
  title: "Quiz 1 Results",
  index: 1,
  result: {
    score: 50,
    total_answers: 10,
    total_questions: 16,
    avg_time: 7
  },
  graph: [ 50, 30, 20, 40 ]
};

describe('TestStatsCard - check snapshot', () => {
  const wrapper = shallow(<TestStatsCard { ...props } />);

  it('Should render <TestStatsCard />', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TestStatsCard - Check required component', () => {
  it('BarChart should be defined', () => {
    expect(BarChart).toBeDefined();
  });

  it('CircleChart should be defined', () => {
    expect(CircleChart).toBeDefined();
  });
});

describe('TestStatsCard - check remediation block', () => {
  const wrapper = mount(<TestStatsCard { ...props } />);

  it('TestInstructions - remediation block should render', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation').length).toBeGreaterThan(0);
  });

  it('TestInstructions - Should render the card title', () => {
    expect(wrapper.find('.test-stats-card-heading__text').at(0).text()).toEqual(props.title);
  });

  it('TestInstructions - Should render all remediation skills', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content').length).toBe(props.remediation.length);
  });

  it('TestInstructions - Should render all remediation skills with title from props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_title').at(0).text()).toEqual(props.remediation[0].title);
  });

  it('TestInstructions - Should render all remediation skills with title from props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_title').at(1).text()).toEqual(props.remediation[1].title);
  });

  it('TestInstructions - Reading icon should be as per props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_icon').at(0).props().src.default).toEqual(readingIcon);
  });

  it('TestInstructions - listen icon should be as per props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_icon').at(1).props().src.default).toEqual(listenIcon);
  });

  it('TestInstructions - grammer icon should be as per props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_icon').at(2).props().src.default).toEqual(grammerIcon);
  });

  it('TestInstructions - vocab icon should be as per props', () => {
    expect(wrapper.find('.test-stats-card-content__skill-remediation_content_icon').at(3).props().src.default).toEqual(vocabIcon);
  });

  it('TestInstructions - Header backgroud color should be white', () => {
    expect(wrapper.find('.test-stats-card-heading').at(0).length).toBe(1);
  });

  const wrapperWithoutRemediation = mount(<TestStatsCard { ...propsWithoutRemediation } />);

  it('TestInstructions - remediation block should not render', () => {
    expect(wrapperWithoutRemediation
      .find('.test-stats-card-content__skill-remediation')
      .length)
      .toBe(0);
  });

  it('TestInstructions - Header backgroud color should be blue', () => {
    expect(wrapperWithoutRemediation.find('.test-stats-card-heading-blue').at(0).length).toBe(1);
  });
});
