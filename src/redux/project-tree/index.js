import Axios from "Axios";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";
import { formatCurrency } from "utils/formats";

//Action types
const ADD = "ADD_TO_TREE";
const RESET = "RESET_TREE";
const EXPAND_UNTIL = "EXPAND_TREE_UNTIL_NODE_ID";

// Constants
const URL = 'api/fact/estudisProjecte/{id}/tree';

//Functions
export const loadData = ({ url = URL, periodId }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url.replace('{id}',periodId));
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then((_embedded) => {
          const formattedData = {
            id: _embedded.id,
            labelText: _embedded.descripcio,
            labelInfo: formatCurrency(_embedded.costTotal),
            type: PROJECT_TYPE,
            nodes: _embedded['unitatsControl'].map(controlUnit => ({
              id: controlUnit.id,
              labelInfo: formatCurrency(controlUnit.costTotal),
              labelText: `${controlUnit.codi} - ${controlUnit.descripcio}`,
              type: CONTROL_UNIT_TYPE,
              nodes: controlUnit['partides'].map(partida => ({
                id: partida.id,
                labelText: `${partida.codi} - ${partida.descripcioReduc}`,
                labelInfo: formatCurrency(partida.costTotal),
                type: PARTIDA_TYPE,
                nodes: partida['recursos']?.map(resource => ({
                  id: resource.id,
                  labelText:  `${resource.codi} - ${resource.descripcio}`,
                  labelInfo: formatCurrency(resource.costTotal),
                  disabled: true
                }))
              }))
            }))
          }
          dispatch(add({ formattedData, data: _embedded }));
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

export const setExpanded = ({ expanded }) => {
  return async dispatch => {
    dispatch(add({ expanded }));
  }
}

//Action creators
export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
}

export const reset = () => {
  return {
    type: RESET
  }
}

export const expandTreeUntil = (payload) => {
  return {
    type: EXPAND_UNTIL,
    payload
  }
}

//Reducers
const initialState = {
  formattedData: {},
  data: {},
  loading: false,
  expanded: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case EXPAND_UNTIL:
      const { row } = action.payload;
      return { ...state, expanded: [...state.expanded, row.id] };
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
