import * as React from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";

import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import {
  Assignment,
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";

import { formatCurrencyWithIntl } from "utils/formats";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import { getIsLoading, getPartida, getRows } from "redux/partida/selectors";
import { loadHeader } from "redux/partida";
import { getUnitControl } from "redux/unit-control/selectors";
import * as API from "redux/api";
import { getData } from "redux/project-tree/selectors";

const ProjectDetailedContent = ({
  rows,
  loading,
  unitControl,
  partida,
  tree,
  actions,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState([]);
  const [headerPartida, setHeaderPartida] = React.useState({});
  const [headerPartidaFields, setHeaderPartidaFields] = React.useState([]);
  const [fields] = React.useState([
    { field: "Importe Total", value: "10.000€" },
    { field: "Coste Total", value: "10.000€" },
  ]);

  const getData = (params) => {
    return `${params.value?.description || ""}`;
  };


  const [columns] = React.useState([
    { field: "codi", headerName: "Código",  type: "number", editable: false },
    {
      field: "descripcio",
      headerName: "Descripción",
      width: 140,
      editable: true,
    },
    { field: "unitats", headerName: "Medición", type: "number", editable: true },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: getData,
      editable: true,
    },
    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: true,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
      editable: false,
    },
  ]);
  const [kpis] = React.useState([
    { field: "Producción Anterior", value: "1000", icon: <Engineering /> },
    { field: "Producción Período", value: "1000", icon: <Engineering /> },
    { field: "Producción año Natural", value: "1000", icon: <Engineering /> },
    { field: "Producción a Origen", value: "1000", icon: <Engineering /> },
    { field: "Producción Pendiente", value: "1000", icon: <Engineering /> },
    {
      field: "Coste Teórico Anterior",
      value: "1000",
      icon: <StackedLineChart />,
    },
    {
      field: "Coste Teórico Pendiente",
      value: "1000",
      icon: <StackedLineChart />,
    },
    {
      field: "Coste Teórico Año Natural",
      value: "1000",
      icon: <StackedLineChart />,
    },
    {
      field: "Coste Teórico Origen",
      value: "1000",
      icon: <StackedLineChart />,
    },
    {
      field: "Coste Teórico Pendiente",
      value: "1000",
      icon: <StackedLineChart />,
    },
    { field: "Coste Real Anterior", value: "1000", icon: <StackedBarChart /> },
    { field: "Coste Real Pendiente", value: "1000", icon: <StackedBarChart /> },
    {
      field: "Coste Real año Natural",
      value: "1000",
      icon: <StackedBarChart />,
    },
    { field: "Coste Real Origen", value: "1000", icon: <StackedBarChart /> },
    { field: "Beneficio Anterior", value: "1000", icon: <Euro /> },
    { field: "Beneficio Período", value: "1000", icon: <Euro /> },
    { field: "Beneficio año Natural", value: "1000", icon: <Euro /> },
    { field: "Beneficio Origen", value: "1000", icon: <Euro /> },
    {
      field: "Desviación Anterior",
      value: "1000",
      icon: <CallMissedOutgoing />,
    },
    {
      field: "Desviación Período",
      value: "1000",
      icon: <CallMissedOutgoing />,
    },
    {
      field: "Desviación año Natural",
      value: "1000",
      icon: <CallMissedOutgoing />,
    },
    { field: "Desviación Origen", value: "1000", icon: <CallMissedOutgoing /> },
    { field: "Facturación Anterior", value: "1000", icon: <Assignment /> },
    { field: "Facturación Período", value: "1000", icon: <Assignment /> },
    { field: "Facturación año Natural", value: "1000", icon: <Assignment /> },
    { field: "Facturación Origen", value: "1000", icon: <Assignment /> },
    { field: "Obra Pendiente Anterior", value: "1000", icon: <Construction /> },
    { field: "Obra Pendiente Período", value: "1000", icon: <Construction /> },
    {
      field: "Obra Pendiente año Natural",
      value: "1000",
      icon: <Construction />,
    },
    { field: "Obra Pendiente Origen", value: "1000", icon: <Construction /> },
  ]);

  React.useEffect(() => {
    actions.loadHeader({url : API.PARTIDA_URL, id: props.id});
  }, [props.id]);

  React.useEffect(() => {

    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(unitControl.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(unitControl.costTotal ?? 0, intl),
      },
    ]);
  }, [ unitControl, intl]);

  React.useEffect(() => {
    setHeaderPartida({ title: partida.descripcio });
    setHeaderPartidaFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(partida.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(partida.costTotal ?? 0, intl),
      },
    ]);
  }, [partida, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields( [
      { field: 'Importe Total', value: formatCurrencyWithIntl(tree.importTotal?? 0, intl)},
      { field: 'Coste Total', value: formatCurrencyWithIntl(tree.costTotal?? 0, intl)},
    ])
  },[tree, intl]);


  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader header={headerProject} body={headerProjectFields} />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
        />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader header={headerPartida} body={headerPartidaFields} />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid columns={columns} rows={rows} loading={loading} />
      </Grid>
      <Grid item xs={12}>
        <MaterialCardPartidaIndicator title="Indicadores" content={kpis} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    unitControl: getUnitControl(state),
    partida: getPartida(state),
    tree: getData(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
