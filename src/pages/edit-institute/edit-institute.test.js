import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditInstitute } from './index';

describe('<EditInstitute />', () => {
  const wrapper = shallow(<EditInstitute t={ () => '' } location={ () => '' }/>);

  it('Should render <EditInstitute />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  describe('When handleChange function is called', () => {
    const editInstitute = mount(<EditInstitute t={() => ''} location={ () => '' }/>);
  
    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'institutename',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(editInstitute.instance(), 'handleChange');
  
      editInstitute.instance().forceUpdate();
      editInstitute.find('input[name="institutename"]').simulate('change', event);
  
      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
