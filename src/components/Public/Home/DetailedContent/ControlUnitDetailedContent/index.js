import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid, Tab, Tabs } from "@mui/material";
import { isEmpty } from "lodash";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import MaterialTable from "components/shared/MaterialTable";

import MaterialCardIndicator from "components/shared/MaterialCardIndicator";
import CardTotal from "components/shared/CardTotal";

import {
  getIsLoading,
  getRows,
  getDetails,
  getUnitControl,
  getKpis as getKpisUC,
  getTotals,
} from "redux/unit-control/selectors";
import {
  loadHeader,
  updatePartida,
  loadKpis,
  loadDetails,
  resetKpis,
} from "redux/unit-control";
import { loadData as loadTreeData, selectNode } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";
import { getKpis } from "redux/project/selectors";

import { entitiesStyles } from "utils/helper";
import { CONTROL_UNIT_TYPE, PROJECT_TYPE } from "constants/business-types";

import {
  getKpisColorValue,
  getPartidaColumnsByPeriod,
  getPartidaColumnsByIndicator,
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
    getPartidaColumnsByPeriod({ period: selectedPeriod, intl })
  );
  const [columnsIndicators] = React.useState(
    getPartidaColumnsByIndicator({ period: selectedPeriod, intl })
  );
  const [tabIndex, setTabIndex] = React.useState(KPIS_TAB_INDEX);
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
  }, [props.id]);

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
        field: "Benef. Año",
        value: kpisUnitatControl.beneficiAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl?.beneficiAny,
        }),
      },
      {
        field: "Desv. Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },
      {
        field: "Desv. Año",
        value: kpisUnitatControl.desviacioAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl?.desviacioAny >= 0,
        }),
      },
      {
        field: "Pen. Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },

      {
        field: "Pen. Año",
        value: kpisUnitatControl.obraPendentAny,
        colorValue: getKpisColorValue({
          value: kpisUnitatControl?.obraPendentAny >= 0,
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
          header={headerProject}
          body={headerProjectFields}
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
            onRowDoubleClick={(row) => actions.selectNode({ ids: row.id })}
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
            onDoubleClick={(row) => actions.selectNode({ ids: row.id })}
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
    selectNode: bindActionCreators(selectNode, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);

export default component;
