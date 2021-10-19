import Axios from "Axios";
import { findPartida } from "./helpers";

//Action types
const ADD = "ADD_TO_UC";
const REPLACE = "REPLACE_TO_UC";
const RESET_KPIS = "RESET_KPIS_TO_PARTIDA";
const SELECT_PARTIDA = "SELECT_PARTIDA";
const RESET_PARTIDA = "RESET_PARTIDA"
// Constants
const URL =
  'api/estp/liniesEstudi?query=unitatControlEstudi.id=="{id}"&sort=codi';
const HEADER_URL = "api/estp/unitatsControlEstudi";
const UPDATE_PARTIDA_URL = "api/estp/liniesEstudi";
const LOAD_KPIS_URL = "api/estp/unitatsControlEstudi/{id}/indicadors";
const LOAD_DETAILS_URL =
  "api/estp/unitatsControlEstudi/{id}/indicadors?desglossat=true";
const LOAD_COSTES_URL = "api/estp/unitatsControlEstudi/{id}/costReal";

//Functions
export const loadData = ({ url = URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded?.liniaEstudis ?? [] }));
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

export const loadHeader = ({ url = HEADER_URL, id }) => {
  const formedURL = () => {
    return `${url}/${id}`;
  };
  return async (dispatch) => {
    const apiCall = () => Axios.get(formedURL());
    try {
      //dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then((_embedded) => {
          dispatch(add({ unitControl: _embedded }));
          //dispatch(add({ loading: false }));
        })
        .catch((error) => {
          console.log(error);
          //dispatch(add({ loading: false }));
        })
        .finally(() => {
          //dispatch(add({ loading: false }));
        });
    } catch (error) {
      //dispatch(add({ loading: false }));
    }
  };
};

export const updatePartida = ({ url = UPDATE_PARTIDA_URL, id, data }) => {
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

export const loadKpis = ({ url = LOAD_KPIS_URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides }) => {
          dispatch(add({ kpis: indicadorsPartides }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } catch (error) {}
  };
};

export const loadDetails = ({ url = LOAD_DETAILS_URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      dispatch(add({ loadingDetails: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides, indicadorsPartidesDesglossats }) => {
          dispatch(
            add({
              details: indicadorsPartidesDesglossats,
              totals: indicadorsPartides,
            })
          );
          dispatch(add({ loadingDetails: false }));
        })
        .catch((error) => {
          console.log(error);
          dispatch(add({ loadingDetails: false }));
        })
        .finally(() => {
          dispatch(add({ loadingDetails: false }));
        });
    } catch (error) {}
  };
};

export const loadCostes = ({ url = LOAD_COSTES_URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          dispatch(add({ costesUC: _embedded["liniaEstudiCostReals"] }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } catch (error) {}
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

export const selectPartida = (payload) => {
  return {
    type: SELECT_PARTIDA,
    payload,
  };
};

export const resetKpis = () => {
  return {
    type: RESET_KPIS,
  };
};

export const resetPartida = () => {
  return {
    type: RESET_PARTIDA,
  };
};

const getPartidaSelected = ({ ids, state }) => {
  const { rows: infoPartida } = state;
  const selectedPartida = findPartida({ id: ids, partidas: infoPartida });
  return selectedPartida;
};

//Reducers
const initialState = {
  unitControl: {},
  rows: [],
  loading: false,
  kpis: [],
  details: [],
  totals: [],
  costesUC: [],
  loadingDetails: false,
  partidaSelected: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case REPLACE:
      const changedRows = state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      );
      return { ...state, rows: changedRows };

    case SELECT_PARTIDA:
      const { ids } = action.payload;
      return {
        ...state,
        partidaSelected: getPartidaSelected({ ids, state }),
      };

    case RESET_KPIS:
      return { ...state, kpis: [] };
    case RESET_PARTIDA:
      return { ...state, partidaSelected: [] };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
