import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { trans } from '../../utils';
import history from '../../routes/history';
import StepperRouter from '../../pages/stepper-layout/stepper-router';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import './simple-tabs.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${index}` }
      aria-labelledby={ `simple-tab-${index}` }
      { ...other }
      className="simple-tabs__tab-panel"
    >
      <Box p={ 3 } className="simple-tabs__tab-panel_box">{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    id: `simple-tab-${index}`,
  };
}

function LinkTab(props) {
  const classes = useStyles();

  return (
    <Tab
      component="a"
      onClick={ (event) => {
        event.preventDefault();
      } }
      { ...props }
      className={ `${classes.tabs} simple-tabs__container_tabs_tab ${props.index === props.active && `simple-tabs__container_tabs_tab-active`}` }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    background: '#ea7600',
    height: '5px',
  },
  tabs: {
    minWidth: 'auto',
    padding: '0px',
    width: 'auto',
  }
}));

export default function SimpleTabs(props) {
  const { activeLevel, activeTab, urlPrefix, subRoutes, myPerformanceTabs } = props;

  const classes = useStyles();

  const getActiveTab = useCallback(() => activeTab === 'overall' ? 0 : activeTab === 'skill' ? 1 : 2,[ activeTab ]);

  const [ value, setValue ] = useState(getActiveTab);

  useEffect(() => {
    if(getActiveTab !== activeTab) {
      setValue(getActiveTab)
    }
  }, [ getActiveTab, activeTab ]);

  function handleChange(event, newValue) {
    setValue(newValue);
    history.push(`/learner/my-performance/level-${activeLevel}/${!newValue ? 'overall' : newValue === 2 ? 'test' : 'skill/reading' }`);
  }

  return (
    <div className="simple-tabs">
      <AppBar position="static" className="simple-tabs__container">
        <Tabs
          value={ value }
          onChange={ handleChange }
          className="simple-tabs__container_tabs"
          classes={ { indicator: classes.indicator } } >
          {myPerformanceTabs.map((tabName, key) => (
            <LinkTab label={ trans(tabName) } { ...tabProps(key) } key={ key } active={ value } index={ key }/>
          ))}
        </Tabs>
      </AppBar>
      <StepperRouter subRoutes={ subRoutes } urlPrefix={ urlPrefix }/>
    </div>
  );
}
