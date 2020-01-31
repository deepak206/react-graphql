import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography, DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  string, bool, func, array,
} from 'prop-types';
import './dialog.scss';

const styles = (theme) => ({
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: 1,
    top: 1,
  },
  root: {
    margin: 0,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 30,
  },
  root_1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 !important'
  },
  h6: {
    fontSize: 21,
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { alignCenter, children, classes, onClose } = props;

  return (
    <MuiDialogTitle disableTypography className={ `${classes.root} ${alignCenter && classes.root_1}
    dailogbox-container__dialog-outer-container_dialog-box-title_root` }>
      <Typography className={ `${classes.h6}` } variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class DialogBox extends Component {
  static propTypes = {
    alignCenter: bool,
    children: array,
    handleClose: func,
    isOpen: bool,
    title: string,
  }

  static defaultProps = {
    alignCenter: false,
    children: [],
    isOpen: false,
    title: '',
  }

  render() {
    const {
      alignCenter, children, isOpen, handleClose, title,
    } = this.props;

    return (
      <Dialog
        className="dailogbox-container"
        onClose={ handleClose }
        open={ isOpen }
        BackdropProps={ {
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          },
        } }
      >
        <div className="dailogbox-container__dialog-outer-container">
          <DialogTitle onClose={ handleClose } alignCenter={ alignCenter } className="dailogbox-container__dialog-outer-container_dialog-box-title">
            { title }
          </DialogTitle>
          <DialogContent className="dailogbox-container__dialog-outer-container_dialog-box-content">
            { children }
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default DialogBox;
