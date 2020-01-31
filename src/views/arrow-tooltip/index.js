import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

let configTooltip;

const arrowGenerator = (color) => ({
  '&[x-placement*="bottom"] $arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${color} transparent`,
    },
  },
  '&[x-placement*="top"] $arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '1em 1em 0 1em',
      borderColor: `${color} transparent transparent transparent`,
    },
  },
  '&[x-placement*="right"] $arrow': {
    left: 0,
    marginLeft: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 1em 1em 0',
      borderColor: `transparent ${color} transparent transparent`,
    },
  },
  '&[x-placement*="left"] $arrow': {
    right: 0,
    marginRight: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 0 1em 1em',
      borderColor: `transparent transparent transparent ${color}`,
    },
  },
});

const useStylesArrow = makeStyles((theme) => ({
  arrow: {
    position: 'absolute',
    fontSize: 10,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator(configTooltip.arrowcolor || "#000000"),
  tooltip: ({
    position: 'relative',
    backgroundColor: configTooltip.arrowcolor || "#000000",
    borderRadius: 'unset',
    maxHeight: 40,
    fontSize: theme.typography.pxToRem(16),
    border: '0px',
    padding: "9px 10px",
    ...configTooltip.tooltipstyle
  }),
  tooltipPlacementLeft: {
    margin: '0 8px',
  },
  tooltipPlacementRight: {
    margin: '0 8px',
  },
  tooltipPlacementTop: {
    margin: '15px 0',
  },
  tooltipPlacementBottom: {
    margin: '8px 0',
  },
}));

function ArrowTooltip(props) {
  // setting the configuration globally in the component
  configTooltip = props;
  const { arrow, ...classes } = useStylesArrow();

  const [ arrowRef, setArrowRef ] = React.useState(null);

  return (
    <Tooltip
      classes={ classes }
      PopperProps={ {
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      } }
      { ...props }
      title={
        <React.Fragment>
          { props.title }
          <span className={ arrow } ref={ setArrowRef } />
        </React.Fragment>
      }
    />
  );
}

ArrowTooltip.propTypes = {
  title: PropTypes.node,
};

export default ArrowTooltip;
