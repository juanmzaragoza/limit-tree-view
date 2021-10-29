import * as React from "react";
import { CircularProgress } from "@mui/material";

import "./loading.css";

export const Loading = ({ size = 40 }) => (
  <div className="loading-shading-mui">
    <CircularProgress size={size} className="loading-icon-mui" />
  </div>
);
