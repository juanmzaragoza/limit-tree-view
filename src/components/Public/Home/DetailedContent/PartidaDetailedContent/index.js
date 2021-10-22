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
  getResourceColumnsByPeriod,
  isPeriodOpen,
} from "components/Public/Home/DetailedContent/common";

import { loadHeader, loadKpis, resetKpis, update } from "redux/partida";
import {
  getIsLoading,
  getKpis as getKpisPartida,
  getPartida,
  getRows,
  getIsLoadingKpis,
} from "redux/partida/selectors";
import {
  getKpis as getKpisProjecte,
  getTabIndex,
  getIsLoadingKpis as loadingKpisProject,
} from "redux/project/selectors";
import {
  loadHeader as loadUnitControlHeader,
  loadKpis as loadKpisUC,
} from "redux/unit-control";
import {
  getUnitControl,
  getKpis as getKpisUC,
  getIsLoadingKpis as loadingKpisUC,
} from "redux/unit-control/selectors";
import {
  loadData as loadTreeData,
  selectAndExpandNode,
} from "redux/project-tree";
import { getData, getSelectedNode } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";

import { entitiesStyles, getTreeId } from "utils/helper";
import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE,
} from "constants/business-types";

import { selectTab, loadKpis as loadKpisProject } from "redux/project";

import {
  getHeaderControlUnitFields,
  getHeaderPartidaFields,
  getHeaderProjectFields,
  getIndicators,
} from "./configuration";

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
  selectedNode,
  ...props
}) => {
  const intl = useIntl();
  const content = [
    {
      field: "Coste Final Planificado",
      value: partida.costUni,
    },
  ];
  const onChangeIndexExecutor = {
    [RESOURCES_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      // partida.id && actions.loadKpis({ id: props.id });
    },
  };
  const loadHeader = () => actions.loadHeader({ id: props.id });

  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState(
    []
  );
  const [headerPartida, setHeaderPartida] = React.useState({});
  const [headerPartidaFields, setHeaderPartidaFields] = React.useState([]);
  //TODO() qué significa esto (tab === 2 ? 1 : tab)?
  const [tabIndex, setTabIndex] = React.useState(tab === 2 ? 1 : tab);
  const [indicadores, setIndicadores] = React.useState();
  const [columns] = React.useState(
    getResourceColumnsByPeriod({ period: selectedPeriod, intl })
  );

  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
  }, [tabIndex]);

  React.useEffect(() => {
    actions.loadKpisProject({ id: tree.id });

    partida.id && actions.loadKpis({ id: props.id });

    partida.unitatControlEstudi &&
      actions.loadKpisUC({ id: partida.unitatControlEstudi.id });
    partida.unitatControlEstudi &&
      actions.loadUnitControlHeader({ id: partida.unitatControlEstudi?.id });
  }, [partida]);

  React.useEffect(() => {
    setIndicadores(getIndicators(kpisPartida));
  }, [kpisPartida]);

  React.useEffect(() => {
    loadHeader();
    // partida.id && actions.loadKpis({ id: props.id });
  }, [props.id]);

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields(getHeaderControlUnitFields(kpisUnitatControl));
  }, [kpisUnitatControl, unitControl]);

  React.useEffect(() => {
    setHeaderPartida({ title: partida.descripcioReduc });
    setHeaderPartidaFields(getHeaderPartidaFields(kpisPartida));
  }, [kpisPartida, partida]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields(getHeaderProjectFields(kpisProjecte));
  }, [kpisProjecte, tree]);

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
  const heightLoadingCard = "120px";
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
            actions.selectTab({ value: tabIndex === 1 ? 2 : 0 });

            actions.selectNode({ ids: id });
          }}
          loadingData={loadingKpisProject}
          heightLoadingCard={heightLoadingCard}
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
            //TODO() ??
            actions.selectTab({ value: tabIndex === 1 ? 2 : 0 });
            actions.selectNode({ ids: id });
          }}
          loadingData={loadingKpisUC}
          heightLoadingCard={heightLoadingCard}
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
          heightLoadingCard={heightLoadingCard}
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
    loadingKpis: getIsLoadingKpis(state),
    selectedNode: getSelectedNode(state),
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
    selectTab: bindActionCreators(selectTab, dispatch),
    loadKpisUC: bindActionCreators(loadKpisUC, dispatch),
    loadKpisProject: bindActionCreators(loadKpisProject, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
