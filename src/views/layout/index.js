import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Header from '../header';
import LeftNavigation from '../left-navigation';
import { getUserType } from '../../utils';

// css for layout file
import './layout.scss';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    minHeight: '100%'
  },
  toolbar: {
    minHeight: '61px'
  },
}));

const Layout = (props) => {
  const { children, loginData: { primaryRole } } = props;

  const userType = getUserType(primaryRole);

  const classes = useStyles();

  let isAuthLayout = false;

  if (window.location.href.indexOf("/admin") > -1 || window.location.href.indexOf("/learner") > -1) {
    isAuthLayout = true;
  }

  return (
    <div className={ userType && classes.root }>
      <CssBaseline />
      <Header layout={ userType } isAuth={ isAuthLayout } />
      { !props.isZoom && userType && isAuthLayout &&  <LeftNavigation layout={ userType }/> }
      <main className={ classes.content }>
        {/*Need this hack here because we've made the toolbar stick*/}
        { userType && <div className={ classes.toolbar } />}
        { children }
      </main>
    </div>
  );
};

export default connect(({ authState: { loginData }, breadcrumbsState: { isZoom } }) => ({ loginData, isZoom }))(Layout);
