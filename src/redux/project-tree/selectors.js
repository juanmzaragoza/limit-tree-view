import { get } from "lodash";

export const getData = state => get(state, "projectTree.data", {});
export const getIsLoading = state => get(state, "projectTree.loading", false);
