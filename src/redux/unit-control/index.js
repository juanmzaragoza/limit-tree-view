import Axios from "Axios";

//Action types
const ADD = "ADD_TO_UC";
const REPLACE = "REPLACE_TO_UC";

// Constants
const URL = 'api/fact/liniesEstudi?query=unitatControlEstudi.id=="{id}"';
const HEADER_URL = 'api/fact/unitatsControlEstudi';
const UPDATE_PARTIDA = 'api/fact/liniesEstudi';

//Functions
export const loadData = ({ url = URL, id  }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{id}',id));
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

export const loadHeader = ({ url = HEADER_URL, id  }) => {
  const formedURL = () => {
    return `${url}/${id}`;
  };
  return async dispatch => {
    const apiCall = () => Axios.get(formedURL());
    try {
      //dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then((_embedded) => {
          dispatch(add({ unitControl: _embedded }));
          //dispatch(add({ loading: false }));
        })
        .catch(error => {
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
}

export const updatePartida = ({ url = UPDATE_PARTIDA, id, data }) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(add({ loading: true }));
        const queryString = `${url}/${id}`;
        Axios.put(queryString, JSON.stringify(data))
          .then(({ status, data, ...rest }) => {
            dispatch(replace({ id, ...data }));
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
    })
  };
}

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

export const replace = (payload) => {
  return {
    type: REPLACE,
    payload
  }
}


//Reducers
const initialState = {
  unitControl: {},
  rows: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case REPLACE:
      const changedRows = state.rows.map(row => row.id === action.payload.id? action.payload:row)
      return { ...state, rows: changedRows };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
