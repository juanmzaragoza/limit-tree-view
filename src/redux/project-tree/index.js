import Axios from "Axios";
import { FormattedNumber } from "react-intl";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";

//Action types
const ADD = "ADD_TO_TREE";

// Constants
const URL = 'api/fact/estudisProjecte/eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiIwMDAxIiwiZW1wcmVzYUNvZGkiOiJQUk8yIiwibnVtZXJvIjowLCJwcm9qZWN0ZUNvZGkiOiJFU1BSTzIifQ==/tree';

const formatCurrency = (value) => <FormattedNumber value={value} style={"currency"} currency="EUR" />;
//Functions
export const loadData = ({ url = URL }) => {
  return async dispatch => {
    const apiCall = () => Axios.get(url);
    try {
      dispatch(add({ loading: true }));
      apiCall()
        .then(({data}) => data)
        .then((_embedded) => {
          const formattedData = {
            id: 'project1',
            labelText: 'Proyecto 1',
            labelInfo: '20.000€',
            type: PROJECT_TYPE,
            nodes: _embedded['unitatsControl'].map(controlUnit => ({
              id: controlUnit.id,
              labelInfo: formatCurrency(10000000),
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
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
