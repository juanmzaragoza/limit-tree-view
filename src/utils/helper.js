import * as React from "react";
import {
  CatchingPokemon,
  EmojiEvents,
  Business
} from "@mui/icons-material";

import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";

export const primaryColor = '#3a9198';
export const secondaryColor = '#4468a0';
export const greenColor = 'green';
export const redColor = 'red';

export const entitiesStyles = {
  [PROJECT_TYPE]: {

    colorBackground: "rgba(16, 118, 49, 0.30)",
    icon: <Business />,
    iconColor: "#107631",
  },
  [CONTROL_UNIT_TYPE]: {
    colorBackground: "rgba(255, 177, 27, 0.30)",
    icon: <EmojiEvents />,
    iconColor: "#ffb11b",
  },
  [PARTIDA_TYPE]: {
    colorBackground: "rgba(162, 80, 245, 0.30)",
    icon: <CatchingPokemon />,
    iconColor: "#a250f5",
  }

  
}