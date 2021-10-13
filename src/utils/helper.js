import BusinessIcon from "@mui/icons-material/Business";
import * as React from "react";
import {CatchingPokemon, EmojiEvents} from "@mui/icons-material";

export const primaryColor = '#3a9198';
export const secondaryColor = '#4468a0';
export const greenColor = 'green';
export const redColor = 'red';

export const entitiesStyles = {
  'project': {
    colorBackground: "rgba(58, 145, 152, 0.30)",
    icon: <BusinessIcon />,
    iconColor: primaryColor,
  },
  'controlUnit': {
    colorBackground: "rgba(255, 177, 27, 0.30)",
    icon: <EmojiEvents />,
    iconColor: "#ffb11b",
  },
  'partida': {
    colorBackground: "rgba(162, 80, 245, 0.30)",
    icon: <CatchingPokemon />,
    iconColor: "#a250f5",
  }
}