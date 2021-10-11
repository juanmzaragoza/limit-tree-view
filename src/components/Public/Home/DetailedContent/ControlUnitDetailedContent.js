import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import { useIntl } from "react-intl";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { formatCurrencyWithIntl } from "utils/formats";
import {
  getIsLoading,
  getRows,
  getUnitControl,
} from "redux/unit-control/selectors";
import { loadHeader, updatePartida } from "redux/unit-control";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

const ControlUnitDetailedContent = ({
  rows,
  loading,
  unitControl,
  actions,
  project,
  tree,
  selectedPeriod,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState(
    []
  );

  const getData = (params) => `${params.value?.description || ""}`;
  const [columns] = React.useState([
    { field: "codi", headerName: "Código", minWidth: 150 },
    {
      field: "descripcioReduc",
      headerName: "Descripció",
      minWidth: 200,
      editable: true,
    },
    {
      field: "unitats",
      headerName: "Unidades Medición",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: getData,
      minWidth: 150,
    },
    {
      field: "unitatsPress",
      headerName: "Un. Pres",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "preu",
      headerName: "Pvp Bruto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preu ?? 0, intl),
      minWidth: 140,
      editable: true,
    },
    {
      field: "preuNet",
      headerName: "Pvp Neto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preuNet ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "importTotal",
      headerName: "Importe",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.importTotal ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "costUni",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costUni ?? 0, intl),
      minWidth: 150,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costTotal ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "unitatsAnterior",
      headerName: "Medición obra realizada anterior",
      type: "number",
      minWidth: 170,
    },
    {
      field: "unitatsActual",
      headerName: "Medición obra hecha a periodo",
      type: "number",
      minWidth: 170,
      editable: true,
    },
    {
      field: "medicioOrigen",
      headerName: "Medicio obra hecha a origen",
      type: "number",
      minWidth: 170,
      editable: true,
    },
    {
      field: "obraPendent",
      headerName: "Obra pendiente de hacer",
      type: "number",
      minWidth: 170,
    },
  ]);

  const loadHeader = () => actions.loadHeader({ id: props.id });

  React.useEffect(() => {
    loadHeader();
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
  }, [unitControl, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(tree.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(tree.costTotal ?? 0, intl),
      },
    ]);
  }, [tree, intl]);

  const handleCellChange = async (params, event, details) => {
    const { id, field, value } = params;
    const data = rows.find((row) => row.id === id);
    data[field] = value;
    try {
      await actions.updatePartida({ id, data });
      // update related data
      loadHeader();
      actions.loadTreeData({ periodId: selectedPeriod.id });
    } catch (e) {
      // handle errors
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <DetailedHeader header={headerProject} body={headerProjectFields} />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid
          columns={columns}
          getRowId={(row) => row.id}
          rows={rows}
          loading={loading}
          onCellEditCommit={handleCellChange}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    unitControl: getUnitControl(state),
    tree: getData(state),
    selectedPeriod: getSelectedPeriod(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
    updatePartida: bindActionCreators(updatePartida, dispatch),
    loadTreeData: bindActionCreators(loadTreeData, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);

export default component;
