import React from 'react';
import { shallow, mount } from 'enzyme';
import ThemeCourse from './index';

const baseProps = {
  onNextStepCount3SelectHandler: jest.fn(),
};

describe('<ThemeCourse />', () => {
  const wrapper = shallow(<ThemeCourse {...baseProps} />);

  it('Should render <ThemeCourse />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <SelectBox />', () => {
    expect(wrapper.find('SelectBox').length).toBeGreaterThan(0);
  });

  describe('When handleChange function is called', () => {
    const themeCourse = mount(<ThemeCourse {...baseProps}/>);

    it('should responds to field change', () => {
      const event = {
        target: {
          name: 'modules',
          value: '1',
        },
      };
      const handleOnChangeSpy = jest.spyOn(themeCourse.instance(), 'handleChange');

      themeCourse.instance().forceUpdate();
      themeCourse.find('select[name="modules"]').simulate('change', event);

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });

    it('should render assign theme component', () => {
      const event = {
        target: {
          name: 'modules',
          value: '1',
        },
      };

      themeCourse.instance().forceUpdate();
      themeCourse.find('select[name="modules"]').simulate('change', event);

      expect(themeCourse.find('.assign-theme').length).toBeGreaterThan(0);
    });

    it('should render Save button', () => {
      const event = {
        target: {
          name: 'modules',
          value: '1',
        },
      };

      themeCourse.instance().forceUpdate();
      themeCourse.find('select[name="modules"]').simulate('change', event);
      
      const textBeforeClick = themeCourse.find('Button').length;

      expect(textBeforeClick).toBeGreaterThan(0);
    });

    it('Should render delete popup', () => {
      themeCourse.instance().handleDeletePopup(true);
  
      expect(themeCourse.find('.delete-dailogbox').length).toBeGreaterThan(0);
    })

    it('should call handleSuccess on click of save button', () => {
      const themeCourse = mount(<ThemeCourse {...baseProps}/>);
      const event = {
        target: {
          name: 'modules',
          value: '1',
        },
      };
      const handleOnChangeSpy = jest.spyOn(themeCourse.instance(), 'handleSuccess');

      // Forcing enzymes to accept the method
      themeCourse.instance().forceUpdate();

      // select the modules
      themeCourse.find('select[name="modules"]').simulate('change', event);

      // click the button
      themeCourse.find('button').simulate('click');

      expect(handleOnChangeSpy).toHaveBeenCalled();
    });
  });
});
