import * as React from "react";
import {connect} from "react-redux";
import {Grid} from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import { getIsLoading, getRows } from "redux/unit-control/selectors";

const ProjectDetailedContent = ({ rows }) => {

  const [header,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [summary,] = React.useState({
    primary: "50.000€",
    secondary: "/totales"
  });
  const [fields,] = React.useState([
    { field: 'Importe Total', value: '10.000€'},
    { field: 'Coste Total', value: '10.000€'},

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

  return <Grid container spacing={1}>
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

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state)
  };
};

const component = connect(mapStateToProps,null)(ProjectDetailedContent);
export default component;