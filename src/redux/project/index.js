import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PROJECT";

// Constants
const URL =
  'api/fact/unitatsControlEstudi?query=estudiProjecte.id=="eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiIwMDAxIiwiZW1wcmVzYUNvZGkiOiJQUk8yIiwibnVtZXJvIjowLCJwcm9qZWN0ZUNvZGkiOiJFU1BSTzIifQ=="';

//Functions
export const loadData = ({ url = URL, keyFilter, id }) => {
  const formedURL = () => {
    return `${url}${keyFilter ? `?query=${keyFilter}=="${id}"` : ""}`;
  };
  return async (dispatch) => {
    const apiCall = () => Axios.get(formedURL());
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

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload,
  };
};

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
