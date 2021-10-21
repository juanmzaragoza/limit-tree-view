import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";
import { Grid, Tab, Tabs } from "@mui/material";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import CardTotal from "components/shared/CardTotal";
import {
  getKpisColorValue,
  getResourceColumnsByPeriod,
  isPeriodOpen,
} from "components/Public/Home/DetailedContent/common";

import { loadHeader, loadKpis, resetKpis, update } from "redux/partida";
import {
  getIsLoading,
  getKpis as getKpisPartida,
  getPartida,
  getRows,
  getIsLoadingKpis
} from "redux/partida/selectors";
import {
  getKpis as getKpisProjecte,
  getTabIndex,
  getIsLoadingKpis as loadingKpisProject
} from "redux/project/selectors";
import { loadHeader as loadUnitControlHeader, loadKpis as loadKpisUC } from "redux/unit-control";
import {
  getUnitControl,
  getKpis as getKpisUC,
  getIsLoadingKpis as loadingKpisUC
} from "redux/unit-control/selectors";
import {
  loadData as loadTreeData,
  selectAndExpandNode,
} from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles, getTreeId } from "utils/helper";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE,
} from "constants/business-types";

import { getIndicators } from "./configuration";
import { selectTab } from "redux/project";

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
  tab,
  loadingKpisUC,
  loadingKpisProject,
  loadingKpis,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState([]);
  const [headerPartida, setHeaderPartida] = React.useState({});
  const [headerPartidaFields, setHeaderPartidaFields] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(tab === 2 ? 1 : tab);
  const [indicadores, setIndicadores] = React.useState();
  const [columns] = React.useState(
    getResourceColumnsByPeriod({ period: selectedPeriod, intl })
  );

  const onChangeIndexExecutor = {
    [RESOURCES_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      // partida.id && actions.loadKpis({ id: props.id });
    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex, partida]);

  React.useEffect(() => {
    
    partida.id && actions.loadKpis({ id: props.id });
    partida.unitatControlEstudi && actions.loadKpisUC({ id:  partida.unitatControlEstudi.id });
    
    if(partida.unitatControlEstudi !== undefined){
      
      actions.loadUnitControlHeader({ id: partida.unitatControlEstudi?.id });
    }
    
  }, [partida]);

  const content = [
    {
      field: "Coste Final Planificado",
      value: partida.costUni,
    },
  ];


  React.useEffect(() => {
    setIndicadores(getIndicators(kpisPartida));
  }, [kpisPartida]);

  const loadHeader = () => actions.loadHeader({ id: props.id });
  React.useEffect(() => {
    loadHeader();
    // partida.id && actions.loadKpis({ id: props.id });


  }, [props.id]);

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields([
      {
        field: "Res. Bru. Orig.",
        value: kpisUnitatControl.beneficiOrigen,
      },

      {
        field: "Prod. Origen",
        value: kpisUnitatControl.produccioOrigen,
      },
      {
        field: "Desv. Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },

      {
        field: "Res. Bru. Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.beneficiAny,
        }),
      },
      {
        field: "Prod. Año",
        value: kpisUnitatControl.produccioAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.produccioAny,
        }),
      },

      {
        field: "Desv. Año",
        value: kpisUnitatControl.desviacioAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.desviacioAny,
        }),
      },
    ]);
  }, [kpisUnitatControl, unitControl, intl]);

  React.useEffect(() => {
    setHeaderPartida({ title: partida.descripcioReduc });
    setHeaderPartidaFields([
      {
        field: "Res. Bru. Orig.",
        value: kpisPartida.beneficiOrigen,
      },

      {
        field: "Prod. Origen",
        value: kpisPartida.produccioOrigen,
      },
      {
        field: "Desv. Origen",
        value: kpisPartida.desviacioOrigen,
      },
      {
        field: "Res. Bru. Año",
        value: kpisPartida.beneficiAny,
        colorValue: getKpisColorValue({ value: kpisPartida.beneficiAny }),
      },
      {
        field: "Prod. Año",
        value: kpisPartida.produccioAny,
        colorValue: getKpisColorValue({ value: kpisPartida.produccioAny }),
      },

      {
        field: "Desv. Año",
        value: kpisPartida.desviacioAny,
        colorValue: getKpisColorValue({ value: kpisPartida.desviacioAny }),
      },
    ]);
  }, [kpisPartida, partida, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields([
      {
        field: "Res. Bru. Orig.",
        value: kpisProjecte.beneficiOrigen,
      },

      {
        field: "Prod. Origen",
        value: kpisProjecte.produccioOrigen,
      },
      {
        field: "Pen. Fac. Orig.",
        value: kpisProjecte.obraPendentOrigen,
      },
      {
        field: "Res. Bru. Año",
        value: kpisProjecte.beneficiAny,
        colorValue: getKpisColorValue({ value: kpisProjecte.beneficiAny }),
      },
      {
        field: "Prod. Año",
        value: kpisProjecte.produccioAny,
        colorValue: getKpisColorValue({ value: kpisProjecte.produccioAny }),
      },

      {
        field: "Pen. Fac. Año",
        value: kpisProjecte.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpisProjecte.obraPendentAny }),
      },
    ]);
  }, [kpisProjecte, tree, intl]);

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
          id={getTreeId(tree)}
          header={headerProject}
          body={headerProjectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
          onClick={(id) => {
            actions.selectTab({ value:  tabIndex === 1 ? 2 : 0  });
            actions.selectNode({ ids: id });
          }}
          loadingData={loadingKpisProject}
        />
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader
          id={getTreeId(unitControl)}
          header={headerControlUnit}
          body={headerControlUnitFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[CONTROL_UNIT_TYPE]}
          onClick={(id) => {
            actions.selectTab({ value: tabIndex === 1 ? 2 : 0 });
            actions.selectNode({ ids: id });
          }}
          loadingData={loadingKpisUC}
        />
      </Grid>
      <Grid item xs={4}>
        <DetailedHeader
          id={getTreeId(partida)}
          header={headerPartida}
          body={headerPartidaFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PARTIDA_TYPE]}
          onClick={(id) => actions.selectNode({ ids: id })}
          loadingData={loadingKpis}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
              <Tab
                label={"Indicadores"}
                className="tabsIndicators tabsIndicators1"
              />
              <Tab
                label={"Recursos"}
                className="tabsIndicators tabsIndicators2"
              />
            </Tabs>
          </Grid>
          <Grid item xs={2}>
            <CardTotal body={content} breakPoint={12} />
          </Grid>
        </Grid>
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
    partida: getPartida(state),
    tree: getData(state),
    selectedPeriod: getSelectedPeriod(state),
    kpisPartida: getKpisPartida(state),
    kpisUnitatControl: getKpisUC(state),
    kpisProjecte: getKpisProjecte(state),
    tab: getTabIndex(state),
    loadingKpisUC: loadingKpisUC(state),
    loadingKpisProject: loadingKpisProject(state),
    loadingKpis: getIsLoadingKpis(state)
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
    selectNode: bindActionCreators(selectAndExpandNode, dispatch),
    selectTab:  bindActionCreators(selectTab, dispatch),
    loadKpisUC : bindActionCreators(loadKpisUC, dispatch),
    
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
