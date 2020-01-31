import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckBox from './index.js';

describe('CheckBox', () => {
  const wrapper = shallow(<CheckBox id='chk-1'
  isChecked={ true } label='Checkbox' isToggleCheckbox={ false }></CheckBox>);

  it('Should render <CheckBox />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <CheckBox />', () => {
    expect(wrapper.find({ type: 'checkbox' }).length).toBeGreaterThan(0);
  });

  it('check if checkbox has checkbox class', () => {
    const ImageClick = wrapper.find('.checkbox').length;
    expect(ImageClick).toBeLessThanOrEqual(0);
  });

  it('check if checkbox has styled-checkbox class', () => {
    const ImageClick = wrapper.find('.styled-checkbox').length;
    expect(ImageClick).toBeGreaterThan(0);
  });

  it('valid component', () => {
    const wrapper = shallow(<CheckBox id='chk-1'
    isChecked={ true } isDisabled={true} label='Checkbox' isToggleCheckbox={ false }></CheckBox>);

    wrapper.setProps({ isChecked: true });
    let checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).toEqual(true);
    wrapper.setProps({ isChecked: false });
    checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).toEqual(false);
  });

});
