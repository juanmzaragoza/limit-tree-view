import { get } from "lodash";

export const getRows = state => get(state, "partida.rows", []);
export const getIsLoading = state => get(state, "partida.loading", false);
export const getPartida = state => get(state, "partida.partida", {});