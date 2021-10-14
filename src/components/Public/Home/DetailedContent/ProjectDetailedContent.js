import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";

import { Grid, Tab, Tabs } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import CardTotal from "components/shared/CardTotal";

import { loadKpis, resetKpis } from "redux/project";
import { getIsLoading, getKpis, getRows } from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import { PROJECT_TYPE } from "constants/business-types";

import { getKpisColorValue, isPeriodOpen } from "./common";
import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import {
  Engineering,
  StackedLineChart,
  StackedBarChart,
  Euro,
  CallMissedOutgoing,
  Construction,
} from "@mui/icons-material";

const KPIS_TAB_INDEX = 0;
const PROJECTS_TAB_INDEX = 1;

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

  const [indicadores, setIndicadores] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(KPIS_TAB_INDEX);

  const onChangeIndexExecutor = {
    [PROJECTS_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      period.id && actions.loadKpis({ id: period.id });
    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, project]);

  React.useEffect(() => {
    setIndicadores(
      [
        {
          title: "Produccion",
          icon: <Engineering />,
          lg: 2,
          indicators: [
            {
              field: "Producción Anterior",
              value: kpis.produccioAnterior,
            },
            {
              field: "Producción Periodo",
              value: kpis.produccioPeriode,
            },
            {
              field: "Producción Año Natural",
              value: kpis.produccioAny,
            },
            {
              field: "Producción a Origen",
              value: kpis.produccioOrigen,
            },
            {
              field: "Producción Pendiente",
              value: kpis.produccioPendent,
            },
          ],
        },
        {
          title: "Coste Teórico",
          icon: <StackedLineChart />,
          lg: 2,
          indicators: [
            {
              field: "Coste Teórico Anterior",
              value: kpis.costTeoricAnterior,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpis.costTeoricPeriode,
            },
            {
              field: "Coste Teórico Año Natural",
              value: kpis.costTeoricAny,
            },
            {
              field: "Coste Teórico a Origen",
              value: kpis.costTeoricOrigen,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpis.costTeoricPendent,
            },
          ],
        },
        {
          title: "Coste Real",
          icon: <StackedBarChart />,
          lg: 3,
          indicators: [
            {
              field: "Coste Real Anterior",
              value: kpis.costRealAnterior,
            },
            {
              field: "Coste Real Pendiente",
              value: kpis.costRealPeriode,
            },
            {
              field: "Coste Real año Natural",
              value: kpis.costRealAny,
            },
            {
              field: "Coste Real Origen",
              value: kpis.costRealOrigen,
            },
          ],
        },
        {
          title: "Beneficios",
          icon: <Euro />,
          lg: 3,
          indicators: [
            {
              field: "Beneficio Anterior",
              value: kpis.beneficiAnterior,
            },
            {
              field: "Beneficio Período",
              value: kpis.beneficiPeriode,
            },
            {
              field: "Beneficio año Natural",
              value: kpis.beneficiAny,
            },
            {
              field: "Beneficio Origen",
              value: kpis.beneficiOrigen,
            },
          ],
        },
        {
          title: "Desviación",
          icon: <CallMissedOutgoing />,
          lg: 3,
          indicators: [
            {
              field: "Desviación Anterior",
              value: kpis.desviacioCostAnterior,
            },
            {
              field: "Desviación Período",
              value: kpis.desviacioPeriode,
            },
            {
              field: "Desviación año Natural",
              value: kpis.desviacioAny,
            },

            {
              field: "Desviación Origen",
              value: kpis.desviacioOrigen,
            },
          ],
        },
        {
          title: "Obra Pendiente Periodo",
          icon: <Construction />,
          lg: 3,
          indicators: [
            {
              field: "Obra Pendiente Anterior",
              value: kpis.obraPendentFacturar,
            },
            {
              field: "Obra Pendiente Período",
              value: kpis.obraPendent,
            },
            {
              field: "Obra Pendiente año Natural",
              value: kpis.obraPendentAny,
            },
            {
              field: "Obra Pendiente Origen",
              value: kpis.obraPendentOrigen,
            },
          ],
        },
      ]
    );
  }, [kpis]);


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
        value: kpis.desviacioOrigen,
 
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
        colorValue:getKpisColorValue({ value: kpis?.obraPendentAny >= 0 }), 
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
          <Tab label={"Indicadores"} className="tabsIndicators tabsIndicators1" />
          <Tab label={"Unidades Control"} className="tabsIndicators tabsIndicators2" />
        </Tabs>
        </Grid>
        <Grid item xs={3} >
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
      </Grid>
      <Grid item xs={12}>
       
      </Grid>
      {/* <Grid item xs={12}>
        <MaterialCardPartidaIndicator
          title={"Indicadores"}
          loading={isEmpty(indicadores)}
          content={indicadores}
         
        />
      </Grid> */}
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
