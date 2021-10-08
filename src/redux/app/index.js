//Action types
const RESET_ALL = "RESET";

//Functions

//Action creators
export const resetAll = (payload) => {
  return {
    type: RESET_ALL,
    payload
  };
}

//Reducers
