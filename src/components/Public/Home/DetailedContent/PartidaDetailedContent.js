import * as React from "react";
import { connect } from "react-redux";
import { Grid, Tab, Tabs } from "@mui/material";
import { useIntl } from "react-intl";
import { bindActionCreators } from "redux";
import {
  Assignment,
  CallMissedOutgoing,
  Construction,
  DragIndicator,
  Engineering,
  Euro,
  LineWeight,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";

import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import { formatCurrencyWithIntl } from "utils/formats";
import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";

import { loadHeader, update } from "redux/partida";
import { getIsLoading, getPartida, getRows } from "redux/partida/selectors";

import { loadHeader as loadUnitControlHeader } from "redux/unit-control";
import { getUnitControl } from "redux/unit-control/selectors";

import { loadData as loadTreeData } from "redux/project-tree";
import { getData } from "redux/project-tree/selectors";
import { getSelectedPeriod } from "../../../../redux/period/selectors";

const ProjectDetailedContent = ({
  rows,
  loading,
  unitControl,
  partida,
  tree,
  selectedPeriod,
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

  const getData = (params) => `${params.value?.description || ""}`;

  const [tabIndex, setTabIndex] = React.useState(0);

  const [columns] = React.useState([
    { field: "codi", headerName: "Código", type: "number" },

    {
      field: "descripcio",
      headerName: "Descripción",
      width: 140,
      editable: true,
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      editable: true,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: getData,
    },
    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: true,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
    },
  ]);

  const [indicadores, setIndicadores] = React.useState();
  React.useEffect(() => {
   
    setIndicadores([
      {
        field: "Producción Anterior",
        value: partida.produccioAnterior,
        icon: <Engineering />,
      },
      {
        field: "Producción Período",
        value: partida?.produccioPeriode,
        icon: <Engineering />,
      },
      {
        field: "Producción año Natural",
        value: partida.produccioAny,
        icon: <Engineering />,
      },
      {
        field: "Producción a Origen",
        value: partida.produccioOrigen,
        icon: <Engineering />,
      },
      {
        field: "Producción Pendiente",
        value: partida.produccioPendent,
        icon: <Engineering />,
      },

      {
        field: "Coste Teórico Anterior",
        value: partida.costTeoricAnterior,
        icon: <StackedLineChart />,
      },
      {
        field: "Coste Teórico Pendiente",

        value: partida.costTeoricPeriode,

        icon: <StackedLineChart />,
      },
      {
        field: "Coste Teórico Año Natural",

        value: partida.costTeoricAny,

        icon: <StackedLineChart />,
      },
      {
        field: "Coste Teórico Origen",

        value: partida.costTeoricOrigen,

        icon: <StackedLineChart />,
      },
      {
        field: "Coste Teórico Pendiente",

        value: partida.costTeoricPendent,
        icon: <StackedLineChart />,
      },
      {
        field: "Coste Real Anterior",
        value: partida.costRealAnterior,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Pendiente",
        value: partida.costRealPeriode,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real año Natural",
        value: partida.costRealAny,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Origen",
        value: partida.costRealOrigen,
        icon: <StackedBarChart />,
      },
      {
        field: "Beneficio Anterior",
        value: partida.beneficiAnterior,
        icon: <Euro />,
      },
      {
        field: "Beneficio Período",
        value: partida.beneficiPeriode,
        icon: <Euro />,
      },
      {
        field: "Beneficio año Natural",
        value: partida.beneficiAny,
        icon: <Euro />,
      },
      {
        field: "Beneficio Origen",
        value: partida.beneficiOrigen,
        icon: <Euro />,
      },

      {
        field: "Desviación Anterior",
        value: partida.desviacioCostAnterior,
        icon: <CallMissedOutgoing />,
      },
      {
        field: "Desviación Período",
        value: partida.desviacioPeriode,
        icon: <CallMissedOutgoing />,
      },
      {
        field: "Desviación año Natural",
        value: partida.desviacioAny,
        icon: <CallMissedOutgoing />,
      },

      {
        field: "Desviación Origen",
        value: partida.desviacioOrigen,
        icon: <CallMissedOutgoing />,
      },
     
      {
        field: "Obra Pendiente Anterior",
        value: partida.obraPendentFacturar,
        icon: <Construction />,
      },
      {
        field: "Obra Pendiente Período",
        value: partida.obraPendent,
        icon: <Construction />,
      },

      {
        field: "Obra Pendiente año Natural",
        value: partida.beneficiOrigen,
        icon: <Construction />,
      },

      {
        field: "Obra Pendiente Origen",
        value: partida.beneficiOrigen,
        icon: <Construction />,
      },
    ]);
  }, [partida]);

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
    setHeaderPartida({ title: partida.descripcio });
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
        <Tabs
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          centered
        >
          <Tab icon={<LineWeight />} label={"Recursos"} />
          <Tab icon={<DragIndicator />} label={"Indicadores"} />
        </Tabs>
      </Grid>
 
      {tabIndex === 0 && (
        <Grid item xs={12}>
          <MaterialDataGrid           columns={columns}
          getRowId={(row) => row.id}
          rows={rows}
          loading={loading}
          onCellEditCommit={handleCellChange}/>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid item xs={12}>
          <MaterialCardPartidaIndicator
            content={indicadores}
          />
        </Grid>
      )}
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadHeader: bindActionCreators(loadHeader, dispatch),
    updateResource: bindActionCreators(update, dispatch),
    loadUnitControlHeader: bindActionCreators(loadUnitControlHeader, dispatch),
    loadTreeData: bindActionCreators(loadTreeData, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailedContent);
export default component;
