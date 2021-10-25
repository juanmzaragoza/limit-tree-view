import React from "react";
import { Router, Redirect, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";

import Public from "components/Layout/Private/PrivateRoute";
import Home from "components/Private/Home";
import Login from "components/Login";

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Public path={PATHNAME.INDEX} component={Home} exact />
      <Route path={PATHNAME.LOGIN} component={Login} exact />
      <Redirect from="*" to={PATHNAME.INDEX} />
    </Switch>
  </Router>
);

export const PATHNAME = {
  HOME: "/home",
  LOGIN: "/login",
  INDEX: "/",
};

export default Routes;
