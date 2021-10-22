import { get } from "lodash";

export const getRows = (state) => get(state, "period.rows", []);
export const getIsLoading = (state) => get(state, "period.loading", false);
export const getSelectedPeriod = (state) =>
  get(state, "period.selectedPeriod", null);
