import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Score } from './index';

configure({ adapter: new Adapter() });

it('it should render without crash', () => {
  shallow(<Score t={ () => '' }/>);
});

describe('Score', () => {
  const wrapper = shallow(<Score t={ () => '' }/>);

  it('check the length of score', () => {
    expect(wrapper.find('.score-container__levels_score-points').children()).toHaveLength(10);
  });
});
