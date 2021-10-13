import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PROJECT";
const RESET_KPIS = "RESET_KPIS_TO_PROJECT";

// Constants
const URL = 'api/fact/unitatsControlEstudi?query=estudiProjecte.id=="{id}"&sort=codi';
const LOAD_KPIS_URL = 'api/fact/estudisProjecte/{id}/indicadors';

//Functions
export const loadData = ({ url = URL, id }) => {
  return async (dispatch) => {
    const apiCall = () => Axios.get(url.replace('{id}',id));
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
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{id}',id));
    try {
      apiCall()
        .then(({data}) => data)
        .then(({ indicadorsPartides }) => {
          dispatch(add({ kpis: indicadorsPartides }));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
        });
    } catch (error) {
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
    type: RESET_KPIS
  }
};

//Reducers
const initialState = {
  rows: [],
  loading: false,
  kpis: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case RESET_KPIS:
      return { ...state, kpis: [] };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
