import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PERIODS";

// Constants
const URL = 'api/fact/estudisProjecte?query=projecte.codi=={codi}&sort=numero,desc';

//Functions
export const loadData = ({ url = URL, projectCodi }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{codi}',projectCodi));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded?.estudiProjectes?? [] }));
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
