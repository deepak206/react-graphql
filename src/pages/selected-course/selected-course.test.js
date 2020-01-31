import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectedCourse from './index';
import CheckBox from '../../views/check-box';
import Button from '../../views/button';

const mockCallBack = jest.fn();
const props = { location: { details: 'Test', 
    courseData: [ {
    id: 2,
    isChecked: true,
    isHidden: true,
    isPlacement: false,
    isSelectedCourseOpen: false,
    levels: [ {id: 1,
      isChecked: true,
      isHidden: false,
      text: 'Level 1',
    },
    {
      id: 2,
      isChecked: true,
      isHidden: false,
      text: 'Level 2',
    },
    {
      id: 3,
      isChecked: true,
      isHidden: false,
      text: 'Level 3',
    } ],
    text: 'Foundation (Levels 1 - 3)',
  }] }};

it('SelectedCourse should render without crash', () => {
  shallow(<SelectedCourse { ...props }/>);
});

describe('<SelectedCourse />', () => {
  const wrapper = shallow(<SelectedCourse { ...props }/>);
  it('Should render <SelectedCourse />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render parent css for Add Course', () => {
    expect(wrapper.find('.add-course-container').length).toBeGreaterThan(0);
  });
  it('should render select course section correctly', () => {
    const wrapper = mount(<SelectedCourse { ...props }/>);
    expect(wrapper.find('.add-course-container__selected-courses').length).toBeGreaterThan(0);
    wrapper.unmount();
  });

});

describe('SelectedCourse - Button & CheckBox', () => {
  it('SelectedCourse should be defined', () => {
    expect(Button).toBeDefined();
  });
  it('should render next button correctly', () => {
    const next = mount(
      <Button text='next' classname='btn-outlined' clickHandler={ mockCallBack }/>
    );
    next.find('button').at(0).simulate('click');
  
    expect(mockCallBack).toHaveBeenCalled();
  
  });

  it('SelectedCourse should be defined', () => {
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
