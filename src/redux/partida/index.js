import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PARTIDA";
const REPLACE = "REPLACE_TO_PARTIDA";
const RESET_KPIS = "RESET_KPIS_TO_PARTIDA";

// Constants
const URL = 'api/fact/recursosEstudi?query=liniaEstudi.id=="{id}"&sort=codi';
const HEADER_URL = 'api/fact/liniesEstudi';
const UPDATE_RESOURCE_URL = 'api/fact/recursosEstudi';
const LOAD_KPIS_URL = 'api/fact/liniesEstudi/{id}/indicadors';

//Functions
export const loadData = ({ url = URL, id }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{id}',id));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded?.recursEstudis
            .map((resource, index) => {
              if(!resource.codi)
                resource.codi = "hardcoded"+index;
                return resource;
            })
          }));
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

export const loadHeader = ({ url = HEADER_URL, id }) => {
  const formedURL = () => `${url}/${id}`;
  return async dispatch => {
    const apiCall = () => Axios.get(formedURL());
    try {
      //dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then((_embedded) => {
          dispatch(add({ partida: _embedded }));
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

export const update = ({ url = UPDATE_RESOURCE_URL, id, data }) => {
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

export const loadKpis = ({ url = LOAD_KPIS_URL, id }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{id}',id));
    try {
      apiCall()
        .then(({data}) => data)
        .then((data) => {
          dispatch(add({kpis: data
            // kpis: Object.keys(data).map((key, index) => {
            //   return {
            //     field: key,
            //     value: data[key]
            //   }
            // })
          }));
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
    payload
  };
}

export const replace = (payload) => {
  return {
    type: REPLACE,
    payload
  }
}

export const resetKpis = () => {
  return {
    type: RESET_KPIS
  }
}

//Reducers
const initialState = {
  partida: {},
  rows: [],
  loading: false,
  kpis: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case REPLACE:
      const changedRows = state.rows.map(row => row.id === action.payload.id? action.payload:row)
      return { ...state, rows: changedRows };
    case RESET_KPIS:
      return { ...state, kpis: [] };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
