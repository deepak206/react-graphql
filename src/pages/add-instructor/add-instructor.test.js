import React from 'react';
import { shallow, mount } from 'enzyme';
import { AddInstructor } from './index';

it('AddInstructor should render without crash', () => {
  shallow(<AddInstructor/>);
});

describe('AddInstructor', () => {
  const wrapper = shallow(<AddInstructor/>);

  it('Should render <AddInstructor />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  describe('When handleChange function is called', () => {
    const addInstructor = mount(<AddInstructor/>);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'firstName',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(addInstructor.instance(), 'handleChange');

      addInstructor.instance().forceUpdate();
      addInstructor.find('input[name="firstName"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
