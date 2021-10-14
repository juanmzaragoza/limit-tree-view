import { get } from "lodash";

export const getData = state => get(state, "projectTree.data", {});
export const getFormattedData = state => get(state, "projectTree.formattedData", {});
export const getIsLoading = state => get(state, "projectTree.loading", false);
export const getExpanded = state => get(state, "projectTree.expanded", []);
export const getSelectedNode = state => get(state, "projectTree.selectedNode", []);