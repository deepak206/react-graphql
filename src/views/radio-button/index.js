import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { string, oneOf, arrayOf, shape, bool } from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import Error from '../error';

const useStyles = makeStyles(theme => ({
  formControl: props => props.appearance.formControl,
  groupControl: props => props.appearance.groupControl,
  informationControl: props => props.appearance.informationControl,
  radioControl: props => props.appearance.radioControl
}));

export default function RadioButton(props) {
  const { group, groupItems, checkedDefault, error } = props;

  const {
    formControl,
    groupControl,
    informationControl,
    radioControl
  } = useStyles(props);
  const [value, setValue] = React.useState(checkedDefault);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      {groupItems.length && (
        <FormControl component="fieldset" className={formControl}>
          <FormLabel component="legend" className={groupControl}>
            {group}
          </FormLabel>
          <RadioGroup
            aria-label={group}
            name={group}
            value={value}
            onChange={handleChange}
          >
            {groupItems.map((item, index) => (
              <Fragment key={index}>
                <FormControlLabel
                  value={item.name}
                  control={
                    <Radio
                      //color={radioControl}
                      classes={{ root: radioControl }}
                    />
                  }
                  label={item.label}
                  disabled={item.disabled}
                />
                <label className={informationControl}>{item.information}</label>
              </Fragment>
            ))}
          </RadioGroup>
        </FormControl>
      )}
      { !!error
        && <Error errorMessage={ error }/>
      }
    </div>
  );
}

/**
 * Radio button component
 * @groupItems - type array contain below keys:
   name : type string and contain name of the radio button
   label: type string and contain label of the radio button
   information: type string and contain information about the button
   disabled: type boolean, pass true to set disable
 * @appearance - primary is the default appearance
 * @group - group name for group radio button or leave empty.
 * @checkedDefault- name of the default or leave empty
 *  
 */

export const radiobutton_appearances = {
  primary: {
    formControl: {
      margin: "24px"
    },
    groupControl: {
      color: "#6a7070",
      "&:first-letter": {
        textTransform: "capitalize"
      }
    },
    informationControl: {
      color: "#6a7070",
      "&:first-letter": {
        textTransform: "capitalize"
      }
    },
    radioControl: {
      color: "#047a9c",
      "&:checked": {
        color: "#047a9c"
      }
    }
  }
};

RadioButton.propTypes = {
  groupItems: arrayOf(
    shape({
      name: string.isRequired,
      label: string,
      information: string,
      disabled: bool
    })
  ),
  appearance: oneOf(Object.values(radiobutton_appearances)),
  group: string,
  checkedDefault: string,
  error: string,
};

RadioButton.defaultProps = {
  groupItems: {
    label: null,
    name: null,
    information: "",
    disabled: false
  },
  appearance: radiobutton_appearances.primary,
  group: null,
  checkedDefault: null,
  error: null
};
