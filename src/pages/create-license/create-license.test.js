import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateLicense } from './index';
import ViewLicense from '../view-license';
import { BrowserRouter } from 'react-router-dom';

describe('<CreateLicense />', () => {
  const wrapper = shallow(<CreateLicense />);

  it('Should render <CreateLicense />', () => {
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

  it('<ViewLicense/> should be defined', () => {
    expect(ViewLicense).toBeDefined();
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<CreateLicense />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<CreateLicense />);

    expect(wrapper.find('form').props().onSubmit).toBeDefined();
  });

  it('should render <Button />', () => {
    const wrapper = mount(
      <BrowserRouter>
        <CreateLicense />
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
        <CreateLicense />
      </BrowserRouter>,
    );

    expect(wrapper.find('.full-width').length).toBe(1);
    wrapper.find('.full-width').simulate('submit', fakeEvent);
    expect(wrapper.find('.is-invalid').length).toBe(4);
  });

  describe('When handleChange function is called', () => {
    const createLicense = mount(<CreateLicense />);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'licenseCount',
          value: '11',
        },
      };
      const handleOnChangeSpy = jest.spyOn(createLicense.instance(), 'handleChange');

      createLicense.instance().forceUpdate();
      createLicense.find('input[name="licenseCount"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
