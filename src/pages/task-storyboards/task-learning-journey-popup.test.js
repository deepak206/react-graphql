import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskLearningJourneyPopup from './task-learning-journey-popup'
import Button from '../../views/button';

const mockCallBack = jest.fn();

describe('<TaskLearningJourneyPopup />', () => {
    const wrapper = shallow(<TaskLearningJourneyPopup />);

    it('Should render <TaskLearningJourneyPopup />', () => {
        expect(TaskLearningJourneyPopup).toMatchSnapshot();
    })

    it('should render parent css for TaskLearningJourneyPopup', () => {
        expect(wrapper.find('.popover').length).toBeGreaterThan(0);
    });
    it('should render <Button />', () => {
        const wrapper = mount(<TaskLearningJourneyPopup/>);
        const button = wrapper.find('Button');
        expect(button.length).toBeGreaterThan(0);
        expect(button.find('.btn-outlined').length).toBeGreaterThan(0);
        wrapper.unmount();
    });

});
describe('TaskLearningJourneyPopup - Button', () => {
    it('TaskLearningJourneyPopup should be defined', () => {
      expect(Button).toBeDefined();
    });
    it('should render done button correctly', () => {
      const next = mount(
        <Button text='done' classname='btn-outlined' clickHandler={ mockCallBack }/>
      );
      next.find('button').at(0).simulate('click');
    
      expect(mockCallBack).toHaveBeenCalled();
    
    });
});
