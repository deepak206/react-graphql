import React from 'react';
import { Link, Breadcrumbs as Muibreadcrumbs } from '@material-ui/core';
import { number, string, arrayOf, shape } from 'prop-types';
import history from '../../routes/history';

// style sheet for breadcrumbs
import './breadcrumbs.scss';

// click hanler of breadcrumbs
const handleClick = (details, path) => {
  return history.push({ details, pathname: path });
}

// breadcrumbs component
const Breadcrumbs = ({ props }) => {
  const { operator, breadcrumb, breadcrumbLength, textColor, fontSize, addActiveClass } = props;

  return(
    <Muibreadcrumbs
      // seprator image
      className="breadcrumb-section"
      separator={
        operator ||  <img src={ require('../../assets/images/down-arrow.svg') } alt='arrow breadcrum' className='breadcrumb-section__arrow-icon'></img>
      }
      aria-label="Breadcrumb">
      { breadcrumb.map((item, key) =>
        ( key < breadcrumbLength-1  ?
          // check if its link or title
          <Link className='breadcrumb-section__breadcrum-link-text'
            style={ { color: textColor, fontSize } }
            onClick={ () => handleClick(item.details, item.route) }
            key={ key }>
            { item.title }
          </Link> : key===breadcrumbLength-1 ?
            <Link className={ `breadcrumb-section__breadcrum-link-text ${ addActiveClass }` }
              style={ { color: textColor, fontSize } }
              onClick={ () => handleClick(item.details, item.route) }
              key={ key }>
              { item.title }
            </Link>:
            item.title
        )
      )}
    </Muibreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  breadcrumb: arrayOf(shape({
    route: string,
    title: string,
  })),
  breadcrumbLength: number
};

Breadcrumbs.defaultProps = {
  addActiveClass: false,
  fontSize: '14px',
  textColor: 'white'
};

export default Breadcrumbs;
