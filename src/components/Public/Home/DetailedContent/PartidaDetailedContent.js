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

import { formatCurrencyWithIntl } from "utils/formats";
import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { loadHeader, loadKpis, resetKpis, update } from "redux/partida";
import {
  getIsLoading,
  getKpis,
  getPartida,
  getRows,
} from "redux/partida/selectors";
import { loadHeader as loadUnitControlHeader } from "redux/unit-control";
import { getUnitControl } from "redux/unit-control/selectors";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { getResourceColumnsByPeriod, isPeriodOpen } from "./common";

const KPIS_TAB_INDEX = 0;
const RESOURCES_TAB_INDEX = 1;


const ProjectDetailedContent = ({
  rows,
  loading,
  unitControl,
  partida,
  tree,
  selectedPeriod,
  kpis,
  actions,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState(
    []
  );
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
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Pendiente",
              value: kpis.costRealPeriode,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real año Natural",
              value: kpis.costRealAny,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Origen",
              value: kpis.costRealOrigen,
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
              value: kpis.beneficiOrigen,
            },
            {
              field: "Obra Pendiente Origen",
              value: kpis.beneficiOrigen,
            },
          ],
        },
      ]

      // kpis.map(kpi => ({

      //   ...kpi,
      //   icon: <Engineering />,
      // }))
    );
  }, [kpis]);

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
    setHeaderPartida({ title: partida.descripcioReduc });
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
      await actions.updateResource({ id, data });
      // update related data
      loadHeader();
      actions.loadUnitControlHeader({ id: unitControl.id });
      actions.loadTreeData({ periodId: selectedPeriod.id });
    } catch (e) {
      // handle errors
    }
  };

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
        <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
        <Tab
            label={"Indicadores"}
            className="tabsIndicators tabsIndicators1"
          />
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
          // <MaterialCardPartidaIndicator
          //   loading={isEmpty(indicadores)}
          //   content={indicadores}
          //   onUnmount={() => actions.resetKpis()}/>
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
    kpis: getKpis(state),
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
