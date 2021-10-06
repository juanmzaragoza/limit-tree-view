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
import { formatCurrencyWithIntl } from "../../../../utils/formats";

const ControlUnitDetailedContent = ({ rows, loading, unitControl, actions }) => {
  const intl = useIntl();
  const [headerProject,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState([]);
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

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields( [
      { field: 'Importe Total', value: formatCurrencyWithIntl(unitControl.importTotal?? 0, intl)},
      { field: 'Coste Total', value: formatCurrencyWithIntl(unitControl.costTotal?? 0, intl)},
    ])
  },[unitControl, intl]);

  return <Grid container spacing={1}>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerProject}
        body={headerControlUnitFields} />
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
    unitControl: getUnitControl(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch)
  };
  return { actions };
};

const component = connect(mapStateToProps,mapDispatchToProps)(ControlUnitDetailedContent);
export default component;