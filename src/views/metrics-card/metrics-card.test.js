import React from 'react';
import { shallow } from 'enzyme';
import MetricsCard from './index';
import moduleImage from'../../assets/images/learner/module-tasks/module-tasks-icon-reading.svg'

const props = { icon: 'learner/module-tasks/module-tasks-icon-reading.svg', subTitle: 'Learning Modules', title: '10 / 10',  }

describe('<MetricsCard />', () => {
  const wrapper = shallow(<MetricsCard { ...props }/>);

  it('Should render <MetricsCard />', () => {
    expect(MetricsCard).toMatchSnapshot();
  })

  it('should render parent css for MetricsCard', () => {
    expect(wrapper.find('.metrics-container').length).toBeGreaterThan(0);
  });

  it('should render header css for MetricsCard', () => {
    expect(wrapper.find('.metrics-container__header').length).toBeGreaterThan(0);
    // Should render title
    expect(wrapper.find('.metrics-container__header_title').length).toBeGreaterThan(0);
    // Should render sub-title
    expect(wrapper.find('.metrics-container__header_sub-title').length).toBeGreaterThan(0);
    
  });

  it('should render icon css for MetricsCard', () => {
    const metricscardIcon = wrapper.find('.metrics-container__icon');
    expect(metricscardIcon.length).toBeGreaterThan(0);

    expect(metricscardIcon.find('img').at(0).find('.metrics-container__icon_image').length).toBeGreaterThan(0);
  });  

  it('should render correct props as supplied', () => {
    const metricHeaderTitle = wrapper.find('.metrics-container__header_title');
    expect(metricHeaderTitle.length).toBeGreaterThan(0);

    expect(metricHeaderTitle.text()).toEqual('10 / 10');

    const metricHeaderSub_Title = wrapper.find('.metrics-container__header_sub-title');
    expect(metricHeaderSub_Title.length).toBeGreaterThan(0);

    expect(metricHeaderSub_Title.text()).toEqual('Learning Modules');

    const metricIconImage = wrapper.find('.metrics-container__icon_image');
    expect(metricIconImage.length).toBeGreaterThan(0);
    expect(metricIconImage.props().src.default).toEqual(moduleImage);
  });
});