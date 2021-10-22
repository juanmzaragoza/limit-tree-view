import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Chip, Grid } from "@mui/material";
import { Lock, LockOpen } from "@mui/icons-material";

import MaterialSelector from "components/shared/MaterialSelector";
import MaterialCheckbox from "components/shared/MaterialCheckbox";

import {
  loadData,
  setPeriod,
  addPeriord,
  reset as resetPeriod,
  openNewPeriod,
} from "redux/period";
import {
  getIsLoading,
  getRows,
  getSelectedPeriod,
} from "redux/period/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { reset as resetTree } from "redux/project-tree";

import ClosePeriodDialog from "./ClosePeriodDialog";

const PeriodsManagement = ({
  rows,
  loading,
  project,
  actions,
  periodSelected,
}) => {
  const [periods, setPeriods] = React.useState([]);
  const [tancat, setTancat] = React.useState("");
  const [statuses] = React.useState([
    { label: "Revisado Jefe de Obra", value: false },
    { label: "Revisado Jefe de Grupo", value: false },
  ]);
  const isProjectSelected = () => !!(project && project.codi);
  const [disabled, setDisabled] = React.useState(!isProjectSelected());
  const [open, setOpen] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState();
  const [reload, setReload] = React.useState(false);
  const [isEmptyRows, setIsEmptyRows] = React.useState(false);
  const [openNewPeriod, setOpenNewPeriod] = React.useState(false);

  React.useEffect(() => {
    if (isProjectSelected()) {
      actions.resetTree();
      actions.loadData({ projectCodi: project.codi });
      setDisabled(false);
    }
  }, [project]);

  const getDate = (value) => {
    const data = new Date(value);
    return data.toLocaleDateString();
  };

  React.useEffect(() => {
    setIsEmptyRows(rows.length === 0);
    setPeriods(
      rows.map((row) => ({
        label: `${row.numero} - ${getDate(row.diaInici)} ${
          row.diaFi ? `- ${getDate(row.diaFi)}` : ""
        }`,
        value: row,
      }))
    );
  }, [rows]);

  const closePeriod = async () => {
    const codiAccio = "ETP_TANCAR";
    const data = dateEnd;
    try {
      await actions.addPeriod({ id: periodSelected.id, codiAccio, data });
      if (openNewPeriod) {
        openNew();
      }
      setOpen(false);
      setReload(true);
    } catch (e) {
      console.log(e);
    }
  };

  const openNew = async () => {
    const codiAccio = "ETP_NOUPER";
    try {
      await actions.openNewPeriod({ id: periodSelected.id, codiAccio });
      setOpenNewPeriod(false);
      setReload(true);
    } catch (e) {
      console.log(e);
    }
  };

  const openPeriod = () => {
    const codiAccio = "ETP_OBRIR";
    actions.openNewPeriod({ id: periodSelected.id, codiAccio });
    setReload(true);
  };

  React.useEffect(() => {
    actions.loadData({ projectCodi: project?.codi });
    setReload(false);
  }, [reload]);

  const renderPeriodStatus = () => {
    if (isEmptyRows) return "";
    if (tancat) {
      return (
        <Chip
          variant="filled"
          label="Cerrado"
          color="warning"
          icon={<Lock />}
          sx={{ mr: 2, fontSize: "14px" }}
        />
      );
    } else {
      return (
        <Chip
          variant="filled"
          label="Abierto"
          color="success"
          icon={<LockOpen />}
          sx={{ mr: 2, fontSize: "14px" }}
        />
      );
    }
  };

  const renderChangePeriodButton = () => {
    if (isEmptyRows) {
      return <Button variant={"outlined"}>Crear Período</Button>;
    }
    if (tancat) {
      return (
        <Button variant={"outlined"} onClick={() => openPeriod()}>
          Abrir Período
        </Button>
      );
    } else {
      return (
        <Button
          variant={"outlined"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Cerrar Período
        </Button>
      );
    }
  };

  return (
    <Grid container spacing={1} direction="row" alignItems="center">
      <Grid item xs={12} md={12} lg={8}>
        <MaterialSelector
          id={"period"}
          items={periods}
          onChange={(e) => {
            actions.setPeriod({ period: e });
            setTancat(e.tancat);
          }}
          disabled={disabled}
          label={"Períodos"}
          loading={loading}
          selectFirstDefault
        />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        {renderChangePeriodButton()}
        <ClosePeriodDialog
          open={open}
          onClose={() => setOpen(false)}
          periodSelected={periodSelected}
          getDate={getDate}
          setDateEnd={setDateEnd}
          isPeriodOpen={openNewPeriod}
          setIsPeriodOpen={setOpenNewPeriod}
          onClosePeriod={closePeriod}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {renderPeriodStatus()}
        <MaterialCheckbox items={statuses} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state),
    periodSelected: getSelectedPeriod(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch),
    setPeriod: bindActionCreators(setPeriod, dispatch),
    resetTree: bindActionCreators(resetTree, dispatch),
    resetPeriod: bindActionCreators(resetPeriod, dispatch),
    addPeriod: bindActionCreators(addPeriord, dispatch),
    openNewPeriod: bindActionCreators(openNewPeriod, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodsManagement);
export default component;
