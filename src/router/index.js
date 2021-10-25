import React from "react";
import { Router, Redirect, Switch } from "react-router";
import { createBrowserHistory } from "history";

import Public from "components/Layout/Private/PrivateRoute";
import Home from "components/Private/Home";

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Public path={PATHNAME.INDEX} component={Home} exact />
      <Redirect from="*" to={PATHNAME.INDEX} />
    </Switch>
  </Router>
);

export const PATHNAME = {
  HOME: "/home",
  INDEX: "/",
};

export default Routes;
