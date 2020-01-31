import React from 'react';
import { shallow } from 'enzyme';
import OverallSkill from './overall-skill';

describe('OverallSkill', () => {
  const defaultProps = {
    fields: {
      moduleSelected: 0
    },
    status: ["in-progress", "pending", "pending", "completed"],
  }

  it('should render without crash', () => {
    shallow(<OverallSkill { ...defaultProps }/>);
  });

  const wrapper = shallow(<OverallSkill { ...defaultProps }/>);

  it('should render BarChart', () => {
    expect(wrapper.find('BarChart').length).toBeGreaterThan(0);
  });

  it('should render in-progress module on selected in-progres', () => {
    const defaultProps = {
      fields: {
        moduleSelected: 2
      },
      status: ["pending", "pending", "in-progress", "completed"],
      graph: [
        [50, 30, 20, 40, 70, 50],
        [5, 0, 0, 5, 0, 0 ],
        [10, 30, 70, 50, 60, 25],
        [50, 30, 20, 40, 70, 50]
      ],
    }

    const wrapper = shallow(<OverallSkill { ...defaultProps }/>);

    expect(wrapper.find("img[alt='module-progressimg']").length).toBeGreaterThan(0);
  });

  it('should render pending image on selected pending module', () => {
    const defaultProps = {
      fields: {
        moduleSelected: 0
      },
      status: ["pending"],
      graph: [
        [50, 30, 20, 40, 70, 50],
      ],
    }

    const wrapper = shallow(<OverallSkill { ...defaultProps }/>);

    expect(wrapper.find("img[alt='module-pendingimg']").length).toBeGreaterThan(0);
  });

  it('should render SelectBox', () => {
    expect(wrapper.find('SelectBox').length).toBeGreaterThan(0);
  });

  it('should not crashed on no selected module passed', () => {
    const defaultProps = {
      fields: {},
    }

    shallow(<OverallSkill { ...defaultProps }/>);
  });
});
