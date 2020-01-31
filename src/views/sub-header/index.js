import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { bool } from 'prop-types';
import Breadcrumbs from '../breadcrumbs';
import history from '../../routes/history';
import { trans } from '../../utils';

import './sub-header.scss';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'inherit',
    width: '97%',
    paddingLeft: "30px",
    paddingTop: "35px"
  },
  root: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '98px',
  },
  extendedRoot: {
    zIndex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '121px',
    overflow: 'hidden',
    position: 'relative'
  },
  disabledLink: {
    pointerEvents: "none"
  }
}));

function handleClick(details, path) {
  history.push({ details, pathname: path });
}

const SubHeader = (props) => {
  const {
    titleStyle,
    pageDescription,
    breadcrumb,
    pageTitle,
    textColor,
    fontSize,
    arrowCrumbTitle,
    backgroundColor,
    arrowcrumb,
    activeClass,
    operator,
    activeImage
  } = props;
  const classes = useStyles();
  const breadcrumbLength =breadcrumb.length;
  const addActiveClass =(activeClass)?(""):(classes.disabledLink);

  return (
    <div className={ pageTitle ? classes.extendedRoot : classes.root } style={ { backgroundColor } }>
      <Paper elevation={ 0 } square={ true } className={ classes.paper }
      >
        { arrowCrumbTitle &&
          <h3 className="subheader__title">
            <div className="subheader__side-arrow" onClick={ ()=>handleClick("ast", arrowcrumb[0].route) }/>
            { arrowCrumbTitle }
          </h3>
        }
        { breadcrumbLength > 0 ? (
          <>
            <Breadcrumbs props={ {
              addActiveClass,
              breadcrumb,
              operator,
              textColor,
              fontSize,
              breadcrumbLength
            } } />
            { pageTitle &&
              <div className="subheader__page-title" style={ titleStyle }>
                { pageTitle }
              </div>
            }
          </>
        ) : (
          <>
            {
              activeImage &&
                <div className='subheader__learner-image' />
            }
            { pageTitle &&
              <div className="subheader__page-title">
                { pageTitle }
              </div>
            }
            { pageDescription &&
              <p className="subheader__page-description">
                { pageDescription }
              </p>
            }
          </>
        )}
      </Paper>
    </div>
  );
};

SubHeader.propTypes = {
  activeImage: bool,
  activeClass: bool
};

SubHeader.defaultProps = {
  breadcrumb: [ trans('Manage Accounts') ],
  activeImage: false,
  activeClass: false
};

export default SubHeader;
