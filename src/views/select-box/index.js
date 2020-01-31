import React from 'react';
import { Grid } from '@material-ui/core';
import {
  object, string, oneOf,
} from 'prop-types';
import Error from '../error';
import { trans } from '../../utils';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

import './select-box.scss';

const BootstrapInput = withStyles(theme => ({
  root: {
    display: "inline-flex"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    border: props => (props.error ? "1px solid #db0020" : "1px solid #c7c7c7"),
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    background: props => props.status === "disabled" && "#d9d9d9",
    "&:focus": {
      borderRadius: 4
    }
  }
}))(InputBase);

const useStyles = makeStyles({
  dropdown: props => props.appearance.dropdown,
  labelFormat: props => props.appearance.label,
  selectBoxFocus: props => props.appearance.selectBoxFocus,
  selectBox: props => props.appearance.selectBox,
  informationFormat: props => props.appearance.information
});

export default function SelectBox(props) {
  const error = '';

  const {
    options,
    name,
    showFirstEmpty,
    fieldAttributes,
    label,
    status,
    information
  } = props;

  const {
    dropdown,
    labelFormat,
    selectBoxFocus,
    selectBox,
    informationFormat
  } = useStyles(props);

  const [value, setValue] = React.useState("");

  const [focus, setFocus] = React.useState(false);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handelFocus = () => setFocus(true);

  const handelOnBlur = () => setFocus(false);

  return (
    <div className={dropdown}>
      <label className={labelFormat}>{label}</label>
      <FormControl className={focus ? selectBoxFocus : selectBox}>
        <NativeSelect
          value={value}
          onChange={handleChange}
          input={<BootstrapInput error={false} status={status} />}
          onFocus={handelFocus}
          onBlur={handelOnBlur}
          disabled={status}
        >
          { !!showFirstEmpty && <option value="">{trans('Select')}</option> }
          { Array.isArray( options ) ?
            // if options is array with id and name
            (!!options) && options.map((option, index) => <option value={ option.id } key={ index } >{ option.name }</option>) :
            // if options is object
            (!!options) && Object.keys(options).map((option, index) => <option value={ option } key={ index } >{ options[option] }</option>)
          }
        </NativeSelect>
      </FormControl>
      <label className={informationFormat}>{information}</label>
      { !!error
        && <Error errorMessage={ error }/>
      }
    </div>
  );

  {/*return (

    <Grid className={ `select-box ${!!error && 'select-field--error'}` }>
      { !!label
          &&
          <label className= "select-box__label">
            { label }
          </label>
      }
      <select
        name={ name }
        className={ `select-box__field ${!!error && 'select-box__field--error'}` }
        { ...fieldAttributes }
      >
        { !!showFirstEmpty && <option value="">{trans('Select')}</option> }
        { Array.isArray( options ) ?
          // if options is array with id and name
          (!!options) && options.map((option, index) => <option value={ option.id } key={ index } >{ option.name }</option>) :
          // if options is object
          (!!options) && Object.keys(options).map((option, index) => <option value={ option } key={ index } >{ options[option] }</option>)
        }
      </select>
      { !!error
        && <Error errorMessage={ error }/>
      }
    </Grid>
  );*/}
};

export const selectbox_appearances = {
  primary: {
    selectBox: {
      margin: "2.4"
    },
    selectBoxFocus: {
      border: "2px solid #46a9cb",
      padding: 1,
      borderRadius: 7
    },
    dropdown: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      marginLeft: "4.8",
      color: "#6a7070",
      "&:first-letter": {
        textTransform: "capitalize"
      }
    },
    information: {
      marginLeft: "4.8",
      color: "#6a7070",
      "&:first-letter": {
        textTransform: "capitalize"
      }
    }
  }
};

SelectBox.propTypes = {
  label: string,
  status: string,
  information: string,
  appearance: oneOf(Object.values(selectbox_appearances)),
  fieldAttributes: object,
  name: string.isRequired,
};

SelectBox.defaultProps = {
  name: null,
  status: "",
  information: "",
  appearance: selectbox_appearances.primary,
  fieldAttributes: {},
};
