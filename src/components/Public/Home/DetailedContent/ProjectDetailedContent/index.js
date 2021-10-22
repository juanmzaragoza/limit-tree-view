import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";

import { Grid, IconButton, Tab, Tabs, Avatar } from "@mui/material";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialTable from "components/shared/MaterialTable/index";
import CardTotal from "components/shared/CardTotal";
import {
  getKpisColorValue,
  isPeriodOpen,
} from "components/Public/Home/DetailedContent/common";

import { loadKpis, resetKpis, loadDetails, selectTab } from "redux/project";
import {
  getIsLoading,
  getKpis,
  getRows,
  getDetails,
  getTotals,
  getTabIndex,
  getIsLoadingDetails,
  getKpisFact,
  getIsLoadingKpis
} from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { selectAndExpandNode } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles, getTreeId } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import {
  PROJECT_TYPE,
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
} from "constants/business-types";

import {
  getIndicators,
  columnsIndicatorsPartida,
  columnsSubTotal,
  groups,
} from "./configuration";

const KPIS_TAB_INDEX = 0;
const DETAIL_TAB_INDEX = 1;
const PROJECTS_TAB_INDEX = 2;

const ProjectDetailedContent = ({
  rows,
  project,
  tree,
  period,
  kpis,
  kpisFact,
  details,
  totals,
  actions,
  tab,
  loadingDetails,
  loadingKpis
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [projectFields, setProjectFields] = React.useState([]);
  const [indicadores, setIndicadores] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(tab);
  const colorUnit = entitiesStyles[PARTIDA_TYPE].iconColor;
  const [columns] = React.useState([
    {
      field: "id",
      headerName: (
        <Avatar
          aria-label="recipe"
          sx={{
            bgcolor: entitiesStyles[CONTROL_UNIT_TYPE].iconColor,
            color: "white",
          }}
        >
          {entitiesStyles[CONTROL_UNIT_TYPE].icon}
        </Avatar>
      ),
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="outlined"
            onClick={() => {
              actions.selectTab({ value: PROJECTS_TAB_INDEX });
              actions.selectNode({ ids: getTreeId(cellValues.row) });
            }}
            style={{ color: colorUnit }}
          >
            {entitiesStyles[PARTIDA_TYPE].icon}
          </IconButton>
        );
      },
      minWidth: 30,
      editable: false,
    },
    { field: "codi", headerName: "Código", editable: false, minWidth: 119 },
    {
      field: "descripcio",
      headerName: "Descripción",
      editable: true,
      minWidth: 500,
    },
    {
      field: "importTotal",
      headerName: "Importe Final Planif.",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.importTotal ?? 0, intl);
      },
      editable: false,
      minWidth: 220,
    },
    {
      field: "costTotal",
      headerName: "Coste Final Planif.",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
      editable: false,
      minWidth: 220,
    },
  ]);

  const onChangeIndexExecutor = {
    [PROJECTS_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      actions.loadKpis({ id: period.id });
    },
    [DETAIL_TAB_INDEX]: () => {
      actions.loadDetails({id: period.id});
    },
  };




  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, project]);

  React.useEffect(() => {
    setIndicadores(getIndicators(kpis, kpisFact));
  }, [kpis]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setProjectFields([
      {
        field: "Resul. Bruto Origen",
        value: kpis.beneficiOrigen,
      },
      {
        field: "Resul. Bruto Año",
        value: kpis.beneficiAny,
        colorValue: getKpisColorValue({ value: kpis.beneficiAny }),
      },
      {
        field: "Prod. Origen",
        value: kpis.produccioOrigen,
      },
      {
        field: "Prod. Año",
        value: kpis.produccioAny,
        colorValue: getKpisColorValue({ value: kpis.produccioAny }),
      },
      {
        field: "Pen. Fact. Origen",
        value: kpis.obraPendentOrigen,
      },

      {
        field: "Pen. Fact. Año",
        value: kpis.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpis.obraPendentAny }),
      },
    ]);
  }, [kpis, project, intl]);

  const content = [

    { field: "Imp. Final Planif.", value: tree.importTotal },
    {
      field: "Coste Final Planif.",
      value: tree.costTotal,
    },
  ];
  const detailedHeaderBreakpoints = { xs: 2 };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader
          id={getTreeId(tree)}
          header={headerProject}
          body={projectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
          onClick={(id) => actions.selectNode({ ids: id })}
         loadingData={loadingKpis}
         heightLoadingCard={"50px"}
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
          <MaterialTable
            loadingTable={loadingDetails}
            content={details}
            contentTotal={totals}
            columns={columnsIndicatorsPartida(intl)}
            columnsSubTotal={columnsSubTotal(intl)}
            groups={groups}
            onDoubleClick={(row) => {
              actions.selectTab({ value: DETAIL_TAB_INDEX });
              actions.selectNode({ ids: getTreeId(row) });
            }}
          />
        )}
        {tabIndex === PROJECTS_TAB_INDEX && (
          <MaterialDataGrid
            columns={columns}
            rows={rows}
            disableInlineEdition={!isPeriodOpen({ period })}
          />
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
    tab: getTabIndex(state),
    loadingDetails: getIsLoadingDetails(state),
    kpisFact: getKpisFact(state),
    loadingKpis: getIsLoadingKpis(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadKpis: bindActionCreators(loadKpis, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
    selectNode: bindActionCreators(selectAndExpandNode, dispatch),
    loadDetails: bindActionCreators(loadDetails, dispatch),
    selectTab: bindActionCreators(selectTab, dispatch),
    
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
