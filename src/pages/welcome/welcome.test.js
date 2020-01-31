import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Welcome } from './index';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

it('it should render without crash', () => {
  shallow(<Welcome />);
});

describe('Welcome', () => {
  it('Render dialog component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
      );

    const textBeforeClick = wrapper.find('.dailogbox-container').length;

    expect(textBeforeClick).toBeNull;

    const dialogLink = wrapper.find('.welcome-container__middle-section_tc');

    dialogLink.simulate('click');

    const textAfterClick = wrapper.find('.dailogbox-container').length;

    expect(textAfterClick).toBeGreaterThan(0);

    wrapper.setState({ open: false });

    const dialogAfterCloseClick = wrapper.find('.dailogbox-container').length;

    expect(dialogAfterCloseClick).toBeNull;
  });
});
