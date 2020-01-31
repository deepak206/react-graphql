import React from 'react';
import { shallow, mount } from 'enzyme';
import RadioButton, { radiobutton_appearances } from './index';
import { Radio } from "@material-ui/core";

const groupItems = [
      {
        name: "Male",
        label: "Male",
        information: "Please select if you are male",
        disabled: false
      },
      {
        name: "Female",
        label: "Female",
        information: "Please select if you are male",
        disabled: false
      },
      {
        name: "Other",
        label: "Other",
        information: "",
        disabled: true
      }
    ];

const errorMessage = "Gender is required field.";

describe('RadioButton - check for snapshot', () => {
    const wrapper = shallow(<RadioButton
        groupItems={groupItems}
        group="gender"
        checkedDefault="Female"
        appearance={radiobutton_appearances.primary}
        error={ errorMessage}
        />);

    it('Should render <RadioButton />', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('RadioButton - Check different functionality by passing different props', () => {
    it('check for validation Error functionality', () => {
        const radioButtonError = mount(<RadioButton
            groupItems={groupItems}
            group="gender"
            checkedDefault="Female"
            appearance={radiobutton_appearances.primary}
            error={ errorMessage}
            />
        );

        expect(radioButtonError.find('.error-container').length).toBe(1);
    });

    it('check without Error functionality', () => {
        const radioButtonWithoutError = mount(<RadioButton
            groupItems={groupItems}
            group="gender"
            checkedDefault="Female"
            appearance={radiobutton_appearances.primary}
            />
        );

        expect(radioButtonWithoutError.find('.error-container').length).toBe(0);
    });

    it('check for disabled', () => {
        const radioButtonDisabled = mount(<RadioButton
            groupItems={groupItems}
            group="gender"
            checkedDefault="Female"
            appearance={radiobutton_appearances.primary}
            />
        );

        expect(radioButtonDisabled.find(Radio).last().props().disabled).toBe(true);
    });

    it('Check all radio buttons rendered', () => {
        const radioButton = mount(<RadioButton
            groupItems={groupItems}
            group="gender"
            checkedDefault="Female"
            appearance={radiobutton_appearances.primary}
            />
        );

        expect(radioButton.find(Radio).length).toBe(3);
    });
    it('2nd Radio button should be checked', () => {
        const radioButtonChecked = mount(<RadioButton
            groupItems={groupItems}
            group="gender"
            checkedDefault="Female"
            appearance={radiobutton_appearances.primary}
            />
        );

        expect(radioButtonChecked.find('input[name="gender"]').at(1).props().checked).toBe(true);
    });
});
