import React from 'react';
import { shallow } from 'enzyme';
import Remediation from './index';

describe('Remediation', () => {
  let wrapper;

  it('Should render without crash', () => {
    wrapper = shallow(<Remediation match={ {params: { levelId: "" } } } />);
  });

  it('Should render tile-container', () => {
    expect(wrapper.find('.tile-container').length).toBeGreaterThan(0);
  });

  it('Should render <Remediation />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have tick icon if learner is strong is test', () => {
    const remediationJson = [
      {
        "image": "reading.svg",
        "status": true,
        "title": "Reading"
      }
    ];
    const wrapper = shallow(
      <Remediation
        match={ {params: { levelId: "" } } }
        remediationJson={ remediationJson } />
    );

    expect(wrapper.find(".test-done").length).toBe(1);
  });

  it('Should not have tick icon if learner is strong is test', () => {
    const remediationJson = [
      {
        "image": "reading.svg",
        "status": false,
        "title": "Reading"
      }
    ];
    const wrapper = shallow(
      <Remediation
        match={ {params: { levelId: "" } } }
        remediationJson={ remediationJson } />
    );

    expect(wrapper.find(".test-done").length).toBe(0);
  });

  it('Should render the proper count of boxes', () => {
    const remediationJson = [
      {
        "image": "reading.svg",
        "status": false,
        "title": "Reading"
      },
      {
        "image": "listen.svg",
        "status": true,
        "title": "Listening"
      }
    ];
    const wrapper = shallow(
      <Remediation
        match={ {params: { levelId: "" } } }
        remediationJson={ remediationJson } />
    );

    expect(wrapper.find(".test-box").length).toBe(2);
  });
});
