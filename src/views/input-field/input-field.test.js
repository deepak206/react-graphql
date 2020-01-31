import React from 'react';
import { shallow, mount } from 'enzyme';
import InputField from './index';

describe('<InputField />', () => {
  const fieldErrors = {};
  const wrapper = shallow(<InputField label='test' errors= { fieldErrors } name="name" validationCallback={ jest.fn() } />);
  
	it('Should render <InputField />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <Error />', () => {
    expect(wrapper.find('Error').length).toEqual(0);
  });

  it('check whether component has class', () => {
    const wrapper = shallow(<InputField label='test' errors= { fieldErrors } name="name" validationCallback={ jest.fn() } />).dive();

    expect(wrapper.hasClass('form-group')).toEqual(true);
  });
});
