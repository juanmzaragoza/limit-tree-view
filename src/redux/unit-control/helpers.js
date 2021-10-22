import { forEach } from "lodash";

export const findPartida = ({ id, partidas }) => {
  let founded = {};
  forEach(partidas, function (partida) {
    if (partida.id === id) {
      founded = partida;
    }
  });
  return founded;
};
