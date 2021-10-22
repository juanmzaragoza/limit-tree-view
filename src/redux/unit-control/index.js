import Axios from "Axios";
import { findPartida } from "./helpers";

//Action types
const ADD = "ADD_TO_UC";
const REPLACE = "REPLACE_TO_UC";
const RESET_KPIS = "RESET_KPIS_TO_PARTIDA";
const SELECT_PARTIDA = "SELECT_PARTIDA";
const RESET_PARTIDA = "RESET_PARTIDA";

// Constants
const URL =
  'api/estp/liniesEstudi?query=unitatControlEstudi.id=="{id}"&sort=codi';
const HEADER_URL = "api/estp/unitatsControlEstudi";
const UPDATE_PARTIDA_URL = "api/estp/liniesEstudi";
const LOAD_KPIS_URL = "api/estp/unitatsControlEstudi/{id}/indicadors";
const LOAD_DETAILS_URL =
  "api/estp/unitatsControlEstudi/{id}/indicadors?desglossat=true";

//Functions
export const loadData = ({ url = URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    const getTreeId = (node) =>
      `${node?.estudiProjecte?.pk?.codi}_${node?.unitatControlEstudi?.description}_${node?.codi}`;
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          const rows = _embedded?.liniaEstudis ?? [];
          dispatch(
            add({
              rows: rows.map((row) => ({
                ...row,
                treeId: getTreeId(row),
              })),
            })
          );
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
          dispatch(
            add({
              unitControl: {
                ..._embedded,
                treeId: `${_embedded?.estudiProjecte?.pk?.codi}_${_embedded.codi}`,
              },
            })
          );
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
            dispatch(selectPartida({ ids: id }));
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
      dispatch(add({ loadingKpis: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides }) => {
          dispatch(add({ kpis: indicadorsPartides }));
          dispatch(add({ loadingKpis: false }));
        })
        .catch((error) => {
          console.log(error);
          dispatch(add({ loadingKpis: false }));
        })
        .finally(() => {
          dispatch(add({ loadingKpis: false }));
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadDetails = ({ url = LOAD_DETAILS_URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    const getTreeId = (node) =>
      `${node?.estudiProjecteCodi}_${node.unitatControlCodi}_${node.codi}`;
    try {
      dispatch(add({ loadingDetails: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides, indicadorsPartidesDesglossats }) => {
          dispatch(
            add({
              details: indicadorsPartidesDesglossats.map((detail) => ({
                ...detail,
                treeId: getTreeId(detail),
              })),
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
    } catch (error) {
      console.log(error);
    }
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
  loadingKpis: false,
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
    case SELECT_PARTIDA: {
      const { ids } = action.payload;
      const partidaSelected = findPartida({ id: ids, partidas: state.rows });
      return {
        ...state,
        partidaSelected,
      };
    }
    case RESET_KPIS:
      return { ...state, kpis: [] };
    case RESET_PARTIDA:
      return { ...state, partidaSelected: {} };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
