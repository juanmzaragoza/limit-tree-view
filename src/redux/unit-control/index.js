import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PARTIDA";

// Constants
const URL = 'https://10.35.3.44:8083/api/fact/liniesEstudi?query=unitatControlEstudi.id=="eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImVtcHJlc2FDb2RpIjoiUFJPMiIsInNlcXVlbmNpYSI6Mjg1NCwicHJvamVjdGVDb2RpIjoiRVNQUk8yIiwiZXN0dWRpUHJvamVjdGVDb2RpIjoiMDAwMSIsImVzdHVkaVByb2plY3RlTnVtIjowfQ=="';

//Functions
export const loadData = ({ url = URL }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url);
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded['liniaEstudis'] }));
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
