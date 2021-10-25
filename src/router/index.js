import React from "react";
import { Router, Redirect, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";

import Public from "components/Layout/Public/PublicRoute";
import Login from "components/Login";
import Home from "components/Public/Home";

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
