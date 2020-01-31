import React from 'react';
import { shallow } from 'enzyme';
import LeftNavigation from './index';

describe('<LeftNavigation - Admin />', () => {
  const wrapper = shallow(<LeftNavigation t={ () => '' }/>);

  it('Should render <LeftNavigation - Admin />', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
