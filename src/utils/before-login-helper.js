import Axios from "Axios";
import { getPlainFrom, setPlainOn } from "./storage";
import jwtDecode from "jwt-decode";

//hack to avoid regenerate toeken manually
export const login = () => {
  // check if token is expired
  const token = getPlainFrom("token");
  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() < exp * 1000) return;
  }
  // generate token
  Axios.get("api/auth?user=admin&pass=admin", {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  })
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
          setPlainOn("token", data.token);
        })
        .catch(() => {
          window.alert("NO SE PUDO REFRESCAR");
        });
    })
    .catch(() => {
      window.alert("NO SE PUDO OBTENER ADMIN/ADMIN");
    });
};
export const refresh = () => {
  setInterval(() => {
    Axios.get("api/auth?user=admin&pass=admin", {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then(({ data }) => {
        console.log("REFRESH");
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
            setPlainOn("token", data.token);
          })
          .catch(() => {
            window.alert("NO SE PUDO REFRESCAR");
          });
      })
      .catch(() => {
        window.alert("NO SE PUDO OBTENER ADMIN/ADMIN");
      });
  }, 1800000);
};
