import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import routes from './routes';

const Routes = (props) => (
  <Router history={ history }>
    <Switch>
      { routes.map((route, index) => {
        const { component: RouteComponent, routes, exact, path } = route;

        return <Route
          exact={ exact }
          key={ index }
          path={ path }
          render={ () => <RouteComponent { ...props } routes={ routes } /> } />;
      })}
    </Switch>
  </Router>
);

const mapStateToProps = ({ languageState: { language } }) => ({ language });

export default connect(mapStateToProps, null)(Routes);
