import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PROJECT";
const RESET_KPIS = "RESET_KPIS_TO_PROJECT";
const SELECT_TAB = "SELECT_TAB";
// Constants
const URL = 'api/estp/unitatsControlEstudi?query=estudiProjecte.id=="{id}"&sort=codi';
const LOAD_KPIS_URL = "api/estp/estudisProjecte/{id}/indicadors";
const LOAD_DETAILS_URL = "api/estp/estudisProjecte/{id}/indicadors?desglossat=true";

//Functions
export const loadData = ({ url = URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace("{id}", id));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({ data }) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded["unitatControlEstudis"].map(unitatControlEstudi => ({
              ...unitatControlEstudi,
              treeId: `${unitatControlEstudi?.estudiProjecte?.pk?.codi}_${unitatControlEstudi.codi}`
            })
          )}));
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
      apiCall()
        .then(({ data }) => { dispatch(add({ kpisFact: data, kpis: data['indicadorsPartides'] }));})
       
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
              details: indicadorsPartidesDesglossats.map(indicadorPartidesDesglossats => ({
                ...indicadorPartidesDesglossats,
                treeId: `${indicadorPartidesDesglossats.estudiProjecteCodi}_${indicadorPartidesDesglossats.unitatControlCodi}`
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
    payload
  }
}


const getSelected = ({ value }) => {

  // update selected
  const selectedTab =   value ;
  return selectedTab;
}

//Reducers
const initialState = {
  rows: [],
  loading: false,
  kpis: [],
  details: [],
  selectedTab: 0,
  loadingDetails: false,
  kpisFact:{}
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case RESET_KPIS:
      return { ...state, kpis: [] };
    case SELECT_TAB:
      const { value } = action.payload;
      return {
        ...state,
        selectedTab: getSelected({ value }),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
