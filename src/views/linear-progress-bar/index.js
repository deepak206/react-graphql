import React from 'react';
import { number } from 'prop-types';
import { interpolate } from '../../utils';

import './linear-progress-bar.scss';

export default function LinearProgressBar(props) {
  const { completeTest } = props;

  const progressBar = {
    width: `${completeTest}%`,
  };

  return (
    <div className="linerar-progress-bar">
      <div className={ completeTest > 85 ? `linerar-progress-bar__bar linerar-progress-bar__full-bar` : `linerar-progress-bar_bar` } style={ progressBar }>
        {completeTest > 85 && <p className="linerar-progress-bar__bar_progress-complete-text" >
          { interpolate('%(completeTest)s % completed', { completeTest }) }</p>
        }
      </div>
      {completeTest <= 85 && <div className="linerar-progress-bar__bar-text"><p className="linerar-progress-bar__bar-text_progress-text">
        { interpolate('%(completeTest)s % completed', { completeTest }) }</p></div>}
    </div>
  );
}

LinearProgressBar.propTypes = {
  completeTest: number.isRequired
};

LinearProgressBar.defaultProps = {
  completeTest: 0
};