import Axios from "Axios";
import {getFormedURL} from "redux/common";

//Action types
const ADD = "ADD_TO_TREE";

const TREE_SIZE = 10;
const PROJECTS_TREE_RESULT_KEY = 'unitatsControl';

//Functions
export const loadData = ({
  apiId = 'PROJECTS_TREE_URL_ID',
  key = PROJECTS_TREE_RESULT_KEY,
  size = TREE_SIZE,
  page,
  query = [],
  sorting = []
}) => {
  return async dispatch => {
    const formedURL = () => {
      return getFormedURL({id: apiId, size : size , page, sorting, query})
    }
    const apiCall = () => Axios.get(formedURL());
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch(add({ data: _embedded? _embedded[key]:[] }));
          dispatch(add({ loading: false }));
        })
        .catch(error => {
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

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

//Reducers
const initialState = {
  data: false,
  loading: false,
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
