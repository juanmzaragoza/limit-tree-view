import { get } from "lodash";

export const getRows = state => get(state, "partida.rows", []);
export const getIsLoading = state => get(state, "partida.loading", false);
export const getPartida = state => get(state, "partida.partida", {});
export const getKpis = state => get(state, "partida.kpis", []);
export const getCost = state => get(state, "partida.costesPartida", []);
export const getIsLoadingKpis = state => get(state, "partida.loadingkpis", false);