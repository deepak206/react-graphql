import React from 'react';
import { shallow, mount } from 'enzyme';
import LearningModules from './index';
import LearnerCard from '../../views/learner-card';

jest.mock('./index');

describe('<Learning Modules />', () => {
  const wrapper = shallow(<LearningModules />);
  
  it('<LearnerCard/> should be defined', () => {
    expect(LearnerCard).toBeDefined();
  });

	it('Should render <LearningModules />', () => {
      expect(wrapper).toMatchSnapshot();
  });
});
