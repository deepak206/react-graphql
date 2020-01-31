import React from 'react';
import { string } from 'prop-types';
import history from '../../routes/history';

// css for link
import './link.scss';

const Link = (props) => {
  const { to, classname, text } = props;

  const redirectionLink = () => {
    history.push(to);
  };

  return (
    <span className={ `lnk-blue ${classname}` } onClick={ () => redirectionLink(to) }>
      { text }
    </span>
  );
};

Link.propTypes = {
  classname: string,
  text: string.isRequired,
  to: string,
};

Link.defaultProps = {
  classname: '',
  to: '/',
};

export default Link;
