import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#fbe4cc',
  },
  barColorPrimary: {
    backgroundColor: '#ea7600',
  },
})(LinearProgress);

const LinearProgressBar = (props) => <ColorLinearProgress className={ props.className }/>;

export default LinearProgressBar;