import React from 'react';
import { shallow, mount } from 'enzyme';
import {SendLinkSuccess} from './send-link-success.js';
import { BrowserRouter } from 'react-router-dom';


describe('<SendLinkSuccess />', () => {
  const wrapper = shallow(<SendLinkSuccess t={() => ''}/>);

	it('Should render <SendLinkSuccess />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <OnBoardingBackground />', () => {
    expect(wrapper.find('OnBoardingBackground').length).toBeGreaterThan(0);
  });

  it('should render <Image />', () => {
    const wrapper = mount(<BrowserRouter><SendLinkSuccess t={() => ''}/></BrowserRouter>);
    const ImageClick = wrapper.find('img').length;
    expect(ImageClick).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('should render success links', () => {
    const wrapper = mount(<BrowserRouter><SendLinkSuccess t={() => ''}/></BrowserRouter>);
    const textBeforeClick = wrapper.find('.success-links').length;
    expect(textBeforeClick).toBeGreaterThan(0);
    wrapper.unmount();
  });
  
  it('check whether component has class .ResetPasswordSendLinkSuccess-page', () => {
    const wrapper = shallow(<SendLinkSuccess t={() => ''}/>).dive();
    expect(wrapper.find('.ResetPasswordSendLinkSuccess-page').length).toBe(1);
  });

  it('check whether component has class .full-width', () => {
    const wrapper = mount(<BrowserRouter><SendLinkSuccess t={() => ''}/></BrowserRouter>);
    expect(wrapper.find('.full-width').length).toBe(1);
  });

  it('check whether component has class .success-section', () => {
    const wrapper = mount(<BrowserRouter><SendLinkSuccess t={() => ''}/></BrowserRouter>);
    expect(wrapper.find('.success-section').length).toBe(1);
  });

});
