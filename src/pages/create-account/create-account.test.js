import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CreateAccount} from './index';

configure({
  adapter: new Adapter()
});

describe('<Create Account />', () => {
  const wrapper = shallow(<CreateAccount t={() => ''}/>);

	it('Should render <Create Account />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  // it('should set state of errors is null', () => {
  //   expect(wrapper.state('errors')).toMatchObject({});
  // });

  describe('When handleChange function is called', () => {
    const createContact = mount(<CreateAccount t={() => ''}/>);
  
    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'name',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(createContact.instance(), 'handleChange');
  
      createContact.instance().forceUpdate();
      createContact.find('input[name="name"]').simulate('change', event);
  
      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
