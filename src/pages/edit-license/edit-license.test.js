import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import EditLicense from './index';

describe('<EditLicense />', () => {
  const wrapper = shallow(<EditLicense />);

  it('Should render <EditLicense />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InputField />', () => {
    expect(wrapper.find('InputField').length).toBeGreaterThan(0);
  });

  it('should not call submit button initial', () => {
    wrapper.instance().handleSubmit = jest.fn();
    const { handleSubmit } = wrapper.instance();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<EditLicense />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<EditLicense />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('should render <Button />', () => {
    const wrapper = mount(
      <BrowserRouter>
        <EditLicense />
      </BrowserRouter>,
    );
    const textBeforeClick = wrapper.find('Button').length;

    expect(textBeforeClick).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('should fail if values is not added in Input Fields', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const wrapper = mount(
      <BrowserRouter>
        <EditLicense />
      </BrowserRouter>,
    );

    expect(wrapper.find('.full-width').length).toBe(1);
    wrapper.find('.full-width').simulate('submit', fakeEvent);
    expect(wrapper.find('.is-invalid').length).toBe(4);
  });

  describe('When handleChange function is called', () => {
    const editLicense = mount(<EditLicense />);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'licenseCount',
          value: '11',
        },
      };
      const handleOnChangeSpy = jest.spyOn(editLicense.instance(), 'handleChange');

      editLicense.instance().forceUpdate();
      editLicense.find('input[name="licenseCount"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
