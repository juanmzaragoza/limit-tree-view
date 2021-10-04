import {Grid} from "@mui/material";
import DetailedHeader from "../../../shared/DetailedHeader";
import MaterialDataGrid from "../../../shared/MaterialDataGrid";
import * as React from "react";

const createData = (codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient) => {
  return { codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient };
}

const ProjectDetailedContent = () => {

  const [header,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [summary,] = React.useState({
    primary: "50.000€",
    secondary: "/totales"
  });
  const [fields,] = React.useState([
    { field: 'Coste Real', value: '10.000€'},
    { field: 'Coste Medio', value: '10.000€'},
    { field: 'Coste estimado', value: '10.000€'},
    { field: 'Presuesto capitulo', value: '10.000€'}
  ]);
  const [percentage,] = React.useState("5%");

  const [columns,] = React.useState([
    { field: 'codi', headerName: 'Código', width: 120, editable: true },
    { field: 'descripcio', headerName: 'Descripció', width: 140, editable: true },
    { field: 'medicio', headerName: 'Medición',  width: 120, editable: true },
    { field: 'tipoUnidad', headerName: 'Tipo Unidad', editable: true },
    { field: 'unPres', headerName: 'Un. Pres', editable: true },
    { field: 'pvpNeto', headerName: 'Pvp Neto', type: 'number', editable: true },
    { field: 'importe', headerName: 'Importe', type: 'number', editable: true },
    { field: 'costeUnit', headerName: 'Coste Unitario', type: 'number', editable: true },
    { field: 'costeTot', headerName: 'Coste Total', type: 'number', editable: true },
    { field: 'medicionAnt', headerName: 'Medición Anterior', type: 'number', editable: true },
    { field: 'medicionAct', headerName: 'Medición Actual', type: 'number', editable: true },
    { field: 'pendient', headerName: 'Pendiente', type: 'number', editable: true },
  ]);
  const [rows,] = React.useState([
    createData('0001', 'Partida 1', 10, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0002', 'Partida 2', 12, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0003', 'Partida 3', 14, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0004', 'Partida 4', 16, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0005', 'Partida 5', 18, 'M3', 10, 10, 100, 12, 120, 2, 6, 2)
  ]);

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <DetailedHeader
        header={header}
        summary={summary}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={12}>
      <MaterialDataGrid
        columns={columns}
        rows={rows} />
    </Grid>
  </Grid>
}

export default ProjectDetailedContent;