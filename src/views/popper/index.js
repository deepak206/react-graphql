import React from 'react';
import {
  Popper as TooltipBox, Paper, Grid, DialogTitle,
} from '@material-ui/core';
import { trans } from '../../utils';

// css for popper
import './popper.scss';

let arrow;

const Popper = ({
  open,
  anchorEl,
  placement,
  poperConfig,
}) => (
  <TooltipBox
    open={ open }
    anchorEl={ anchorEl }
    placement={ placement }
    className="hint-poper"
    modifiers={ {
      arrow: {
        element: arrow,
        enabled: true,
      },
    } }
  >
    <span className="hint-poper__arrow arrow" ref={ (node) => { arrow = node; } }/>
    <Paper className="hint-poper__paper">
      <DialogTitle className="hint-poper-content">
        { !!poperConfig.titleText
          && <Grid className={ `hint-poper-content__title ${poperConfig.style}` }>{ trans(poperConfig.titleText) }</Grid>

        }
        { !!poperConfig.titleContent
          && <Grid className="hint-poper-content__text">{ trans(poperConfig.titleContent) }</Grid>
        }
      </DialogTitle>
    </Paper>
  </TooltipBox>
);

export default Popper;
