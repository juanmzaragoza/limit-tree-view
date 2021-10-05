import { combineReducers } from "redux";
import example from "redux/example/index.js";
import projectTree from "redux/project-tree/index.js";
import unitControl from "redux/unit-control/index.js";

export default combineReducers({
  example,
  projectTree,
  unitControl
});

//Global action to reset the store
export function resetStore() {
  return {
    type: "RESET"
  };
}