import axios from "axios";
import { getPlainFrom } from "./utils/storage";
import SnackbarUtils from "./utils/snackbar-function";

const Axios = axios.create();
const authToken = () => `Bearer  ${getPlainFrom("token")}`;
Axios.defaults.baseURL = "https://10.35.3.44:8083/";

Axios.interceptors.request.use(
  (conf) => {
    // Do something before request is sent
    conf.headers = {
      Authorization: authToken(),
      "Content-Type": "application/json",
    };
    return conf;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const errorTypes = {
  400: () => {
    SnackbarUtils.error("Revise los datos ingresados");
  },
  401: () => {
    SnackbarUtils.error("No posee los permisos suficientes ;(");
  },
  403: () => {
    SnackbarUtils.error("Sesión expirada! Vuelva a iniciar sesión.");
  },
  404: () => {
    SnackbarUtils.error("El elemento consultado no existe en la base de datos");
  },
  500: () => {
    SnackbarUtils.error("Ocurrió un error interno en el servicio X(");
  },
  _default: () => {
    SnackbarUtils.error("Ocurrió un error interno en el servicio X(");
  },
};

const solveError = (status) => {
  return errorTypes[status] ? errorTypes[status]() : errorTypes["_default"]();
};

/** Handle errors */
let key;
Axios.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status === 200 && !!key) {
      SnackbarUtils.close(key);
      key = null;
    }
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      // if there isn't a snackbar opened
      if (!key) {
        key = SnackbarUtils.error("Sin conexión!", true);
      }
      // if the status cannot be handled by the component
    } else if (error.response) {
      //SnackbarUtils.close(key);
      const { status } = error.response;
      solveError(status);
    }
    return Promise.reject(error);
  }
);

export default Axios;
