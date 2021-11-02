import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { Loading } from "components/shared/Loading";
import LogoLimit from "assets/img/logo_limit.svg";
import { useAuth } from "contexts/AuthContext";

import { PATHNAME } from "router";

import Password from "./password.input";
import "./login.scss";

const style = {
  root: {
    justifyContent: "center",
  },
  width: "100vw",
  height: "100vh",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignContent: "center",
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundSize: "cover",
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(false);

  const { login, loading, isAuthenticated } = useAuth();

  const history = useHistory();

  /** When is authenticated throughout the service */
  useEffect(() => {
    if (isAuthenticated) {
      history.push(PATHNAME.INDEX);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="auth-pages-layout" style={style}>
      <Card className="auth-card" id="login" style={{ color: "white" }}>
        <img src={LogoLimit} alt="logo" width="250px" />
        <div className="welcome-message">
          <h2> Estudio de Proyectos</h2>
        </div>

        <form autoComplete="off" className="auth-form" onSubmit={handleLogin}>
          <FormControl>
            <OutlinedInput
              placeholder="Email"
              error={error}
              fullWidth
              variant="outlined"
              className="auth-inputs"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              type="input"
              autoFocus={true}
              required
            />
          </FormControl>
          <FormControl>
            <Password
              required
              fullWidth
              error={error}
              placeholder="Password"
              variant="outlined"
              className="auth-inputs"
              notched={false}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </FormControl>

          {props.error && (
            <p className="auth-warning">Invalid Email or Password</p>
          )}
          {/* <Link className="reset-link" to="/forgot-password">
            Forgot password?
          </Link> */}
          <Button
            disabled={loading}
            type="submit"
            variant="outlined"
            className="accessBtn"
          >
            Login {loading && <Loading size={24} />}
          </Button>
        </form>
      </Card>
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  actions: PropTypes.any,
};

export default Login;
