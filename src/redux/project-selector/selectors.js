import { get } from "lodash";

export const getRows = (state) => get(state, "projectSelector.rows", []);
export const getIsLoading = (state) =>
  get(state, "projectSelector.loading", false);
export const getSelectedProject = (state) =>
  get(state, "projectSelector.selectedProject", null);
