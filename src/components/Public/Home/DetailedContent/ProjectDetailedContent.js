import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";

import { Grid } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import CardTotal from "components/shared/CardTotal";

import { loadKpis, resetKpis } from "redux/project";
import { getIsLoading, getKpis, getRows } from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { primaryColor } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";

import { getKpisColorValue, isPeriodOpen } from "./common";

const ProjectDetailedContent = ({
  rows,
  project,
  tree,
  period,
  kpis,
  actions,
}) => {
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
  const [indicadores] = React.useState([]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });

    setProjectFields([
      {
        field: "Beneficio Origen",
        value: kpis.beneficiOrigen,
      },
      {
        field: "Beneficio Año",
        value: kpis.beneficiAny,
        colorValue: getKpisColorValue({ value: kpis?.beneficiAny >= 0 }),
      },
      {
        field: "Desviación Origen",
        value: getKpisColorValue({ value: kpis.desviacioOrigen }),
      },
      {
        field: "Desviación Año",
        value: kpis.desviacioAny,
        colorValue: getKpisColorValue({ value: kpis?.desviacioAny >= 0 }),
      },
      {
        field: "Obra Pendiente Origen",
        value: kpis.obraPendentOrigen,
  
      },

      {
        field: "Obra Pendiente Año",
        value: kpis.obraPendentAny,
        colorValue: kpis?.obraPendentAny >= 0 ? "green" : "red",
      },
    ]);
  }, [kpis, project, intl]);

  React.useEffect(() => {
    period.id && actions.loadKpis({ id: period.id });
  }, [period]);



  const content = [
    { field: "Importe Total", value: tree.importTotal },
    {
      field: "Coste Total",
      value: tree.costTotal,
    },
  ];

  const detailedHeaderBreakpoints = { xs: 2 };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader
          header={headerProject}
          body={projectFields}
          colorBackground={"rgba(58, 145, 152, 0.30)"}
          icon={<BusinessIcon />}
          iconColor={primaryColor}
          breakpoints={detailedHeaderBreakpoints}
        />
      </Grid>
      <Grid item xs={4}>
        <CardTotal body={content} />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid
          columns={columns}
          rows={rows}
          disableInlineEdition={!isPeriodOpen({ period })}
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialCardPartidaIndicator
          title={"Indicadores"}
          loading={isEmpty(indicadores)}
          content={indicadores}
         
        />
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
    kpis: getKpis(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadKpis: bindActionCreators(loadKpis, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
