import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PROJECT";
const RESET_KPIS = "RESET_KPIS_TO_PROJECT";
const SELECT_TAB = "SELECT_TAB";
// Constants
const URL =
  'api/estp/unitatsControlEstudi?query=estudiProjecte.id=="{id}"&sort=codi';
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
          dispatch(add({ rows: _embedded["unitatControlEstudis"] }));
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
      apiCall()
        .then(({ data }) => data)
        .then(({ indicadorsPartides, indicadorsPartidesDesglossats }) => {
          dispatch(
            add({
              details: indicadorsPartidesDesglossats,
              totals: indicadorsPartides,
            })
          );
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
  selectedTab: 0
  
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
