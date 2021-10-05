import * as React from "react";
import {Button, Grid} from "@mui/material";
import MaterialSelector from "../../shared/MaterialSelector";
import MaterialCheckbox from "../../shared/MaterialCheckbox";
import Paper from "@mui/material/Paper";

const PeriodsManagement = () => {
  const [periods,] = React.useState([
    { label: "Período 1" },
    { label: "Período 2" },
    { label: "Período 3" },
    { label: "Período 4" },
    { label: "Período 5" },
    { label: "Período 6" },
    { label: "Período 7" },
    { label: "Período 8" },
  ]);
  const [statuses,] = React.useState([
    { label: 'Estado' },
    { label: 'Revisado Jefe de Obra' },
    { label: 'Revisado Jefe de Grupo' },
  ]);
  return (

    <Grid container spacing={1} direction="row" alignItems="center" >
      <Grid item xs={12} md={12} lg={4}>
        <MaterialSelector
          id={"period"}
          items={periods}
          onChange={(e) => console.log(e)} label={"Períodos"}/>
      </Grid>
      <Grid item xs={12} md={12} lg={5}>
        <MaterialCheckbox items={statuses} />
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <Button variant={"outlined"} >Cerrar Período</Button>
      </Grid>
     
      
    </Grid>
  )
}

export default PeriodsManagement;