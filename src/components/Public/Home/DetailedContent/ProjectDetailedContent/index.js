import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";

import { Grid, Tab, Tabs } from "@mui/material";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialTable from "components/shared/MaterialTable";
import CardTotal from "components/shared/CardTotal";
import {
  getKpisColorValue,
  isPeriodOpen
} from "components/Public/Home/DetailedContent/common";

import { loadKpis, resetKpis, loadDetails } from "redux/project";
import {
  getIsLoading,
  getKpis,
  getRows,
  getDetails,
  getTotals,
} from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { selectNode } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import { PROJECT_TYPE } from "constants/business-types";


import {getIndicators, columnsIndicatorsPartida , columnsSubTotal, groups} from "./configuration";

const KPIS_TAB_INDEX = 0;
const DETAIL_TAB_INDEX = 1;
const PROJECTS_TAB_INDEX = 2;

const ProjectDetailedContent = ({
  rows,
  project,
  tree,
  period,
  kpis,
  details,
  totals,
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

  const [indicadores, setIndicadores] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(KPIS_TAB_INDEX);

  const onChangeIndexExecutor = {
    [PROJECTS_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      period.id && actions.loadKpis({ id: period.id });
    },
    [DETAIL_TAB_INDEX]: () => {
      period.id && actions.loadDetails({ id: period.id });
    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, project]);

  React.useEffect(() => {

    setIndicadores(getIndicators(kpis));

  }, [kpis]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setProjectFields([
      {
        field: "Benef. Origen",
        value: kpis.beneficiOrigen,
      },
      {
        field: "Benef. Año",
        value: kpis.beneficiAny,
        colorValue: getKpisColorValue({ value: kpis?.beneficiAny >= 0 }),
      },
      {
        field: "Desv. Origen",
        value: kpis.desviacioOrigen,
      },
      {
        field: "Desv. Año",
        value: kpis.desviacioAny,
        colorValue: getKpisColorValue({ value: kpis?.desviacioAny >= 0 }),
      },
      {
        field: "Pen. Origen",
        value: kpis.obraPendentOrigen,
      },

      {
        field: "Pen. Año",
        value: kpis.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpis?.obraPendentAny >= 0 }),
      },
    ]);
  }, [kpis, project, intl]);

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
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
              <Tab
                label={"Indicadores"}
                className="tabsIndicators tabsIndicators1"
              />
              <Tab
                label={"Indicadores Unidad Control"}
                className="tabsIndicators "
              />
              <Tab
                label={"Unidades Control"}
                className="tabsIndicators tabsIndicators2"
              />
            </Tabs>
          </Grid>
          <Grid item xs={3}>
            <CardTotal body={content} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {tabIndex === PROJECTS_TAB_INDEX && (
          <MaterialDataGrid
            columns={columns}
            rows={rows}
            disableInlineEdition={!isPeriodOpen({ period })}
            onRowDoubleClick={(row) => actions.selectNode({ ids: row.id })}
            flexGrid={1}
          />
        )}
        {tabIndex === KPIS_TAB_INDEX && (
          <Grid container spacing={2}>
            <MaterialCardIndicator
              loading={isEmpty(indicadores)}
              content={indicadores}
              // onUnmount={() => actions.resetKpis()}
            />
          </Grid>
        )}
        {tabIndex === DETAIL_TAB_INDEX && (
          <MaterialTable content={details} contentTotal={totals} columns={columnsIndicatorsPartida(intl)} columnsSubTotal={columnsSubTotal(intl)} groups={groups} onDoubleClick={(row) => actions.selectNode({ ids: row.unitatControlId })}/>
        )}
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
    details: getDetails(state),
    totals: getTotals(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadKpis: bindActionCreators(loadKpis, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch),
    loadDetails: bindActionCreators(loadDetails, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;