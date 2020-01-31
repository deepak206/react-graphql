import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, IconButton, DialogContent,  DialogTitle as MuiDialogTitle
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { bool, func, string } from 'prop-types';
import Button from '../../views/button';
import { trans, interpolate } from '../../utils';

import './level-success-popup.scss';

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
  root: {
    margin: 0
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { classes, onClose } = props;

  return (
    <MuiDialogTitle disableTypography className={ `${classes.root} level-success-dailogbox__popup-close-button` }>
      {onClose ? (
        <IconButton aria-label="Close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class LevelSuccessPopup extends Component {
  static propTypes = {
    handleClose: func,
    isOpen: bool,
    levelId: string,
  };

  static defaultProps = {
    isOpen: false,
  };

  render() {
    const {
      isOpen, handleClose, levelId,
    } = this.props;

    return (
      <Dialog className="level-success-dailogbox" onClose={ handleClose } open={ isOpen }>
        <DialogTitle onClose={ handleClose }/>
        <DialogContent className='level-success-dailogbox__popup'>
          <img src={ require('../../assets/images/learner/quiz/level_test_success_complete_large.svg') } alt={ trans('leve test success') }/>
          <h1>{ interpolate('Level %(levelId)s',  { levelId }) }</h1>
          <p className="level-success-dailogbox__popup_size16">{ trans('Congratulations! You’ve made it to the next level') } </p>
          <Button text={ trans("Continue") } classname={ 'btn-primary' } clickHandler={ handleClose }/>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LevelSuccessPopup;
