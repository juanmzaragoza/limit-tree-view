import { combineReducers } from "redux";
import example from "redux/example/index.js";
import projectTree from "redux/project-tree/index.js";
import project from "redux/project/index.js";
import unitControl from "redux/unit-control/index.js";
import partida from "redux/partida/index.js";
import projectSelector from "redux/project-selector/index.js";
import period from "redux/period/index.js";

export default combineReducers({
  example,
  projectTree,
  project,
  unitControl,
  partida,
  projectSelector,
  period
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}