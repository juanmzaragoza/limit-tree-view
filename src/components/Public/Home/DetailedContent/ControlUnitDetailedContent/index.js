import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid, Tab, Tabs } from "@mui/material";
import { isEmpty } from "lodash";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import MaterialTable from "components/shared/MaterialTable/index";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import CardTotal from "components/shared/CardTotal";

import {
  getIsLoading,
  getRows,
  getDetails,
  getUnitControl,
  getKpis as getKpisUC,
  getTotals,
  getIsLoadingDetails,
} from "redux/unit-control/selectors";
import {
  loadHeader,
  updatePartida,
  loadKpis,
  loadDetails,
  resetKpis,
} from "redux/unit-control";
import { loadData as loadTreeData, selectAndExpandNode } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";
import { getKpis, getTabIndex } from "redux/project/selectors";

import { entitiesStyles } from "utils/helper";
import { CONTROL_UNIT_TYPE, PROJECT_TYPE } from "constants/business-types";
import { selectTab } from "redux/project";

import {
  getKpisColorValue,
  getPartidaColumnsByPeriod,
  isPeriodOpen,
} from "../common";

import {
  getIndicators,
  columnsIndicatorsPartida,
  columnsSubTotal,
  groups
} from "./configuration";

const KPIS_TAB_INDEX = 0;
const DETAIL_TAB_INDEX = 1;
const PARTIDAS_TAB_INDEX = 2;

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
  details,
  totals,
  tab,
  loadingDetails,
  ...props
}) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [headerProjectFields, setHeaderProjectFields] = React.useState([]);
  const [headerControlUnit, setHeaderControlUnit] = React.useState({});
  const [headerControlUnitFields, setHeaderControlUnitFields] = React.useState(
    []
  );
  const [columns] = React.useState(
    getPartidaColumnsByPeriod({ period: selectedPeriod, intl, actions })
  );
  const [tabIndex, setTabIndex] = React.useState(tab);
  const loadHeader = () => actions.loadHeader({ id: props.id });
  const [indicadores, setIndicadores] = React.useState();
  const onChangeIndexExecutor = {
    [PARTIDAS_TAB_INDEX]: () => {},
    [KPIS_TAB_INDEX]: () => {
      unitControl.id && actions.loadKpis({ id: unitControl.id });
    },
    [DETAIL_TAB_INDEX]: () => {
      unitControl.id && actions.loadDetails({ id: unitControl.id });

    },
  };
  React.useEffect(() => {
    onChangeIndexExecutor[tabIndex]();
   
  }, [tabIndex, unitControl]);

  React.useEffect(() => {
    loadHeader();
    unitControl.id && actions.loadKpis({ id: props.id });
  }, [props.id,]);




  const content = [
    { field: "Importe Total", value: unitControl.importTotal },
    {
      field: "Coste Total",
      value: unitControl.costTotal,
    },
  ];

  React.useEffect(() => {
    setIndicadores(getIndicators(kpisUnitatControl));
  }, [kpisUnitatControl]);

  React.useEffect(() => {
    setHeaderControlUnit({ title: unitControl.descripcio });
    setHeaderControlUnitFields([
      {
        field: "Benef. Origen",
        value: kpisUnitatControl.beneficiOrigen,
      },
  
      {
        field: "Prod. Origen",
        value: kpisUnitatControl.produccioOrigen,
      },
      {
        field: "Pen. Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },
     
      {
        field: "Benef. Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.beneficiAny,
        }),
      },
      {
        field: "Prod. Año",
        value: kpisUnitatControl.produccioAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.produccioAny ,
        }),
      },
     

      {
        field: "Pen. Año",
        value: kpisUnitatControl.obraPendentAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl.obraPendentAny ,
        }),
      },
    ]);
  }, [kpisUnitatControl, unitControl, intl]);

  React.useEffect(() => {
    setHeaderProject({ title: tree.descripcio });
    setHeaderProjectFields([
      {
        field: "Benef. Origen",
        value: kpis.beneficiOrigen,
      },
      
      {
        field: "Prod. Origen",
        value: kpis.produccioOrigen,
      },
      {
        field: "Pen. Origen",
        value: kpis.obraPendentOrigen,
      },
      {
        field: "Benef. Año",
        value: kpis.beneficiAny,
        colorValue: getKpisColorValue({ value: kpis.beneficiAny  }),
      },
      {
        field: "Prod. Año",
        value: kpis.produccioAny,
        colorValue: getKpisColorValue({ value: kpis.produccioAny }),
      },
     

      {
        field: "Pen. Año",
        value: kpis.obraPendentAny,
        colorValue: getKpisColorValue({ value: kpis.obraPendentAny  }),
      },
    ]);
  }, [kpis, tree, intl]);

  const handleCellChange = async (params, event, details) => {
    const { id, field, value } = params;
    const data = rows.find((row) => row.id === id);
    console.log(params);
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
          id={selectedPeriod.id}
          header={headerProject}
          body={headerProjectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[PROJECT_TYPE]}
          onClick={(id) => actions.selectNode({ ids: id })}

        />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader
          id={unitControl.id}
          header={headerControlUnit}
          body={headerControlUnitFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles[CONTROL_UNIT_TYPE]}
          onClick={(id) => actions.selectNode({ ids: id })}
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
              <Tab label={"Indicadores Partidas"} className="tabsIndicators " />
              <Tab
                label={"Partidas"}
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
        {tabIndex === PARTIDAS_TAB_INDEX && (
          <MaterialDataGrid
            columns={columns}
            getRowId={(row) => row.id}
            rows={rows}
            loading={loading}
            onCellEditCommit={handleCellChange}
            disableInlineEdition={!isPeriodOpen({ period: selectedPeriod })}
            // onRowDoubleClick={(row) => actions.selectNode({ ids: row.id })}
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
          <MaterialTable
            content={details}
            contentTotal={totals}
            columns={columnsIndicatorsPartida(intl)}
            columnsSubTotal={columnsSubTotal(intl)}
            groups={groups}
            onDoubleClick={(row) => { actions.selectTab({ value: KPIS_TAB_INDEX});
            actions.selectNode({ ids: row.id })}}
            loadingTable={loadingDetails}
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
    unitControl: getUnitControl(state),
    tree: getData(state),
    selectedPeriod: getSelectedPeriod(state),
    kpis: getKpis(state),
    kpisUnitatControl: getKpisUC(state),
    details: getDetails(state),
    totals: getTotals(state),
    tab: getTabIndex(state),
    loadingDetails : getIsLoadingDetails(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
    updatePartida: bindActionCreators(updatePartida, dispatch),
    loadTreeData: bindActionCreators(loadTreeData, dispatch),
    loadKpis: bindActionCreators(loadKpis, dispatch),
    loadDetails: bindActionCreators(loadDetails, dispatch),
    resetKpis: bindActionCreators(resetKpis, dispatch),
    selectNode: bindActionCreators(selectAndExpandNode, dispatch),
    selectTab:  bindActionCreators(selectTab, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);

export default component;
