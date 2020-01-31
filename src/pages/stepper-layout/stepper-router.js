import React from 'react';
import { Route, Switch } from 'react-router-dom';

const StepperRouter = ({ subRoutes, urlPrefix }) => (
  <Switch>
    {subRoutes.map((route, index) => {
      const { component: RouteComponent, exact, path } = route;

      return <Route key={ index } component={ RouteComponent } exact={ exact } path={ `${urlPrefix}${path}` } />;
    })}
  </Switch>
);

export default StepperRouter;
