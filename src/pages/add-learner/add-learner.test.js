import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AddLearner from './index';

it('AddLearner should render without crash', () => {
  shallow(<AddLearner />);
});

describe('AddLearner', () => {
  const props = { location: { details: 'Test' } }
  const wrapper = shallow(<AddLearner {...props} />);

  it('Should render <AddLearner />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  it('should render <SelectBox />', () => {
    expect(wrapper.find('SelectBox').length).toBeGreaterThan(0);
  });
  it('should render <CheckBox />', () => {
    expect(wrapper.find('CheckBox').length).toBeGreaterThan(0);
  });
  it('should render <DatePicker />', () => {
    expect(wrapper.find('DatePicker').length).toBeGreaterThan(0);
  });
  it('should not call submit button initial', () => {
    wrapper.instance().handleSubmit = jest.fn();
    const { handleSubmit } = wrapper.instance();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<AddLearner />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('should fail if values is not added in Input Fields', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const wrapper = mount(
      <BrowserRouter>
        <AddLearner />
      </BrowserRouter>,
    );

    expect(wrapper.find('.full-width').length).toBe(1);
    wrapper.find('.full-width').simulate('submit', fakeEvent);
    expect(wrapper.find('.is-invalid').length).toBe(4);
  });

  describe('When handleChange function is called', () => {
    const addLearner = mount(<AddLearner />);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'firstName',
          value: 'Test',
        },
      };
      const handleOnChangeSpy = jest.spyOn(addLearner.instance(), 'handleChange');

      addLearner.instance().forceUpdate();
      addLearner.find('input[name="firstName"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
