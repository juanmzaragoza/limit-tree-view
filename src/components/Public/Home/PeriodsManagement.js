import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Grid} from "@mui/material";

import MaterialSelector from "components/shared/MaterialSelector";
import MaterialCheckbox from "components/shared/MaterialCheckbox";
import { getIsLoading, getRows } from "redux/period/selectors";
import {loadData, setPeriod} from "redux/period";
import { getSelectedProject } from "redux/project-selector/selectors";

const PeriodsManagement = ({ rows, loading, project, actions }) => {
  const [periods, setPeriods] = React.useState([]);
  const [statuses,] = React.useState([
    { label: 'Estado' },
    { label: 'Revisado Jefe de Obra' },
    { label: 'Revisado Jefe de Grupo' },
  ]);
  const isProjectSelected = () => !!(project && project.codi);
  const [disabled, setDisabled] = React.useState(!isProjectSelected());

  React.useEffect(() => {
    if(isProjectSelected()) {
      actions.loadData({ projectCodi: project.codi });
      setDisabled(false);
    }
  },[project]);

  const getDate = (value) => value.split('T')[0].replace(/-/g,'/');
  React.useEffect(() => {
    setPeriods(
      rows.map(row => ({
        label: `${row.numero} - ${getDate(row.diaInici)} ${row.diaFi? `- ${getDate(row.diaFi)}`:""}`,
        value: row
      }))
    );
  },[rows]);

  return (
    <Grid container spacing={1} direction="row" alignItems="center" >
      <Grid item xs={12} md={12} lg={8}>
        <MaterialSelector
          id={"period"}
          items={periods}
          onChange={(e) => actions.setPeriod({ period: e })}
          disabled={disabled}
          label={"Períodos"}
          loading={loading}
          selectFirstDefault
        />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Button variant={"outlined"} >Cerrar Período</Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <MaterialCheckbox items={statuses} />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch),
    setPeriod: bindActionCreators(setPeriod, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps,mapDispatchToProps)(PeriodsManagement);
export default component;