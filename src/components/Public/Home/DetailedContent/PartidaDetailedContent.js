import * as React from "react";
import { connect } from "react-redux";
import {Grid} from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialKpi from "components/shared/MaterialKpi";
import { getIsLoading, getRows } from "redux/partida/selectors";

/*const createData = (codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient) => {
  return { codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient };
}*/

const ProjectDetailedContent = ({ rows, loading }) => {

  const [headerProject,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [headerControlUnit,] = React.useState({
    title: 'Unidad de control #1',
  });
  const [headerPartida,] = React.useState({
    title: 'Partida 1.1',
    subheader: 'Capítulo 1',
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
  /*const [rows,] = React.useState([
    createData('0001', 'Partida 1', 10, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0002', 'Partida 2', 12, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0003', 'Partida 3', 14, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0004', 'Partida 4', 16, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0005', 'Partida 5', 18, 'M3', 10, 10, 100, 12, 120, 2, 6, 2)
  ]);*/
  const [kpis] = React.useState([
    { field: "Producción Anterior", value:"1000" },
    { field: "Producción Período", value:"1000" },
    { field: "Producción año Natural", value:"1000" },
    { field: "Producción a Origen", value:"1000" },
    { field: "Producción Pendiente", value:"1000" },
    { field: "Costo Teórico Anterior", value:"1000" },
  ])

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <DetailedHeader
        header={headerProject}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerControlUnit}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerPartida}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={12}>
      <MaterialDataGrid
        columns={columns}
        rows={rows}
        loading={loading} />
    </Grid>
    <Grid item xs={12}>
      <MaterialKpi content={kpis} />
    </Grid>
  </Grid>
}

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state)
  };
};

const component = connect(mapStateToProps,null)(ProjectDetailedContent);
export default component;