import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { Grid } from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { isEmpty } from "lodash";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import { formatCurrencyWithIntl } from "utils/formats";

import { loadKpis, resetKpis } from "redux/project";
import { getIsLoading, getKpis, getRows } from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { getData } from "redux/project-tree/selectors";
import {getSelectedPeriod} from "redux/period/selectors";

const ProjectDetailedContent = ({ rows, project, tree, period, kpis, actions }) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [projectFields, setProjectFields] = React.useState([]);

  const [columns] = React.useState([
    { field: "codi", headerName: "Código", editable: false },
    {
      field: "descripcio",
      headerName: "Descripción",

      editable: true,
    },
    {
      field: "importTotal",
      headerName: "Importe Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.importTotal ?? 0, intl);
      },
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Costel Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
      editable: false,
    },
  ]);

  const [indicadores, setIndicadores] = React.useState();

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setProjectFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(tree.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(tree.costTotal ?? 0, intl),
      },
    ]);
  }, [project, intl]);

  React.useEffect(() => {
    period.id && actions.loadKpis({ id: period.id });
  },[period]);

  React.useEffect(() => {
    setIndicadores(
      kpis.map(kpi => ({
        ...kpi,
        icon: <Assignment />,
      }))
    )
  },[kpis]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader header={headerProject} body={projectFields} />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid columns={columns} rows={rows} />
      </Grid>
      <Grid item xs={12}>
        <MaterialCardPartidaIndicator
          title={"Indicadores"}
          loading={isEmpty(indicadores)}
          content={indicadores}
          onUnmount={() => actions.resetKpis()} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state),
    period: getSelectedPeriod(state),
    tree: getData(state),
    kpis: getKpis(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadKpis: bindActionCreators(loadKpis, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
  };
  return { actions };
}

const component = connect(mapStateToProps, mapDispatchToProps)(ProjectDetailedContent);
export default component;
