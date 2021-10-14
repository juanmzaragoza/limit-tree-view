import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid, Tab, Tabs } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import {
  getIsLoading,
  getRows,
  getUnitControl,
  getKpis as getKpisUC
} from "redux/unit-control/selectors";
import { loadHeader, updatePartida, loadKpis, resetKpis } from "redux/unit-control";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";
import { getKpis } from "redux/project/selectors";

import { entitiesStyles } from "utils/helper";
import {
  CONTROL_UNIT_TYPE,
  PROJECT_TYPE
} from "constants/business-types";

import {
  getKpisColorValue,
  getPartidaColumnsByPeriod,
  isPeriodOpen,
} from "./common";
import MaterialCardIndicator from "components/shared/MaterialCardIndicator";

import {
  Engineering,
  StackedLineChart,
  StackedBarChart,
  Euro,
  CallMissedOutgoing,
  Construction,
} from "@mui/icons-material";
import { isEmpty } from "lodash";
const KPIS_TAB_INDEX = 0;
const PARTIDAS_TAB_INDEX = 1;

const ControlUnitDetailedContent = ({
  rows,
  loading,
  unitControl,
  actions,
  project,
  tree,
  kpis,
  kpisUnitatControl,
  selectedPeriod,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState([]);
  const [columns] = React.useState(getPartidaColumnsByPeriod({ period: selectedPeriod, intl }));
  const [tabIndex, setTabIndex] = React.useState(KPIS_TAB_INDEX);
  const loadHeader = () => actions.loadHeader({ id: props.id });
  const [indicadores, setIndicadores] = React.useState();
  const onChangeIndexExecutor = {
    [PARTIDAS_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      unitControl.id && actions.loadKpis({ id: unitControl.id });
    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, unitControl]);

  React.useEffect(() => {
    loadHeader();
  }, [props.id]);

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
              value: kpisUnitatControl.produccioAnterior,
            },
            {
              field: "Producción Periodo",
              value: kpisUnitatControl.produccioPeriode,
            },
            {
              field: "Producción Año Natural",
              value: kpisUnitatControl.produccioAny,
            },
            {
              field: "Producción a Origen",
              value: kpisUnitatControl.produccioOrigen,
            },
            {
              field: "Producción Pendiente",
              value: kpisUnitatControl.produccioPendent,
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
              value: kpisUnitatControl.costTeoricAnterior,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisUnitatControl.costTeoricPeriode,
            },
            {
              field: "Coste Teórico Año Natural",
              value: kpisUnitatControl.costTeoricAny,
            },
            {
              field: "Coste Teórico a Origen",
              value: kpisUnitatControl.costTeoricOrigen,
            },
            {
              field: "Coste Teórico Pendiente",
              value: kpisUnitatControl.costTeoricPendent,
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
              value: kpisUnitatControl.costRealAnterior,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Pendiente",
              value: kpisUnitatControl.costRealPeriode,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real año Natural",
              value: kpisUnitatControl.costRealAny,
              icon: <StackedBarChart />,
            },
            {
              field: "Coste Real Origen",
              value: kpisUnitatControl.costRealOrigen,
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
              value: kpisUnitatControl.beneficiAnterior,
            },
            {
              field: "Beneficio Período",
              value: kpisUnitatControl.beneficiPeriode,
            },
            {
              field: "Beneficio año Natural",
              value: kpisUnitatControl.beneficiAny,
            },
            {
              field: "Beneficio Origen",
              value: kpisUnitatControl.beneficiOrigen,
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
              value: kpisUnitatControl.desviacioCostAnterior,
            },
            {
              field: "Desviación Período",
              value: kpisUnitatControl.desviacioPeriode,
            },
            {
              field: "Desviación año Natural",
              value: kpisUnitatControl.desviacioAny,
            },

            {
              field: "Desviación Origen",
              value: kpisUnitatControl.desviacioOrigen,
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
              value: kpisUnitatControl.obraPendentFacturar,
            },
            {
              field: "Obra Pendiente Período",
              value: kpisUnitatControl.obraPendent,
            },
            {
              field: "Obra Pendiente año Natural",
              value: kpisUnitatControl.obraPendentAny,
            },
            {
              field: "Obra Pendiente Origen",
              value: kpisUnitatControl.obraPendentOrigen,
            },
          ],
        },
      ]
    );
  }, [kpisUnitatControl]);


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
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.beneficiAny }),
      },
      {
        field: "Desviación Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },
      {
        field: "Desviación Año",
        value: kpisUnitatControl.desviacioAny,
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.desviacioAny >= 0 }),
      },
      {
        field: "Pendiente Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },

      {
        field: "Pendiente Año",
        value: kpisUnitatControl.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpisUnitatControl?.obraPendentAny >= 0 }),
      },
    ]);
  }, [kpisUnitatControl,unitControl, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields([
    
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
          field: "Pendiente Origen",
          value: kpis.obraPendentOrigen,
        },
  
        {
          field: "Pendiente Año",
          value: kpis.obraPendentAny,
          colorValue: getKpisColorValue({ value: kpis?.obraPendentAny >= 0 }),
        },
      ]);
  
  }, [kpis, tree, intl]);

  const handleCellChange = async (params, event, details) => {
    const { id, field, value } = params;
    const data = rows.find((row) => row.id === id);
    data[field] = value;
    try {
      await actions.updatePartida({ id, data });
      // update related data
      loadHeader();
      actions.loadTreeData({ periodId: selectedPeriod.id });
    } catch (e) {
      // handle errors
    }
  };

 

  const detailedHeaderBreakpoints = { xs: 4 };
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerProject} body={headerProjectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
        />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[CONTROL_UNIT_TYPE]}
        />
      </Grid>
      <Grid item xs={12}>
        <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
          <Tab label={"Indicadores"} className="tabsIndicators tabsIndicators1" />
          <Tab label={"Partidas"} className="tabsIndicators tabsIndicators2" />
        </Tabs>
      </Grid>

      <Grid item xs={12}>
        {tabIndex === PARTIDAS_TAB_INDEX && (
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
              // onUnmount={() => actions.resetKpis()}
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
    tree: getData(state),
    selectedPeriod: getSelectedPeriod(state),
    kpis: getKpis(state),
    kpisUnitatControl: getKpisUC(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
    updatePartida: bindActionCreators(updatePartida, dispatch),
    loadTreeData: bindActionCreators(loadTreeData, dispatch),
    loadKpis: bindActionCreators(loadKpis, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);

export default component;
