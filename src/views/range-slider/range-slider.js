import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { number, func } from 'prop-types';
import { indexFormat, trans } from '../../utils';
import ArrowTooltip from '../../views/arrow-tooltip';

const TooltipLabelComponent = (props) => {
  const { children } = props;

  return (
    <ArrowTooltip
      enterDelay={ 300 }
      leaveDelay={ 200 }
      tooltipstyle={ {
        position: 'relative',
        backgroundColor: "#4e4e4e",
        fontSize: "1em",
        padding: "8px",
        color: "#ffffff",
        borderRadius: "3px"
      } }
      arrowcolor="#4e4e4e"
      title={ trans("You are here") }
      placement="top">
      { children }
    </ArrowTooltip>
  );
}

const marks = [
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 8
  },
  {
    value: 9
  },
  {
    value: 10
  }
];

const CustomSlider = withStyles({
  root: {
    color: '#f5f5f5',
    height: 25,
  },
  thumb: {
    height: 31,
    width: 31,
    backgroundColor: '#fff',
    boxShadow: "0 2px 10px 0 #e5e7ee",
    marginTop: -4,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: "0 2px 10px 0 #e5e7ee",
    },
    '& .bar': {
      height: 17,
      marginRight: 1,
      backgroundColor: "#fff",
      color: "#ea7600",
      fontWeight: 600,
      fontSize: 12,
      zIndex: 1
    },
    transition: "left 0.3s ease-in",
  },
  active: {
    transition: "left 0.3s"
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 25,
  },
  rail: {
    height: 25,
    opacity: 1,
  },
  markLabel: {
    top: 13,
    color: "#c1c1c1"
  },
  marked: {
    marginBottom: 0,
  },
  mark: {
    backgroundColor: "#f5f5f5"
  },
  markActive: {
    backgroundColor: "#f5f5f5"
  }
})(Slider);

const CustomThumbComponent = React.forwardRef((props, ref) =>
  <span { ...props } ref={ ref }>
    <span className="bar">{ indexFormat(parseInt(props["aria-valuenow"])) }</span>
  </span>
)

export default function RangeSlider(props) {
  const handleChange = (event, value) => {
    props.onChangeSlider(value);
  };

  return (
    <CustomSlider
      ThumbComponent={ CustomThumbComponent }
      ValueLabelComponent={ TooltipLabelComponent }
      aria-label="pretto slider"
      marks={ marks }
      value={ props.activeLevel }
      defaultValue={ props.activeLevel }
      min={ 1 }
      max ={ 10 }
      onChange={ handleChange }/>
  );
}

RangeSlider.propTypes = {
  handleOnChange: func,
  activeLevel: number,
};

RangeSlider.defaultProps = {
  activeLevel: 4,
};
