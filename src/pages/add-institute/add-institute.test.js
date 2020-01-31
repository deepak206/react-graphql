import React from 'react';
import { shallow, mount } from 'enzyme';
import AddInstitute from './index';

it('AddInstitute should render without crash', () => {
  shallow(<AddInstitute />);
});

describe('AddInstitute', () => {
  const wrapper = shallow(<AddInstitute />);

  it('Should render <AddInstitute />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });
  it('should have a `<form>` element', () => {
    const wrapper = shallow(<AddInstitute />);
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<AddInstitute />);
    expect(
      wrapper.find('form').props().onSubmit
    ).toBeDefined();
  });

  it('should not call submit button initial', () => {
    wrapper.instance().handleSubmit = jest.fn();
    let { handleSubmit } = wrapper.instance();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  })

  describe('When handleChange function is called', () => {
    const addInstitute = mount(<AddInstitute />);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'city',
          value: 'Mumbai',
        },
      };
      const handleOnChangeSpy = jest.spyOn(addInstitute.instance(), 'handleChange');

      addInstitute.instance().forceUpdate();
      addInstitute.find('select[name="city"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'instituteName',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(addInstitute.instance(), 'handleChange');

      addInstitute.instance().forceUpdate();
      addInstitute.find('input[name="instituteName"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
