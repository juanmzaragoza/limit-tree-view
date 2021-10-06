import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { getIsLoading, getRows } from "redux/unit-control/selectors";
import { loadData } from "redux/unit-control";

const ControlUnitDetailedContent = ({ rows, loading, actions }) => {
  const [headerProject,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [headerControlUnit,] = React.useState({
    title: 'Unidad de control #1',
  });
  const [fields,] = React.useState([
    { field: 'Importe Total', value: '10.000€'},
    { field: 'Coste Total', value: '10.000€'},
  ]);
  const [columns] = React.useState([
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

  React.useEffect(() => {
    actions.loadHeader({});
  },[]);

  return <Grid container spacing={1}>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerProject}
        body={fields} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerControlUnit}
        body={fields} />
    </Grid>
    <Grid item xs={12}>
      <MaterialDataGrid
        columns={columns}
        rows={rows}
        loading={loading} />
    </Grid>
  </Grid>
}

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadData, dispatch)
  };
  return { actions };
};

const component = connect(mapStateToProps,mapDispatchToProps)(ControlUnitDetailedContent);
export default component;