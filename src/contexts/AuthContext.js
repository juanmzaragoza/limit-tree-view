import React from "react";
import { createContext } from "react";

import Axios from "Axios";
import { removeKey, setPlainOn, getPlainFrom } from "utils/storage";
import { PATHNAME } from "router";

const AuthContext = createContext({});

export const TOKEN_LOCALSTORAGE_KEY = "token";
export const AuthProvider = ({ children, ...props }) => {
  const [loading, setLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = getPlainFrom(TOKEN_LOCALSTORAGE_KEY);
    setIsAuthenticated(!!token);
    if (!window.location.pathname.includes(PATHNAME.LOGIN)) {
      !token && window.location.replace(PATHNAME.LOGIN);
    } else {
      !!token && window.location.replace(window.location.origin);
    }
  }, []);

  const login = async ({ email, password }) => {
    const URL = `api/auth?user=${email}&pass=${password}`;
    setLoading(true);
    return await Axios.get(URL)
      .then(({ data }) => {
        Axios.post(
          "api/auth/refresh",
          { token: data.token, session: { i: 443, e: 987 } },
          {
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            }),
          }
        )
          .then(({ data }) => {
            setIsAuthenticated(true);
            setPlainOn(TOKEN_LOCALSTORAGE_KEY, data.token);
            window.location.replace(PATHNAME.INDEX);
          })
          .catch((error) => {
            setIsAuthenticated(false);
            console.log(error);
            console.error("Incorrect email or password entered.");
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.log(error);
        console.error("Incorrect email or password entered.");
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    return new Promise((resolve) => {
      removeKey(TOKEN_LOCALSTORAGE_KEY);
      window.location.replace(PATHNAME.LOGIN);
      resolve(true);
    });
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, loading, isAuthenticated }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
