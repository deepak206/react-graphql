import React from 'react';
import Module from '../module';
import Test from '../test';
import Quiz from '../quiz';

export default function LearnerCard(props) {
  const {
    cardDetails: {
      label,
    },
  } = props;

  switch (label) {
    case 'review_test':
      return <Test { ...props }/>;

    case 'level_test':
      return <Test { ...props }/>;

    case 'remediation':
      return <Test { ...props }/>;

    case 'module':
      return (<Module { ...props }/>);

    case 'quiz':
      return (<Quiz { ...props }/>);

    default:
      return null;
  }
}
