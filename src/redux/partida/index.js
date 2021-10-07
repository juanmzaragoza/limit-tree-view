import Axios from "Axios";

//Action types
const ADD = "ADD_TO_PARTIDA";

// Constants
const URL = 'api/fact/recursosEstudi?query=liniaEstudi.id=="eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImVtcHJlc2FDb2RpIjoiUFJPMiIsInNlcXVlbmNpYSI6MjYzMjksInByb2plY3RlQ29kaSI6IkVTUFJPMiIsImVzdHVkaVByb2plY3RlQ29kaSI6IjAwMDEiLCJlc3R1ZGlQcm9qZWN0ZU51bSI6MH0="';
const HEADER_URL = 'api/fact/liniesEstudi/eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImVtcHJlc2FDb2RpIjoiUFJPMiIsInNlcXVlbmNpYSI6MjYzMjksInByb2plY3RlQ29kaSI6IkVTUFJPMiIsImVzdHVkaVByb2plY3RlQ29kaSI6IjAwMDEiLCJlc3R1ZGlQcm9qZWN0ZU51bSI6MH0=';

//Functions
export const loadData = ({ url = URL, keyFilter, id }) => {
  const formedURL = () => {
    return `${url}${keyFilter ? `?query=${keyFilter}=="${id}"` : ""}`;
  };
  return async dispatch => {
    const apiCall = () => Axios.get(formedURL());
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then(({ _embedded }) => {
          dispatch(add({ rows: _embedded['recursEstudis']
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

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

//Reducers
const initialState = {
  partida: {},
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
