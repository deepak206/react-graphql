/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <footer>
          <div>FOOTER*</div>
        </footer>
      </Fragment>
    );
  }
}

export default withRouter(Footer);
