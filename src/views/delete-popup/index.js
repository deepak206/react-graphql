import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography, DialogContent, Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { func, bool } from 'prop-types';
import Button from '../button';
import { trans } from '../../utils';

// delete popup scss
import './delete-popup.scss';

const styles = (theme) => ({
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: 1,
    top: 1,
  },
  root: {
    margin: 0,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;

  return (
    <MuiDialogTitle disableTypography className={ classes.root }>
      <Typography className="delete-popup__title" variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DeletePopup = (props) => {
  const {
    description, title, open, handleClose, handleDelete, isLoading, disableHoverOnButtonLoader
  } = props;

  return (
    <Dialog
      className="delete-popup"
      onClose={ handleClose }
      aria-labelledby="customized-dialog-title"
      PaperProps={ {
        style: {
          maxWidth: '570px',
          padding: '15px 15px 33px',
          width: '100%',
        },
      } }
      open={ open }>
      <DialogTitle id="customized-dialog-title" className="title" onClose={ handleClose }>
        { title }
      </DialogTitle>
      <DialogContent>
        <Typography>{ description } </Typography>
        <Grid className="delete-popup-action">
          <Button type="submit" classname="btn-cancel delete-popup-action__cancel" text={ trans('Cancel') } clickHandler={ handleClose }/>
          <Button
            type="submit"
            classname="btn-outlined delete-popup-action__delete"
            text={ trans('Delete') }
            clickHandler={ handleDelete }
            loading={ isLoading }
            disableHoverOnButtonLoader={ disableHoverOnButtonLoader }
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

DeletePopup.propTypes = {
  handleClose: func,
  handleDelete: func,
  disableHoverOnButtonLoader: bool
};

DeletePopup.defaultProps = {
  description: '',
  open: false,
  title: 'Delete',
  isLoading: false,
  disableHoverOnButtonLoader: false
};

export default DeletePopup;
