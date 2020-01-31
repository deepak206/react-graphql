import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskStoryboardsPopup from './task-storyboards-popup';
import Button from '../../views/button';
import taskImage from '../../assets/images/learner/learner-module/level_1/story/story_1.png';

const storyboard = {
    "description": "In this module, Priya, a girl from Odisha, joins a new class to learn the English Language. Let's see how she interacts with teacher Ms Simon and her fellow classmates.",
    "image": "story_1.png"            
};

const mockCallBack = jest.fn();

describe('<TaskStoryboardsPopup />', () => {
    const wrapper = mount(<TaskStoryboardsPopup
        activeModule={ 1 }
        storyboards={ storyboard }
        activeLevel={ 1 }
        isOpen={ true }
        handleClose={ mockCallBack }
      />);

    it('Should render <TaskStoryboardsPopup />', () => {
        expect(TaskStoryboardsPopup).toMatchSnapshot();
    });   

    it("Should renders an image", () => {
        expect(wrapper.find("img").prop("src")).toEqual(taskImage);
    });
    it('should render next button correctly', () => {
        const next = mount(
          <Button text='next' classname='btn-outlined' clickHandler={ mockCallBack }/>
        );
        next.find('button').at(0).simulate('click');

        expect(mockCallBack).toHaveBeenCalled();

    });
});
