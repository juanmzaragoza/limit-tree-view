import { get } from "lodash";

export const getRows = state => get(state, "projectSelector.rows", []);
export const getIsLoading = state => get(state, "projectSelector.loading", false);
