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
            labelText: 'Proyecto 1',
            labelInfo: formatCurrency(_embedded.costTotal),
            type: PROJECT_TYPE,
            nodes: _embedded['unitatsControl'].map(controlUnit => ({
              id: controlUnit.id,
              labelInfo: formatCurrency(controlUnit.costTotal),
              labelText: controlUnit.descripcio,
              type: CONTROL_UNIT_TYPE,
              nodes: controlUnit['partides'].map(partida => ({
                id: partida.id,
                labelText: partida.descripcio,
                labelInfo: formatCurrency(partida.costTotal),
                type: PARTIDA_TYPE,
                nodes: partida['recursos']?.map(resource => ({
                  id: resource.id,
                  labelText: resource.descripcio,
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

//Reducers
const initialState = {
  formattedData: {},
  data: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, ...action.payload };
    case RESET:
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
