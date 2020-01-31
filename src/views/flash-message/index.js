import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconTick from '../../assets/images/flash-tick.svg';
import IconError from '../../assets/images/error.png';
import Constant from '../../constants';
import { showFlashMessage, hideFlashMessage } from '../../dispatchers/flash-message-action-dispatcher'

// css for flash message
import './flash-message.scss';

const styles = (theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: '10px',
  },
  flashImage: {
    marginRight: '20px',
  },
});

class FlashMessage extends React.Component {
  queue = [];

  state = {
    open: false,
  };

  componentDidUpdate() {
    const { message, isVisible } = this.props;

    if (isVisible) {
      this.showFlesh(message);
    }
  }

  showFlesh = (message) => {
    this.queue.push({
      key: new Date().getTime(),
      message,
    });

    if (!this.props.isVisible) {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.hideFlashMessage()
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes, isSuccessMessage, isVisible, message } = this.props;
    const { messageInfo = {} } = this.state;

    const { FLASH_MESSAGE_DURATION } = Constant;

    return (
      <Snackbar
        key={ messageInfo.key }
        anchorOrigin={ {
          horizontal: 'left',
          vertical: 'bottom',
        } }
        open={ (message)?true:false && isVisible }
        autoHideDuration={ FLASH_MESSAGE_DURATION }
        onClose={ this.handleClose }
        onExited={ this.handleExited }
        ContentProps={ {
          'aria-describedby': 'message-id',
          classes: {
            root: 'flash-message',
          },
        } }
        message={
          <span id="message-id"
            className={ classes.content } >
            <img
              alt="tick-icon"
              className={ classes.flashImage }
              src={ isSuccessMessage ? IconTick : IconError } />

            {message}
          </span>
        }
        action={ [
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={ classes.close }
            onClick={ this.handleClose }
          >
            <CloseIcon />
          </IconButton>,
        ] }
      />
    );
  }
}

const mapStateToProps = ({ flashMessageState: { message, isSuccessMessage, isVisible } }) => ({  message, isSuccessMessage, isVisible });

const mapDispatchToProps = (dispatch) => ({

  hideFlashMessage: () => {
    dispatch(hideFlashMessage());
  },
  showFlashMessage: (message, isSuccessMessage, isVisible) => {
    dispatch(showFlashMessage(message, isSuccessMessage, isVisible));
  }
} );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FlashMessage));