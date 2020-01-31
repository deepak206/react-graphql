import React from 'react';
import { shallow, mount } from 'enzyme';
import { AssignAdmin } from './index';

describe('<AssignAdmin />', () => {
  const props = { location: { details: 'Test' }}
  const wrapper = shallow(<AssignAdmin {...props}/>);

  it('Should render <AssignAdmin />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  it('should not call submit button initial', () => {
    wrapper.instance().handleSubmit = jest.fn();
    let { handleSubmit } = wrapper.instance();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  })

  describe('When handleChange function is called', () => {
    const assignAdmin = mount(<AssignAdmin/>);
  
    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'email',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(assignAdmin.instance(), 'handleChange');
  
      assignAdmin.instance().forceUpdate();
      assignAdmin.find('input[name="email"]').simulate('change', event);
  
      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
