/* eslint-disable import/no-dynamic-require */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle as MuiDialogTitle, IconButton, Typography, DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  bool, func, number, oneOfType, shape, string,
} from 'prop-types';
import Button from '../../views/button';
import { trans } from '../../utils';

import './task-storyboards-popup.scss';

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
      <Typography className="dialog-title" variant="h6">
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

class TaskStoryboardsPopup extends Component {
  static propTypes = {
    activeLevel: oneOfType([
      string.isRequired,
      number.isRequired,
    ]),
    activeModule: oneOfType([
      string,
      number,
    ]),
    handleClose: func,
    isOpen: bool,
    storyboards: shape({
      description: string,
      image: string,
    }),
  };

  static defaultProps = {
    isOpen: false,
  };

  componentDidMount = () => {
    document.body.classList.add('task-storyboards-popup-dailogbox_add-scroll');
  }

  componentWillUnmount = () => {
    document.body.classList.remove('task-storyboards-popup-dailogbox_add-scroll');
  }

  render() {
    const {
      activeModule, activeLevel, storyboards, isOpen, handleClose,
    } = this.props;

    return (
      <Dialog className="task-storyboards-popup-dailogbox" onClose={ handleClose }
        aria-labelledby="customized-dialog-title" open={ isOpen }  PaperProps={ {
          style: {
            maxWidth: '770px',
            overflowY: 'unset',
          },
        } }>
        <div className="task-storyboards-popup-dailogbox__container">
          <DialogTitle className="customized-dialog-title" onClose={ handleClose }>
            { trans('Hello and welcome to this module!') }
          </DialogTitle>
          <DialogContent className="task-storyboards-popup-dailogbox__container_popup-section">
            <Typography gutterBottom>
              { storyboards && storyboards.description }
            </Typography>
            <Typography gutterBottom>
              { trans('The images below narrate the story you will experience in this module.') }
            </Typography>
            <div className="task-storyboards-popup-dailogbox__container_popup-button">
              <Button type="submit" classname="btn-outlined" text={ trans('next') } clickHandler={ handleClose } />
            </div>
            <img className="task-storyboards-popup-dailogbox__container_image" alt="task storyboard"
              src={ require(`../../assets/images/learner/learner-module/level_${activeLevel}/story/story_${activeModule}.png`) }/>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default TaskStoryboardsPopup;
