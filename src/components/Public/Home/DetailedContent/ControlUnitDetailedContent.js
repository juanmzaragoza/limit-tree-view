import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { getIsLoading, getRows } from "redux/unit-control/selectors";
import { loadData } from "redux/unit-control";

const ControlUnitDetailedContent = ({ rows, loading, actions }) => {
  const [headerProject] = React.useState({
    title: "Proyecto 1",
    subheader: "Capítulo 1",
  });
  const [headerControlUnit] = React.useState({
    title: "Unidad de control #1",
  });
  const [fields] = React.useState([
    { field: "Importe Total", value: "10.000€" },
    { field: "Coste Total", value: "10.000€" },
  ]);
  const [columns] = React.useState([
    { field: "codi", headerName: "Código", minWidth: 150, editable: true },
    {
      field: "descripcio",
      headerName: "Descripció",
      minWidth: 200,
      editable: true,
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "unitatsTipus",
      headerName: "Tipo Unidad",
      type: "number",
      minWidth: 150,
      editable: true,
    },
    {
      field: "unitatsPress",
      headerName: "Un. Pres",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "preuNet",
      headerName: "Pvp Neto",
      type: "number",
      minWidth: 140,
      editable: false,
    },
    {
      field: "importTotal",
      headerName: "Importe",
      type: "number",
      minWidth: 140,
      editable: false,
    },
    {
      field: "costUni",
      headerName: "Coste Unitario",
      type: "number",
      minWidth: 150,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      minWidth: 140,
      editable: false,
    },
    {
      field: "unitatsAnterior",
      headerName: "Medición Anterior",
      type: "number",
      minWidth: 170,
      editable: false,
    },
    {
      field: "unitatsActual",
      headerName: "Medición Actual",
      type: "number",
      minWidth: 160,
      editable: true,
    },
    {
      field: "medicioOrigen",
      headerName: "Meidición Origen",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "pendent",
      headerName: "Meidición Pendiente",
      type: "number",
      minWidth: 140,
      editable: true,
    },
  ]);

  React.useEffect(() => {
    actions.loadHeader({});
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <DetailedHeader header={headerProject} body={fields} />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader header={headerControlUnit} body={fields} />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid columns={columns} rows={rows} loading={loading} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadData, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);
export default component;
