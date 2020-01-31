import React from 'react';
import { shallow, mount } from 'enzyme';
import {SuccessOrError} from './success-or-error.js';
import { BrowserRouter } from 'react-router-dom';

describe('<SuccessOrError />', () => {
  const wrapper = shallow(<SuccessOrError t={() => ''}/>);

	it('Should render <SuccessOrError />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <OnBoardingBackground />', () => {
    expect(wrapper.find('OnBoardingBackground').length).toBeGreaterThan(0);
  });

  it('should render <Image />', () => {
    const wrapper = mount(<BrowserRouter><SuccessOrError t={() => ''}/></BrowserRouter>);
    const ImageClick = wrapper.find('img').length;
    expect(ImageClick).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('should render success links', () => {
    const wrapper = mount(<BrowserRouter><SuccessOrError t={() => ''}/></BrowserRouter>);
    const textBeforeClick = wrapper.find('.success-links').length;
    expect(textBeforeClick).toBeGreaterThan(0);
    wrapper.unmount();
  });
  
  it('check whether component has class .ResetPasswordErrorOrSuccess-page', () => {
    const wrapper = shallow(<SuccessOrError t={() => ''}/>).dive();
    expect(wrapper.find('.ResetPasswordErrorOrSuccess-page').length).toBe(1);
  });

  it('check whether component has class .full-width', () => {
    const wrapper = mount(<BrowserRouter><SuccessOrError t={() => ''}/></BrowserRouter>);
    expect(wrapper.find('.full-width').length).toBe(1);
  });

  it('check whether component has class .success-section', () => {
    const wrapper = mount(<BrowserRouter><SuccessOrError t={() => ''}/></BrowserRouter>);
    expect(wrapper.find('.success-section').length).toBe(1);
  });

  describe('When validateFields method is called', () => {
    const wrapper = shallow(<SuccessOrError t={() => ''}/>);
    const instance = wrapper.instance();
    wrapper.setState({
      fieldErrors: {},
      fields: { email: '', password: '' }
    },)
  })
});
