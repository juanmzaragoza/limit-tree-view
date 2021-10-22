import { get } from "lodash";

export const getRows = (state) => get(state, "project.rows", []);
export const getIsLoading = (state) => get(state, "project.loading", false);
export const getKpis = (state) => get(state, "project.kpis", []);
export const getKpisFact = (state) => get(state, "project.kpisFact", []);
export const getDetails = (state) => get(state, "project.details", []);
export const getTotals = (state) => get(state, "project.totals", []);
export const getTabIndex = (state) => get(state, "project.selectedTab", 0);
export const getIsLoadingDetails = (state) =>
  get(state, "project.loadingDetails", false);
export const getIsLoadingKpis = (state) =>
  get(state, "project.loadingKpis", false);
