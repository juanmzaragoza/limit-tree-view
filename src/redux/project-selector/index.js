import Axios from "Axios";
import { isEmpty } from "lodash";
import { buildQuery } from "redux/common";

//Action types
const ADD = "ADD_TO_PROJECT_SELECTOR";

// Constants
const URL = "api/estp/projectes?page=0&size=40&sort=codi";

//Functions
export const loadData = ({ url = URL, query }) => {
  return async dispatch => {
    const q = buildQuery({ query });
    const apiCall = () => Axios.get(`${url}${isEmpty(q)? "":`&${q}`}`);
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded['projectes'] }));
          dispatch(add({ loading: false }));
        })
        .catch(error => {
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

export const setProject = ({ project }) => {
  return async dispatch => {
    dispatch(add({ selectedProject: project }));
  }
}

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

//Reducers
const initialState = {
  rows: [],
  loading: false,
  selectedProject: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
