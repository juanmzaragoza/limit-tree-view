import { get } from "lodash";

export const getRows = state => get(state, "project.rows", []);
export const getIsLoading = state => get(state, "project.loading", false);
export const getKpis = state => get(state, "project.kpis", []);
