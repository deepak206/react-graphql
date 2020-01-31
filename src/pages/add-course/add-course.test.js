import React from 'react';
import { shallow, mount } from 'enzyme';
import AddCourse from './index';
import CheckBox from '../../views/check-box';
import Button from '../../views/button';

const mockCallBack = jest.fn();

it('AddCourse should render without crash', () => {
  const props = { location: { details: 'Test' }}
  shallow(<AddCourse { ...props }/>);
});

describe('<AddCourse />', () => {
  const props = { location: { details: 'Test' }}
  const wrapper = shallow(<AddCourse { ...props }/>);
  it('Should render <AddCourse />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render parent css for Add Course', () => {
    expect(wrapper.find('.add-course-page').length).toBeGreaterThan(0);
  });

  it('should render slect course section if nextStepCount = 1', () => {
    const props = { location: { details: 'Test' }}
    const wrapper = mount(<AddCourse { ...props }/>);
    expect(wrapper.find('.form-area').length).toBeGreaterThan(0);
    expect(wrapper.find('.selected-courses-section').length).toEqual(0);
    expect(wrapper.find('.theme-course').length).toEqual(0);

    wrapper.setState({ courseData: [] });
    expect(wrapper.find('.ac-list').length).toEqual(0);

    wrapper.setState({ courseData: [{
      id: 1, isChecked: true, isCustomCourse: false,isCustomCourseOpen: false, isHidden: true, isPlacement: false, isSelectedCourseOpen: false, text: 'Professional (Levels 4 - 6) ',
    }] });

    expect(wrapper.find('.ac-list as-accordion').length).toEqual(0);

    expect(wrapper.find('.ac-list').length).toBeGreaterThan(0);

    wrapper.find('CheckBox').simulate('change', {target: {checked: false}});
    expect((wrapper.find('img')).find('.img-up').length).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('should render custom course section if isCustomCourseOpen true/false', () => {
    const props = { location: { details: 'Test' }}
    const wrapper = mount(<AddCourse { ...props }/>);
    wrapper.setState({ courseData: [{
      id: 1, isChecked: true, isCustomCourse: false,isCustomCourseOpen: false, isHidden: true, isPlacement: false, isSelectedCourseOpen: false, text: 'Professional (Levels 4 - 6) ',
    }] });

    const customCourseSection = wrapper.find('.add-course');

    expect(customCourseSection.find('span').at(0).props().onClick).toBeDefined();
    expect(customCourseSection.find('img').at(0).props().onClick).toBeDefined();

    customCourseSection.find('span').at(0).simulate('click', mockCallBack);
    expect(customCourseSection.find('.form-area mt15 pb30').length).toBe(0);

    wrapper.setState({ courseData: [{
      id: 1, isChecked: true, isCustomCourse: false,isCustomCourseOpen: true, isHidden: true, isPlacement: false, isSelectedCourseOpen: false, text: 'Professional (Levels 4 - 6) ',
    }] });

    wrapper.find('Button').at(0).simulate('click', mockCallBack);
    expect(wrapper.find('.is-invalid').length).toBe(1);
    expect(wrapper.find('.Please-select-a-leve').length).toBe(1);
    wrapper.unmount();
  });

  it('should render click event correctly', () => {
    expect((wrapper.find('img').at(0)).find('.img-up').length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('img').at(0)).find('.img-down').length).toBeGreaterThan(0);
  });

  it('should render Modules and Quiz Remediations correctly on click on course', () => {
    const wrapper = mount(<AddCourse { ...props }/>);
    expect((wrapper.find('.img-up').at(0)).length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('#quizrem-211').at(0)).prop('isChecked')).toEqual(true);
    wrapper.unmount();
  });
  it('should render click event of modules', () => {
    const wrapper = mount(<AddCourse { ...props }/>);
    expect((wrapper.find('.img-up').at(0)).length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('#quizrem-211').at(1)).prop('checked')).toEqual(true);
    expect((wrapper.find('#quizrem-211').at(0)).prop('isChecked')).toEqual(true);
    wrapper.find('#quizrem-211').at(1).simulate('change', {target: {checked: false}});
    expect(wrapper.find('#quizrem-211').at(1).prop('checked')).toEqual(false);
    wrapper.unmount();
  });

  it('should render click event of Remediations', () => {
    const wrapper = mount(<AddCourse { ...props }/>);
    expect((wrapper.find('.img-up').at(0)).length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('#quizrem-223').at(1)).prop('checked')).toEqual(true);
    expect((wrapper.find('#quizrem-223').at(0)).prop('isChecked')).toEqual(true);
    wrapper.find('#quizrem-223').at(1).simulate('change', {target: {checked: false}});
    expect(wrapper.find('#quizrem-223').at(1).prop('checked')).toEqual(false);
    wrapper.unmount();
  });

  it('Level test should be disabled and checked true', () => {
    const wrapper = mount(<AddCourse { ...props }/>);
    expect((wrapper.find('.img-up').at(0)).length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('#quizrem-226').at(1)).prop('checked')).toEqual(true);
    expect((wrapper.find('#quizrem-226').at(0)).prop('isChecked')).toEqual(true);
    expect((wrapper.find('#quizrem-226').at(1)).prop('disabled')).toEqual(true);
    expect((wrapper.find('#quizrem-226').at(0)).prop('isDisabled')).toEqual(true);
    wrapper.find('#quizrem-226').at(1).simulate('change');
    expect(wrapper.find('#quizrem-226').at(1).prop('checked')).toEqual(false);
    wrapper.unmount();
  });

  it('Levels unders courses should be disabled true', () => {
    const wrapper = mount(<AddCourse { ...props }/>);
    expect((wrapper.find('.img-up').at(0)).length).toBeGreaterThan(0);
    wrapper.find('.img-up').at(0).simulate('click');
    expect((wrapper.find('#level-21').at(1)).prop('checked')).toEqual(true);
    expect((wrapper.find('#level-21').at(0)).prop('isChecked')).toEqual(true);
    expect((wrapper.find('#level-21').at(1)).prop('disabled')).toEqual(true);
    expect((wrapper.find('#level-21').at(0)).prop('isDisabled')).toEqual(true);
    wrapper.unmount();
  });
  
  it('should render placement checkbox if placement is true. ', () => {
    const props = { location: { details: 'Test' }}
    const wrapper = mount(<AddCourse { ...props }/>);
    wrapper.setState({ courseData: [{
      id: 1, isChecked: true, isCustomCourse: false, isHidden: true, isPlacement: true, placement: true, isSelectedCourseOpen: false, text: 'Professional (Levels 4 - 6) ',
    }] });
    const checkboxPlacement = wrapper.find('CheckBox');
    expect(checkboxPlacement.at(1).find('CheckBox').length).toBeGreaterThan(0);
    wrapper.unmount();
  });
});

describe('AddCourse - Button & CheckBox', () => {
  it('AddCourse should be defined', () => {
    expect(Button).toBeDefined();
  });
  it('should render next button correctly', () => {
    const next = mount(
      <Button text='next' classname='btn-outlined' clickHandler={ mockCallBack }/>
    );
    next.find('button').at(0).simulate('click');
  
    expect(mockCallBack).toHaveBeenCalled();
  
  });

  it('AddCourse should be defined', () => {
    expect(CheckBox).toBeDefined();
  });
  it('should render CheckBox correctly', () => {
    const checkBox = shallow(
      <CheckBox  id={ 1 } onChange={ mockCallBack } isChecked={ true } label={ 'test-checkbox' } isToggleCheckbox={ false }  />
    );
    const label = checkBox.find('label');
    label.simulate('click');
    expect(mockCallBack).toBeCalled();
  });
});
