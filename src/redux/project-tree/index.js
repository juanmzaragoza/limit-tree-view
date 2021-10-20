import Axios from "Axios";
import { remove } from "lodash";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";
import { formatCurrency } from "utils/formats";
import { findAllParents, findNode } from "./helpers";

//Action types
const ADD = "ADD_TO_TREE";
const RESET = "RESET_TREE";
const SELECT_NODE = "SELECT_NODE_TREE";
const EXPAND_NODE = "EXPAND_NODE_TREE";
const SELECT_AND_EXPAND_NODE = "SELECT_AND_EXPAND_NODE";

// Constants
const URL = 'api/estp/estudisProjecte/{id}/tree';

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
            treeId: _embedded.codi,
            labelText: _embedded.descripcio,
            labelInfo: formatCurrency(_embedded.costTotal),
            type: PROJECT_TYPE,
            nodes: _embedded['unitatsControl'].map(controlUnit => ({
              id: controlUnit.id,
              treeId: `${_embedded.codi}_${controlUnit.codi}`,
              labelInfo: formatCurrency(controlUnit.costTotal),
              labelText: `${controlUnit.codi} - ${controlUnit.descripcio}`,
              type: CONTROL_UNIT_TYPE,
              nodes: controlUnit['partides']?.map(partida => ({
                id: partida.id,
                treeId: `${_embedded.codi}_${controlUnit.codi}_${partida.codi}`,
                labelText: `${partida.codi} - ${partida.descripcioReduc}`,
                labelInfo: formatCurrency(partida.costTotal),
                type: PARTIDA_TYPE,
                nodes: partida['recursos']?.map(resource => ({
                  id: resource.id,
                  treeId: `${_embedded.codi}_${controlUnit.codi}_${partida.codi}_${resource.codi}`,
                  labelText:  `${resource.codi} - ${resource.descripcio}`,
                  labelInfo: formatCurrency(resource.costTotal),
                  disabled: true
                }))
              }))
            }))
          };
          const data = {
            ..._embedded,
            treeId: _embedded.codi,
            unitatsControl: _embedded['unitatsControl'].map(controlUnit => ({
              ...controlUnit,
              treeId: `${_embedded.codi}_${controlUnit.codi}`,
              partides: controlUnit['partides']?.map(partida => ({
                ...partida,
                treeId: `${_embedded.codi}_${controlUnit.codi}_${partida.codi}`,
                recursos: partida['recursos']?.map(resource => ({
                  ...resource,
                  treeId: `${_embedded.codi}_${controlUnit.codi}_${partida.codi}_${resource.codi}`,
                }))
              }))
            }))
          };
          dispatch(add({ formattedData, data }));
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

export const reset = () => {
  return {
    type: RESET
  }
}

export const selectNode = (payload) => {
  return {
    type: SELECT_NODE,
    payload
  }
}

export const expandNode = (payload) => {
  return {
    type: EXPAND_NODE,
    payload
  }
}

export const selectAndExpandNode = (payload) => {
  return {
    type: SELECT_AND_EXPAND_NODE,
    payload
  }
}

//Reducers
const initialState = {
  formattedData: {},
  data: {},
  loading: false,
  expanded: [],
  selectedNode: null
};

const getExpanded = ({ ids, state }) => {
  const { expanded, formattedData: nodes } = state;
  const found = expanded.find(id => ids === id);
  let newExpanded;
  // is opened -> we must close it
  if(found) {
    newExpanded = remove(expanded, (e) => e !== found);
  } else{ // is closed -> open it
    newExpanded = findAllParents({ nodes: nodes, nodeId: ids });
    newExpanded = [...expanded, ...newExpanded, ids];
  }
  return newExpanded;
}

const getSelected = ({ ids, state }) => {
  const { formattedData: nodes } = state;
  // update selected
  const selectedNode = findNode({ nodes: nodes, nodeId: ids });
  return selectedNode;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case SELECT_NODE:
      const { ids } = action.payload;
      return {
        ...state,
        selectedNode: getSelected({ ids, state }),
      }
    case EXPAND_NODE:
      return {
        ...state,
        expanded: getExpanded({ ids: action.payload.ids, state })
      }
    case SELECT_AND_EXPAND_NODE:
      return {
        ...state,
        selectedNode: getSelected({ ids: action.payload.ids, state }),
        expanded: getExpanded({ ids: action.payload.ids, state })
      }
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
