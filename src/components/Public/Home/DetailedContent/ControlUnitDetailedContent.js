import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import {useIntl} from "react-intl";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import {
  getIsLoading,
  getRows,
  getUnitControl
} from "redux/unit-control/selectors";
import { loadHeader } from "redux/unit-control";
import { getData } from "redux/project-tree/selectors";
import { formatCurrencyWithIntl } from "utils/formats";

const ControlUnitDetailedContent = ({ rows, loading, unitControl, actions, project, tree, ...props }) => {
  const intl = useIntl();

  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState([]);

  const getData = (params) => `${params.value?.description || ""}`;
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
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: getData,
      minWidth:150,
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
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.preuNet ?? 0, intl);
      },
      minWidth: 140,
      editable: false,
    },
    {
      field: "importTotal",
      headerName: "Importe",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.importTotal ?? 0, intl);
      },
      minWidth: 140,
      editable: false,
    },
    {
      field: "costUni",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUni ?? 0, intl);
      },
      minWidth: 150,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
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
      minWidth: 170,
      editable: true,
    },
    {
      field: "medicioOrigen",
      headerName: "Medición Origen",
      type: "number",
      minWidth: 170,
      editable: true,
    },
    {
      field: "pendent",
      headerName: "Medición Pendiente",
      type: "number",
      minWidth: 170,
      editable: true,
    },
  ]);

  React.useEffect(() => {
    actions.loadHeader({ id: props.id });
  }, [props.id]);

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields( [
      { field: 'Importe Total', value: formatCurrencyWithIntl(unitControl.importTotal?? 0, intl)},
      { field: 'Coste Total', value: formatCurrencyWithIntl(unitControl.costTotal?? 0, intl)},
    ])
  },[unitControl, intl]);


  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields( [
      { field: 'Importe Total', value: formatCurrencyWithIntl(tree.importTotal?? 0, intl)},
      { field: 'Coste Total', value: formatCurrencyWithIntl(tree.costTotal?? 0, intl)},
    ])
  },[tree, intl]);

  return <Grid container spacing={1}>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerProject}
        body={headerProjectFields} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerControlUnit}
        body={headerControlUnitFields} />
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
    loading: getIsLoading(state),
    unitControl: getUnitControl(state),
    tree: getData(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch)
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);
export default component;
