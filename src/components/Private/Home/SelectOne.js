import { Grid } from "@mui/material";
import logoLimit from "assets/img/logo_limit.svg";

const SelectOne = () => {
  return (
    <Grid container>
      <Grid item lg={4}></Grid>
      <Grid item lg={4}>
        <img
          alt="select-one-logo-limit"
          src={logoLimit}
          className="logoLimit"
        />
      </Grid>
    </Grid>
  );
};

export default SelectOne;
