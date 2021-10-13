import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";
import { Business, EmojiEvents } from '@mui/icons-material'

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import {
  getIsLoading,
  getRows,
  getUnitControl,
  getKpis as
  getKpisUC 
} from "redux/unit-control/selectors";
import { loadHeader, updatePartida, loadKpis } from "redux/unit-control";
import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "redux/period/selectors";
import { getKpis } from "redux/project/selectors";

import {entitiesStyles, primaryColor} from "utils/helper";

import {
  getKpisColorValue,
  getPartidaColumnsByPeriod,
  isPeriodOpen,
} from "./common";

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
        field: "Obra Pendiente Origen",
        value: kpisUnitatControl.obraPendentOrigen,
      },

      {
        field: "Obra Pendiente Año",
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
          field: "Obra Pendiente Origen",
          value: kpis.obraPendentOrigen,
        },
  
        {
          field: "Obra Pendiente Año",
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

  React.useEffect(() => {
    unitControl.id && actions.loadKpis({ id: unitControl.id });
  }, [unitControl]);

  const detailedHeaderBreakpoints = { xs: 4 };
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerProject} body={headerProjectFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles['project']}
        />
      </Grid>
      <Grid item xs={6}>
        <DetailedHeader
          header={headerControlUnit}
          body={headerControlUnitFields}
          breakpoints={detailedHeaderBreakpoints}
          {...entitiesStyles['project']}
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid
          columns={columns}
          getRowId={(row) => row.id}
          rows={rows}
          loading={loading}
          onCellEditCommit={handleCellChange}
          disableInlineEdition={!isPeriodOpen({ period: selectedPeriod })}
        />
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
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlUnitDetailedContent);

export default component;
