import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PERIODS";
const RESET = "RESET_PERIOD";
const REPLACE = "REPLACE_PERIOD";
// Constants
const URL =
  "api/estp/estudisProjecte?query=projecte.codi=={codi}&sort=numero,desc";
const ADD_PERIOD_URL = "api/estp/estudisProjecte";
const UPDATE_PERIOD_URL = "api/estp/estudisProjecte";

//Functions
export const loadData = ({ url = URL, projectCodi }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{codi}", projectCodi));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded?.estudiProjectes ?? [] }));
          dispatch(add({ loading: false }));
        })
        .catch((error) => {
          console.log(error);
          dispatch(add({ loading: false }));
        })
        .finally(() => {
          dispatch(add({ loading: false }));
        });
    } catch (error) {
      dispatch(add({ loading: false }));
    }
  };
};

export const addPeriord = ({ url = ADD_PERIOD_URL, id, codiAccio, data }) => {
  return async (dispatch) => {
    const formedURL = () => `${url}/${id}/action/${codiAccio}?params=${data}`;
    return new Promise((resolve, reject) => {
      try {
        dispatch(add({ loading: true }));
        Axios.post(formedURL())
          .then(({ status, data, ...rest }) => {
            if (status !== 200) {
              return reject({ message: "No se pude agregar perído" });
            }
            dispatch(add({ loading: false }));
            resolve({ status, data, ...rest });
          })
          .catch((error) => {
            console.log(error);
            dispatch(add({ loading: false }));
            reject(error);
          });
      } catch (error) {
        console.log(error);
        dispatch(add({ loading: false }));
        reject(error);
      }
    });
  };
};

export const openNewPeriod = ({ url = ADD_PERIOD_URL, id, codiAccio }) => {
  return async (dispatch) => {
    const formedURL = () => `${url}/${id}/action/${codiAccio}`;
    return new Promise((resolve, reject) => {
      try {
        dispatch(add({ loading: true }));
        Axios.post(formedURL())
          .then(({ status, data, ...rest }) => {
            dispatch(add({ loading: false }));
            resolve({ status, data, ...rest });
          })
          .catch((error) => {
            console.log(error);
            dispatch(add({ loading: false }));
            reject(error);
          });
      } catch (error) {
        console.log(error);
        dispatch(add({ loading: false }));
        reject(error);
      }
    });
  };
};

export const updatePeriod = ({ url = UPDATE_PERIOD_URL, id, data }) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(add({ loading: true }));
        const queryString = `${url}/${id}`;
        Axios.put(queryString, JSON.stringify(data))
          .then(({ status, data, ...rest }) => {
            dispatch(replace({ id, ...data }));
            dispatch(add({ loading: false }));
            resolve({ status, data, ...rest });
          })
          .catch((error) => {
            console.log(error);
            dispatch(add({ loading: false }));
            reject(error);
          });
      } catch (error) {
        console.log(error);
        dispatch(add({ loading: false }));
        reject(error);
      }
    });
  };
};

export const setPeriod = ({ period }) => {
  return async (dispatch) => {
    dispatch(add({ selectedPeriod: period }));
  };
};

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload,
  };
};

export const replace = (payload) => {
  return {
    type: REPLACE,
    payload,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

//Reducers
const initialState = {
  rows: [],
  loading: false,
  selectedPeriod: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case REPLACE: {
      const changedRows = state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      );
      return { ...state, rows: changedRows };
    }
    case RESET:
      return initialState;

    default:
      return state;
  }
};
export default reducer;
