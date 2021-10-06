import { get } from "lodash";

export const getRows = state => get(state, "resource.rows", []);
export const getIsLoading = state => get(state, "resource.loading", false);
