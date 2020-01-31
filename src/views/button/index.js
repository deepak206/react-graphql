import React, { useState } from 'react';
import { Button as UIButton } from '@material-ui/core';
import { string, func, bool } from 'prop-types';
import './button.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  progress: {
    color: '#ea7600',
  },
  hoverProgress: {
    color: '#ffffff',
  }
}));

/**
 * Button with a loading indicator
 * @param props
 * text: The text to show in the button
 * loading: Shows a circular progress indicating that a network request is being made
 * @returns {*}
 * @constructor
 */
const Button = (props) => {
  const { type, classname, disabled, text, clickHandler, variant, loading, disableHoverOnButtonLoader } = props;
  const classes = useStyles();
  const [ toggleClass, setClass ] = useState(true);

  function handleWhiteColor(e) {
    setClass(false)
  }
  function handleOrangeColor() {
    setClass(true)
  }

  return (
    <UIButton
      type={ type }
      variant={ variant }
      className={ classname }
      disabled={ disabled !== '' && disabled }
      onMouseEnter={ (e) => handleWhiteColor(e) }
      onMouseOut={ (e) => handleOrangeColor(e) }
      onClick={ clickHandler }>

      {!loading ? text : (
        <CircularProgress size={24} onMouseEnter={(e) => handleWhiteColor(e)} className={!disableHoverOnButtonLoader ? (toggleClass ? classes.progress : classes.hoverProgress) : (classes.hoverProgress)} />
      )}
    </UIButton>
  );
};

Button.propTypes = {
  className: string,
  disabled: bool,
  onClick: func,
  text: string.isRequired,
  type: string,
  disableHoverOnButtonLoader: bool,
  variant: string,
  loading: bool
};

Button.defaultProps = {
  classname: 'btn-outlined',
  disabled: false,
  type: 'submit',
  disableHoverOnButtonLoader: false,
  variant: 'contained',
};

export default Button;
