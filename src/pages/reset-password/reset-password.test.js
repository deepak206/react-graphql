import React from 'react';
import { shallow, mount } from 'enzyme';
import {ResetPassword} from './index';
import { BrowserRouter } from 'react-router-dom';

describe('<ResetPassword />', () => {
  const wrapper = shallow(<ResetPassword strenghtPop={false} t={() => ''}/>);

	it('Should render <ResetPassword />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <OnBoardingBackground />', () => {
    expect(wrapper.find('OnBoardingBackground').length).toBeGreaterThan(0);
  });

  it('should render <Button />', () => {
    const wrapper = mount(<BrowserRouter><ResetPassword t={() => ''}/></BrowserRouter>);
    const textBeforeClick = wrapper.find('Button').length;
    expect(textBeforeClick).toBeGreaterThan(0);
    wrapper.unmount();
  });
  
  it('check whether component has class', () => {
    const wrapper = shallow(<ResetPassword t={() => ''}/>).dive();
    expect(wrapper.find('.ResetPassword-page').length).toBe(1);
  });

  
  it('should have a `<form>` element', () => {
    const wrapper = shallow(<ResetPassword t={() => ''}/>).dive();
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  it('should have a `<form>` element', () => {
    const wrapper = shallow(<ResetPassword t={() => ''}/>).dive();
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  it('`<form>` element should have a onSubmit attribute', () => {
    const wrapper = shallow(<ResetPassword t={() => ''}/>).dive();
    expect(
      wrapper.find('form').props().onSubmit
    ).toBeDefined();
  });

  it('should fail if no credentials are provided', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const wrapper = mount(<BrowserRouter><ResetPassword t={() => ''}/></BrowserRouter>);
    expect(wrapper.find('.full-width').length).toBe(1);
    wrapper.find('.full-width').simulate('submit', fakeEvent);
    expect(wrapper.find('.is-invalid').length).toBe(2);
});
});
