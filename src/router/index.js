import React from "react";
import {
  Router,
  Redirect,
  Switch
} from "react-router";
import { createBrowserHistory } from "history";

import Public from "components/Layout/Public/PublicRoute";
import Home from "components/Public/Home";

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Redirect from="/" to={PATHNAME.HOME} exact />
      <Public path={PATHNAME.HOME} component={Home} exact />
    </Switch>
  </Router>

)

export const PATHNAME = {
  HOME: "/home",
};

export default Routes;