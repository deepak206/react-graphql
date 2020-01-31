import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import EditLearner from './index';

it('EditLearner should render without crash', () => {
  shallow(<EditLearner />);
});

describe('EditLearner', () => {
  const props = { location: { details: 'Test' } }
  const wrapper = shallow(<EditLearner {...props} />);

  it('Should render <EditLearner />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  it('should render <SelectBox />', () => {
    expect(wrapper.find('SelectBox').length).toBeGreaterThan(0);
  });
  it('should not call submit button initial', () => {
    wrapper.instance().handleSubmit = jest.fn();
    const { handleSubmit } = wrapper.instance();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<EditLearner />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('should fail if values is not added in Input Fields', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const wrapper = mount(
      <BrowserRouter>
        <EditLearner />
      </BrowserRouter>,
    );

    expect(wrapper.find('.full-width').length).toBe(1);
    wrapper.find('.full-width').simulate('submit', fakeEvent);
    expect(wrapper.find('.is-invalid').length).toBe(4);
  });

  describe('When handleChange function is called', () => {
    const editLearner = mount(<EditLearner />);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'firstName',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(editLearner.instance(), 'handleChange');

      editLearner.instance().forceUpdate();
      editLearner.find('input[name="firstName"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
