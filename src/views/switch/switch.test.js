import React from 'react';
import { shallow } from 'enzyme';
import Switch from './index.js';

let props ={ id: 'switch_1', isDisabled: false, isChecked: true, labelOn: 'Module', labelOff: 'Level' }
describe('Switch', () => {
  const wrapper = shallow(<Switch {...props} />);

  it('Should render <Switch />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('check if Switch has parent class', () => {
    const Switch = wrapper.find('.switch-container').length;
    expect(Switch).toBeGreaterThan(0);
  });

  it('check if Switch has toggle-lable class', () => {
    const toggle_lable = wrapper.find('.switch-container__toggle-label').length;
    expect(toggle_lable).toBeGreaterThan(0);
  });

  it('check switch renders correct props!', () => {
    const switchElement = wrapper.find('.switch-container__toggle-label_checkbox');
    expect(switchElement.length).toBeGreaterThan(0);

    expect(switchElement.prop('checked')).toEqual(true);
    expect(switchElement.prop('disabled')).toEqual(false);
    expect(switchElement.prop('id')).toEqual('switch_1');
    expect(switchElement.prop('value')).toEqual('switch_1');

    let switchLabelElement = wrapper.find('.switch-container__back_label');

    const switchLabelOnElement = switchLabelElement.find('.on');
    expect(switchLabelOnElement.length).toBeGreaterThan(0);
    expect(switchLabelOnElement.text()).toEqual('Module');

    const switchLabelOffElement = switchLabelElement.find('.off');
    expect(switchLabelOffElement.length).toBeGreaterThan(0);
    expect(switchLabelOffElement.text()).toEqual('Level');
  });

  it('check switch renders correct props, when change the props!', () => {
    props ={ id: 'switch_2', isDisabled: true, isChecked: false, labelOn: 'Module-2', labelOff: 'Level-2' }
    const wrapper = shallow(<Switch {...props} />);
    const switchElement = wrapper.find('.switch-container__toggle-label_checkbox');
    expect(switchElement.length).toBeGreaterThan(0);

    expect(switchElement.prop('checked')).toEqual(false);
    expect(switchElement.prop('disabled')).toEqual(true);
    expect(switchElement.prop('id')).toEqual('switch_2');
    expect(switchElement.prop('value')).toEqual('switch_2');
    
    let switchLabelElement = wrapper.find('.switch-container__back_label');

    const switchLabelOnElement = switchLabelElement.find('.on');
    expect(switchLabelOnElement.length).toBeGreaterThan(0);
    expect(switchLabelOnElement.text()).toEqual('Module-2');

    const switchLabelOffElement = switchLabelElement.find('.off');
    expect(switchLabelOffElement.length).toBeGreaterThan(0);
    expect(switchLabelOffElement.text()).toEqual('Level-2');
  });

  it('check switch backOn class. It should be when isChecked is true', () => {
    wrapper.setProps({ isChecked: false });
    let switchElementBackOn = wrapper.find('.backOn');
    expect(switchElementBackOn.length).toEqual(0);

    wrapper.setProps({ isChecked: true });
    switchElementBackOn = wrapper.find('.backOn');
    expect(switchElementBackOn.length).toBeGreaterThan(0);
  });
});
