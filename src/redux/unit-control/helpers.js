import { forEach } from "lodash";

export const findPartida = ({ id, partidas }) => {
  let founded = {};
  forEach(partidas, function (value) {
    if (value.id === id) {
      founded = value;
    }
  });

  return founded;
};
