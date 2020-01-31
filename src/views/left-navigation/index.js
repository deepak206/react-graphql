/* eslint-disable import/no-dynamic-require */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import history from '../../routes/history';
import Configurations from '../../constants/configurations';
import { trans } from '../../utils';
import './left-navigation.scss';
import { connect } from 'react-redux';
import { leftNavigation } from '../../dispatchers/left-navigation-action-dispatcher';

const drawerWidth = 225;

const useStyles = makeStyles((theme) => ({
  drawer: {
    boxShadow: '1px 0 10px 0 #e5e7ee',
    flexShrink: 0,
    // Refer Zeplin specs for the width
    width: '225px',
    zIndex: 1
  },
  drawerPaper: {
    borderRight: 'none',
    width: drawerWidth,
  },
  icon: {
    height: '21px',
    width: '21px',
  },
  toolbar: theme.mixins.toolbar,
}));

const getIcon = (title, activeMenu) => `icon-${title.replace(/\s/g, '-').toLowerCase()}${title === activeMenu ? '-active.svg' : '.svg'}`;

const routeMenu = (path) => {
  history.push(path);
};

function LeftNavigation(props) {
  const { layout, isUpdated } = props;

  const items = layout === 'admin' ? Configurations.adminLeftNavigationItems : Configurations.learnerLeftNavigationItems;

  const classes = useStyles();
  const [ activeRoute, setActiveRoute ] = useState(items.filter((item) => history.location.pathname.includes(item.url))[0] || {
    title: 'Dashboard',
    url: layout ? '/admin/dashboard' : '/learner/dashboard',
  });

  function onclickHandler(menuItem, callBack) {
    setActiveRoute(menuItem);
    if (menuItem.url === '/learner/my-performance') {
      callBack(`${menuItem.url}/level-${localStorage.getItem('activeLevel')}/overall`);
    } else {
      callBack(menuItem.url);
    }
  }

  if(activeRoute !== items.filter((item) => history.location.pathname.includes(item.url))[0]) {
    setActiveRoute(items.filter((item) => history.location.pathname.includes(item.url))[0])
  }

  return (
    <Drawer
      className={ classes.drawer }
      variant="permanent"
      classes={ { paper: classes.drawerPaper } }
      isupdated={ isUpdated }>
      <div className={ classes.toolbar } />
      <List className={ layout === 'admin' ? 'admin-left-navigation left-navigation' : 'learner-left-navigation left-navigation' }>
        <ListItem />
        <ListItem />
        <ListItem />
        { activeRoute && items.map((menuItem, index) => (
          <ListItem
            button
            key={ menuItem.title }
            className={ `${menuItem.url === activeRoute.url ? 'active' : 'left-navigation-list-item'}` }
            onClick={ () => onclickHandler(menuItem, routeMenu) }>
            <ListItemIcon className="iconDiv">
              <img className={ classes.icon } alt={ menuItem.title }
                src={ layout === 'admin' ? require(`../../assets/images/${getIcon(menuItem.title, activeRoute.title)}`)
                  : require(`../../assets/images/learner/${getIcon(menuItem.title, activeRoute.title)}`) } />
            </ListItemIcon>
            <ListItemText primary={ trans(menuItem.title) } className="list-item-text" />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

const mapStateToProps = ({ leftNavigationState: { isUpdated } }) => ({ isUpdated });

const mapDispatchToProps = (dispatch) => ({
  leftNavigation: (isUpdated) => {
    dispatch(leftNavigation(isUpdated));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavigation);