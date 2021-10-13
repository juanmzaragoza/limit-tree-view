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
  CatchingPokemon,
  EmojiEvents
} from "@mui/icons-material";

import { formatCurrencyWithIntl } from "utils/formats";
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
import {

  getKpis as getKpisProjecte,

} from "redux/project/selectors";
import { loadHeader as loadUnitControlHeader } from "redux/unit-control";
import { getUnitControl } from "redux/unit-control/selectors";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { getResourceColumnsByPeriod, isPeriodOpen } from "./common";
import BusinessIcon from '@mui/icons-material/Business';
import { primaryColor } from "utils/helper";
import {
  getKpis as
  getKpisUC 
} from "redux/unit-control/selectors";
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
              value: kpisPartida.produccioAnterior,
            },
            {
              field: "Producción Periodo",
              value: kpisPartida.produccioPeriode,
            },
            {
              field: "Producción Año Natural",
              value: kpisPartida.produccioAny,
            },
            {
              field: "Producción a Origen",
              value: kpisPartida.produccioOrigen,
            },
            {
              field: "Producción Pendiente",
              value: kpisPartida.produccioPendent,
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
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisPartida.costTeoricPeriode,
            },
            {
              field: "Coste Teórico Año Natural",
              value: kpisPartida.costTeoricAny,
            },
            {
              field: "Coste Teórico a Origen",
              value: kpisPartida.costTeoricOrigen,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisPartida.costTeoricPendent,
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

      // kpis.map(kpi => ({

      //   ...kpi,
      //   icon: <Engineering />,
      // }))
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
        field: "Beneficio Origen",
        value: kpisUnitatControl.beneficiOrigen,
      },
      {
        field: "Beneficio Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: kpisUnitatControl?.beneficiAny >= 0 ? "green" : "red",
      },
      {
        field: "Desviación Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },
      {
        field: "Desviación Año",
        value: kpisUnitatControl.desviacioAny,
        colorValue: kpisUnitatControl?.desviacioAny >= 0 ? "green" : "red",
      },
      {
        field: "Pendiente Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },

      {
        field: "Pendiente Año",
        value: kpisUnitatControl.obraPendentAny,
        colorValue: kpisUnitatControl?.obraPendentAny >= 0 ? "green" : "red",
      },
    ]);
  }, [kpisUnitatControl,unitControl, intl]);

  React.useEffect(() => {
    setHeaderPartida({ title: partida.descripcioReduc });
    setHeaderPartidaFields([
      {
        field: "Beneficio Origen",
        value: kpisPartida.beneficiOrigen,
      },
      {
        field: "Beneficio Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: kpisPartida?.beneficiAny >= 0 ? "green" : "red",
      },
      {
        field: "Desviación Origen",
        value: kpisPartida.desviacioOrigen,
      },
      {
        field: "Desviación Año",
        value: kpisPartida.desviacioAny,
        colorValue: kpisPartida?.desviacioAny >= 0 ? "green" : "red",
      },
      {
        field: " Pendiente Origen",
        value: kpisPartida.obraPendentOrigen,
      },

      {
        field: " Pendiente Año",
        value: kpisPartida.obraPendentAny,
        colorValue: kpisPartida?.obraPendentAny >= 0 ? "green" : "red",
      },
    ]);
  }, [kpisPartida, partida, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });

    setHeaderProjectFields([
      {
        field: "Beneficio Origen",
        value: kpisProjecte.beneficiOrigen,
      },
      {
        field: "Beneficio Año",
        value: kpisProjecte.beneficiAny,
        colorValue: kpisProjecte?.beneficiAny >= 0 ? "green" : "red",
      },
      {
        field: "Desviación Origen",
        value: kpisProjecte.desviacioOrigen,
      },
      {
        field: "Desviación Año",
        value: kpisProjecte.desviacioAny,
        colorValue: kpisProjecte?.desviacioAny >= 0 ? "green" : "red",
      },
      {
        field: " Pendiente Origen",
        value: kpisProjecte.obraPendentOrigen,
        colorValue: kpisProjecte?.obraPendentOrigen >= 0 ? "green" : "red",
      },

      {
        field: " Pendiente Año",
        value: kpisProjecte.obraPendentAny,
        colorValue: kpisProjecte?.obraPendentAny >= 0 ? "green" : "red",
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <DetailedHeader header={headerProject} body={headerProjectFields}   colorBack={"rgba(58, 145, 152, 0.30)"}
          icon={<BusinessIcon />}
          iconColor={primaryColor}
          breakPoint={4} />
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
          colorBack={"rgba(255, 177, 27, 0.30)"}
          icon={<EmojiEvents />}
          iconColor={"#ffb11b"}
          breakPoint={4}/>
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader header={headerPartida} body={headerPartidaFields}
        colorBack={"rgba(162, 80, 245, 0.30)"}
        icon={<CatchingPokemon />}
        iconColor={"#a250f5"}
        breakPoint={4} />
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
