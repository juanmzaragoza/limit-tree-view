import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function MaterialCheckbox({ items }) {
  return (
    <>
      {items.map((item, key) => {
      return(
        <FormControlLabel key={key} control={<Checkbox />} label={item.label} />
      );
  })}
    </>
  );
}
