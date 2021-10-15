import { Grid } from "@mui/material";
import logoLimit from "../../../utils/logo_limit.svg";

const SelectOne = () => {
  return (
    <Grid container>
      <Grid item lg={4}></Grid>
      <Grid item lg={4}>
        <img src={logoLimit} className="logoLimit" />
      </Grid>
    </Grid>
  );
};


export default SelectOne;
