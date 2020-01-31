import React from 'react';
import { shallow } from 'enzyme';
import CircularChart from './index';

let props = { percentage: '70', type: 'strong' };

describe('<CircularChart />', () => {
  let wrapper = shallow(<CircularChart { ...props }/>);

  it('Should render <CircularChart />', () => {
    expect(CircularChart).toMatchSnapshot();
  })

  it('should render parent css for CircularChart', () => {
    expect(wrapper.find('.circular-chart-container').length).toBeGreaterThan(0);
  });

  it('should render chart css for CircularChart', () => {
    expect(wrapper.find('.circular-chart-container__c100').length).toBeGreaterThan(0);
  });
  
  it('check if type is strong and percentage 70 then ', () => {
    expect(wrapper.find('.p70').length).toBeGreaterThan(0);
    expect(wrapper.find('.x-small').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-blue').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-blue').text()).toEqual(' 70% ');
    expect(wrapper.find('.circular-chart-container__c100_slice-blue').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_circle-blue').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_fill-blue').length).toBeGreaterThan(0);  
  });

  it('check if type is weak and percentage 50 then ', () => {
    props = { percentage: '50', type: 'weak' }
    wrapper = shallow(<CircularChart { ...props }/>);
    expect(wrapper.find('.p50').length).toBeGreaterThan(0);
    expect(wrapper.find('.x-small').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-brown').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-brown').text()).toEqual(' 50% ');
    expect(wrapper.find('.circular-chart-container__c100_slice-brown').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_circle-brown').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_fill-brown').length).toBeGreaterThan(0);  
  });

  it('check if sizeClass is small, type is weak and percentage 50 then ', () => {
    props = { colorClass: 'green', sizeClass: 'small', percentage: '85', type: 'other' }
    wrapper = shallow(<CircularChart { ...props }/>);
    expect(wrapper.find('.p85').length).toBeGreaterThan(0);
    expect(wrapper.find('.small').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-green').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_text-green').text()).toEqual(' 85% ');
    expect(wrapper.find('.circular-chart-container__c100_slice-green').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_circle-green').length).toBeGreaterThan(0);
    expect(wrapper.find('.circular-chart-container__c100_fill-green').length).toBeGreaterThan(0);  
  });
});