import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PROJECT";
const RESET_KPIS = "RESET_KPIS_TO_PROJECT";
const SELECT_TAB = "SELECT_TAB";

// Constants
const URL =
  'api/estp/unitatsControlEstudi?query=estudiProjecte.id=="{id}"&sort=codi';
const LOAD_KPIS_URL = "api/estp/estudisProjecte/{id}/indicadors";
const LOAD_DETAILS_URL =
  "api/estp/estudisProjecte/{id}/indicadors?desglossat=true";

//Functions
export const loadData = ({ url = URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    const getTreeId = (node) =>
      `${node?.estudiProjecte?.pk?.codi}_${node.codi}`;
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          dispatch(
            add({
              rows: _embedded["unitatControlEstudis"].map((row) => ({
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

export const loadKpis = ({ url = LOAD_KPIS_URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      dispatch(add({ loadingKpis: true }));
      apiCall()
        .then(({ data }) => {
          dispatch(add({ kpisFact: data, kpis: data["indicadorsPartides"] }));
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
      `${node?.estudiProjecteCodi}_${node?.unitatControlCodi}`;
    try {
      dispatch(add({ loadingDetails: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides, indicadorsPartidesDesglossats }) => {
          dispatch(
            add({
              details: indicadorsPartidesDesglossats.map((indicador) => ({
                ...indicador,
                treeId: getTreeId(indicador),
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
      dispatch(add({ loadingDetails: false }));
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

export const resetKpis = () => {
  return {
    type: RESET_KPIS,
  };
};

export const selectTab = (payload) => {
  return {
    type: SELECT_TAB,
    payload,
  };
};

//Reducers
const initialState = {
  rows: [],
  loading: false,
  kpis: [],
  details: [],
  selectedTab: 0,
  loadingDetails: false,
  loadingKpis: false,
  kpisFact: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case RESET_KPIS:
      return { ...state, kpis: [] };
    case SELECT_TAB: {
      const { value: selectedTab } = action.payload;
      return {
        ...state,
        selectedTab,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
