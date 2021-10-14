import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";
import { Grid, Tab, Tabs } from "@mui/material";
import {
  Engineering,
  StackedLineChart,
  StackedBarChart,
  Euro,
  CallMissedOutgoing,
  Construction,
} from "@mui/icons-material";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { loadHeader, loadKpis, resetKpis, update } from "redux/partida";
import {
  getIsLoading,
  getKpis as getKpisPartida,
  getPartida,
  getRows,
} from "redux/partida/selectors";
import { getKpis as getKpisProjecte } from "redux/project/selectors";
import { loadHeader as loadUnitControlHeader } from "redux/unit-control";
import { getUnitControl, getKpis as getKpisUC  } from "redux/unit-control/selectors";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles } from "utils/helper";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";

import { getKpisColorValue, getResourceColumnsByPeriod, isPeriodOpen } from "./common";

const KPIS_TAB_INDEX = 0;
const RESOURCES_TAB_INDEX = 1;

const ProjectDetailedContent = ({
  rows,
  loading,
  unitControl,
  partida,
  tree,
  selectedPeriod,
  kpisProjecte,
  kpisPartida,
  kpisUnitatControl,
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
  const [tabIndex, setTabIndex] = React.useState(KPIS_TAB_INDEX);
  const [indicadores, setIndicadores] = React.useState();
  const [columns] = React.useState(
    getResourceColumnsByPeriod({ period: selectedPeriod, intl })
  );

  const onChangeIndexExecutor = {
    [RESOURCES_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      partida.id && actions.loadKpis({ id: partida.id });
    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, partida]);

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
              value: kpisPartida.produccioAnterior,
              breakpoints: 3,
            },
            {
              field: "Producción Periodo",
              value: kpisPartida.produccioPeriode,
              breakpoints: 2,
            },
            {
              field: "Producción Año Natural",
              value: kpisPartida.produccioAny,
              breakpoints: 3,
            },
            {
              field: "Producción a Origen",
              value: kpisPartida.produccioOrigen,
              breakpoints: 2,
            },
            {
              field: "Producción Pendiente",
              value: kpisPartida.produccioPendent,
              breakpoints: 2,
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
              value: kpisPartida.costTeoricAnterior,
              breakpoints: 3,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisPartida.costTeoricPeriode,
              breakpoints: 2,
            },
            {
              field: "Coste Teórico Año Natural",
              value: kpisPartida.costTeoricAny,
              breakpoints: 3,
            },
            {
              field: "Coste Teórico a Origen",
              value: kpisPartida.costTeoricOrigen,
              breakpoints: 2,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisPartida.costTeoricPendent,
              breakpoints: 2,
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
              value: kpisPartida.costRealAnterior,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Pendiente",
              value: kpisPartida.costRealPeriode,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real año Natural",
              value: kpisPartida.costRealAny,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Origen",
              value: kpisPartida.costRealOrigen,
              icon: <StackedBarChart />,
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
              value: kpisPartida.beneficiAnterior,
            },
            {
              field: "Beneficio Período",
              value: kpisPartida.beneficiPeriode,
            },
            {
              field: "Beneficio año Natural",
              value: kpisPartida.beneficiAny,
            },
            {
              field: "Beneficio Origen",
              value: kpisPartida.beneficiOrigen,
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
              value: kpisPartida.desviacioCostAnterior,
            },
            {
              field: "Desviación Período",
              value: kpisPartida.desviacioPeriode,
            },
            {
              field: "Desviación año Natural",
              value: kpisPartida.desviacioAny,
            },

            {
              field: "Desviación Origen",
              value: kpisPartida.desviacioOrigen,
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
              value: kpisPartida.obraPendentFacturar,
            },
            {
              field: "Obra Pendiente Período",
              value: kpisPartida.obraPendent,
            },
            {
              field: "Obra Pendiente año Natural",
              value: kpisPartida.obraPendentAny,
            },
            {
              field: "Obra Pendiente Origen",
              value: kpisPartida.obraPendentOrigen,
            },
          ],
        },
      ]
    );
  }, [kpisPartida]);

  const loadHeader = () => actions.loadHeader({ id: props.id });
  React.useEffect(() => {
    loadHeader();
  }, [props.id]);

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields([
      {
        field: "Benef. Origen",
        value: kpisUnitatControl.beneficiOrigen,
      },
      {
        field: "Benef. Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.beneficiAny >= 0 }),
      },
      {
        field: "Desv. Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },
      {
        field: "Desv. Año",
        value: kpisUnitatControl.desviacioAny,
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.desviacioAny >= 0 }),
      },
      {
        field: "Pen. Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },

      {
        field: "Pen. Año",
        value: kpisUnitatControl.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.obraPendentAny >= 0 }),
      },
    ]);
  }, [kpisUnitatControl, unitControl, intl]);

  React.useEffect(() => {
    setHeaderPartida({ title: partida.descripcioReduc });
    setHeaderPartidaFields([
      {
        field: "Benef. Origen",
        value: kpisPartida.beneficiOrigen,
      },
      {
        field: "Benef. Año",
        value: kpisPartida.beneficiAny,
        colorValue: getKpisColorValue({ value: kpisPartida?.beneficiAny >= 0 }),
      },
      {
        field: "Desv. Origen",
        value: kpisPartida.desviacioOrigen,
      },
      {
        field: "Desv. Año",
        value: kpisPartida.desviacioAny,
        colorValue: getKpisColorValue({ value: kpisPartida?.desviacioAny >= 0 }),
      },
      {
        field: "Pen. Origen",
        value: kpisPartida.obraPendentOrigen,
      },

      {
        field: "Pen. Año",
        value: kpisPartida.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpisPartida?.obraPendentAny >= 0 }),
      },
    ]);
  }, [kpisPartida, partida, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields([
      {
        field: "Benef. Origen",
        value: kpisProjecte.beneficiOrigen,
      },
      {
        field: "Benef. Año",
        value: kpisProjecte.beneficiAny,
        colorValue: getKpisColorValue({ value: kpisProjecte?.beneficiAny >= 0 }),
      },
      {
        field: "Desv. Origen",
        value: kpisProjecte.desviacioOrigen,
      },
      {
        field: "Desv. Año",
        value: kpisProjecte.desviacioAny,
        colorValue: getKpisColorValue({ value: kpisProjecte?.desviacioAny >= 0 }),
      },
      {
        field: "Pen. Origen",
        value: kpisProjecte.obraPendentOrigen,
        colorValue: getKpisColorValue({ value: kpisProjecte?.obraPendentOrigen >= 0 }),
      },
      {
        field: "Pen. Año",
        value: kpisProjecte.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpisProjecte?.obraPendentAny >= 0 }),
      },
    ]);
  }, [kpisProjecte,tree, intl]);

  const handleCellChange = async (params, event, details) => {
    const { id, field, value } = params;
    const data = rows.find((row) => row.id === id);
    data[field] = value;
    try {
      await actions.updateResource({ id, data });
      // update related data
      loadHeader();
      actions.loadUnitControlHeader({ id: unitControl.id });
      actions.loadTreeData({ periodId: selectedPeriod.id });
    } catch (e) {
      // handle errors
    }
  };

  const detailedHeaderBreakpoints = { xs: 4 };
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <DetailedHeader
          header={headerProject}
          body={headerProjectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
        />
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[CONTROL_UNIT_TYPE]}
        />
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader
          header={headerPartida}
          body={headerPartidaFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PARTIDA_TYPE]}
        />
      </Grid>
      <Grid item xs={12}>
        <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
          <Tab label={"Indicadores"} className="tabsIndicators tabsIndicators1" />
          <Tab label={"Recursos"} className="tabsIndicators tabsIndicators2" />
        </Tabs>
      </Grid>

      <Grid item xs={12}>
        {tabIndex === RESOURCES_TAB_INDEX && (
          <MaterialDataGrid
            columns={columns}
            getRowId={(row) => row.id}
            rows={rows}
            loading={loading}
            onCellEditCommit={handleCellChange}
            disableInlineEdition={!isPeriodOpen({ period: selectedPeriod })}
          />
        )}
        {tabIndex === KPIS_TAB_INDEX && (
          <Grid container spacing={2}>
            <MaterialCardIndicator
              loading={isEmpty(indicadores)}
              content={indicadores}
              onUnmount={() => actions.resetKpis()}
            />
          </Grid>
        )}
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
    tree: getData(state),
    selectedPeriod: getSelectedPeriod(state),
    kpisPartida: getKpisPartida(state),
    kpisUnitatControl:  getKpisUC(state),
    kpisProjecte: getKpisProjecte(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
    updateResource: bindActionCreators(update, dispatch),
    loadUnitControlHeader: bindActionCreators(loadUnitControlHeader, dispatch),
    loadTreeData: bindActionCreators(loadTreeData, dispatch),
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
