import { combineReducers } from "redux";
import projectTree from "redux/project-tree/index.js";
import project from "redux/project/index.js";
import unitControl from "redux/unit-control/index.js";
import partida from "redux/partida/index.js";
import projectSelector from "redux/project-selector/index.js";
import period from "redux/period/index.js";
import enterpriseGroup from "redux/enterpriseGroup/index.js";

export default combineReducers({
  projectTree,
  project,
  unitControl,
  partida,
  projectSelector,
  period,
  enterpriseGroup,
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET",
  };
}
