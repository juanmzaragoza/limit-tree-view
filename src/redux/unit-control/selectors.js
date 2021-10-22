import { get } from "lodash";

export const getRows = state => get(state, "unitControl.rows", []);
export const getDetails = state => get(state, "unitControl.details", []);
export const getTotals = state => get(state, "unitControl.totals", []);
export const getIsLoading = state => get(state, "unitControl.loading", false);
export const getIsLoadingDetails = state => get(state, "unitControl.loadingDetails", false);
export const getUnitControl = state => get(state, "unitControl.unitControl", {});
export const getKpis = state => get(state, "unitControl.kpis", []);
export const getTabIndex = state => get(state, "unitControl.tab", []);
export const getPartidaInfo = state => get(state, "unitControl.partidaSelected", []);
export const getIsLoadingKpis = state => get(state, "unitControl.loadingKpis", false);