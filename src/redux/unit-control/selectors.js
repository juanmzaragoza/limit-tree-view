import { get } from "lodash";

export const getRows = state => get(state, "unitControl.rows", []);
export const getIsLoading = state => get(state, "unitControl.loading", false);