import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskStoryboards from './index';
import TaskStoryboardsPopup from './task-storyboards-popup';
import TaskLearningJourneyPopup from './task-learning-journey-popup'
import Button from '../../views/button';

const mockCallBack = jest.fn();
const props = { match: { params: { levelId: '1', moduleId: '1' } }}

describe('<TaskStoryboards />', () => {
    const wrapper = shallow(<TaskStoryboards {...props}/>);
    wrapper.setState({
    isFirstVisit: false,
    isFirstVisitOfTaskJourney: false,
    isOpen: true,
    storyboards: {
        "description": "In this module, Priya, a girl from Odisha, joins a new class to learn the English Language. Let's see how she interacts with teacher Ms Simon and her fellow classmates.",
        "image": "story_1.png"            
    },
    });

    it('<TaskStoryboardsPopup/> should be defined', () => {
    expect(TaskStoryboardsPopup).toBeDefined();
    });

    it('Should render <LearningModules />', () => {
        expect(TaskStoryboards).toMatchSnapshot();
    })

    it('<TaskLearningJourneyPopup/> should be defined', () => {
        expect(TaskLearningJourneyPopup).toBeDefined();
    });

    it('should render parent css for task-storyboards', () => {
        const wrapper = shallow(<TaskStoryboards {...props}/>);
        expect(wrapper.find('.task-storyboards-container').length).toBeGreaterThan(0);
    });

    it('Should render <LearningModules />', () => {
        wrapper.setState({
            isOpen: false,
            activeModule: 1
        });
        expect(TaskStoryboardsPopup).toBeDefined();
    })

    it('should render click event of View Story', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        expect((wrapper.find('.text-blue').at(0)).length).toBeGreaterThan(0);
        wrapper.find('.text-blue').at(0).simulate('click');
        expect(wrapper.find('.task-storyboards-popup-dailogbox').length).toBeGreaterThan(0);
        wrapper.unmount();
      });

      it('should render click event of tasks image arrow icon', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        const tasksDiv = wrapper.find('.modules-review-test__container_arrow-icon_image');
        expect(tasksDiv.length).toBeGreaterThan(0);
        tasksDiv.find('img').at(0).simulate('click');
        wrapper.unmount();
      });

      it('storyboard popup should show but journey popup should not show if storyboard popup is open', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        wrapper.setState({
          isFirstVisit: false,
          isFirstVisitOfTaskJourney: false,
          isOpen: true,
          });
          const taskStoryboardsPopup = wrapper.find('TaskStoryboardsPopup');
          expect(taskStoryboardsPopup.length).toBeGreaterThan(0);

          const journeyPopup = wrapper.find('.active');
          expect(journeyPopup.length).toEqual(0);
        wrapper.unmount();
      });

      it('storyboard popup should not show when journey popup is open', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        wrapper.setState({
          isFirstVisit: true,
          isFirstVisitOfTaskJourney: false,
          isOpen: false,
          });
          const taskStoryboardsPopup = wrapper.find('TaskStoryboardsPopup');
          expect(taskStoryboardsPopup.length).toEqual(0);

          const journeyPopup = wrapper.find('.active');
          expect(journeyPopup.length).toEqual(1);
        wrapper.unmount();
      });

      it('check level and module id should be 1 and 1', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        wrapper.setState({
          isFirstVisit: false,
          isFirstVisitOfTaskJourney: false,
          isOpen: true,
          });
          const taskStoryboardsPopup = wrapper.find('TaskStoryboardsPopup');
          expect(taskStoryboardsPopup.prop('activeModule')).toEqual('1');
          expect(taskStoryboardsPopup.prop('activeLevel')).toEqual('1');
        wrapper.unmount();
      });

      it('check when storybord popup is opened its isOpen property should be true', () => {
        const wrapper = mount(<TaskStoryboards { ...props }/>);
        wrapper.setState({
          isFirstVisit: false,
          isFirstVisitOfTaskJourney: false,
          isOpen: true,
          });
          const taskStoryboardsPopup = wrapper.find('TaskStoryboardsPopup');
          expect(taskStoryboardsPopup.prop('isOpen')).toEqual(true);
        wrapper.unmount();
      });

});
describe('TaskStoryboards - Button & CheckBox', () => {
    it('TaskStoryboards should be defined', () => {
      expect(Button).toBeDefined();
    });
    it('should render next button correctly', () => {
      const next = mount(
        <Button text='next' classname='btn-outlined' clickHandler={ mockCallBack }/>
      );
      next.find('button').at(0).simulate('click');
    
      expect(mockCallBack).toHaveBeenCalled();
    
    });
});
