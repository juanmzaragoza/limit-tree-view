import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";

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
import { Lock, LockOpen } from "@mui/icons-material";

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
  const [fechaFin, setFechaFin] = React.useState();
  const [recargar, setRecargar] = React.useState(false);
  const [hayPeriodo, setHayPeriodo] = React.useState();
  const [abrirPeriodo, setAbrirPeriodo] = React.useState(false);

  React.useEffect(() => {
    if (isProjectSelected()) {
      actions.resetTree();
      actions.loadData({ projectCodi: project.codi });
      setDisabled(false);
    }
  }, [project]);

  const getDate = (value) => value.split("T")[0].replace(/-/g, "/");
  React.useEffect(() => {
    if (rows.length === 0) {
      setHayPeriodo(true);
    } else {
      setHayPeriodo(false);
    }
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
    const close = await actions.add({
      id: periodSelected.id,
      codiAccio: "ETP_TANCAR",
      data: fechaFin,
    });

    if (close.request.status === 200) {
      if (abrirPeriodo) {
        openNew();
      }
    }

    setOpen(false);
    setRecargar(true);
    setAbrirPeriodo(false);
  };

  const openNew = () => {
    actions.openNewPeriod({
      id: periodSelected.id,
      codiAccio: "ETP_NOUPER",
    });

    setAbrirPeriodo(false);
    setRecargar(true);
  };

  const openPeriod = () => {
    actions.openNewPeriod({
      id: periodSelected.id,
      codiAccio: "ETP_OBRIR",
    });
    setRecargar(true);
  };

  React.useEffect(() => {
    actions.loadData({ projectCodi: project?.codi });
    setRecargar(false);
  }, [recargar]);

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
          tancat={tancat}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        {hayPeriodo ? <Button variant={"outlined"}>
            Crear Período
          </Button> :
        tancat ? (
          <Button variant={"outlined"} onClick={(e) => openPeriod()}>
            Abrir Período
          </Button>
        ) : (
          <>
            <Button
              variant={"outlined"}
              onClick={() => {
                setOpen(true);
              }}
            >
              Cerrar Período
            </Button>
            <Dialog
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              width={"1000px"}
            >
              <DialogTitle>Cerrar Periodo</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} sm={12}>
                      <TextField
                        id="estudiProjecte"
                        label="Estudio Proyecto"
                        type="input"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled
                        defaultValue={
                          periodSelected
                            ? `${periodSelected?.descripcio} (${periodSelected?.codi})`
                            : ""
                        }
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item lg={2} sm={12}>
                      <TextField
                        id="estudiProjecte"
                        label="Num Periodo"
                        type="input"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled
                        defaultValue={`${
                          periodSelected ? periodSelected?.numero : ""
                        }`}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item lg={5} sm={12}>
                      <TextField
                        id="estudiProjecte"
                        label="Fecha Inicio"
                        type="input"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled
                        defaultValue={`${
                          periodSelected?.diaInici
                            ? getDate(periodSelected?.diaInici)
                            : ""
                        }`}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item lg={5} sm={12}>
                      <TextField
                        id="date"
                        label="Fecha Final"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setFechaFin(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={12} sm={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={abrirPeriodo}
                              onChange={(e) => {
                                setAbrirPeriodo(e.target.checked);
                              }}
                            />
                          }
                          label="Abrir nuevo periodo?"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={(e) => {
                    closePeriod(e);
                  }}
                >
                  Cerrar Peridodo
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        {hayPeriodo ? (
          ""
        ) : tancat === true ? (
          <Chip
            variant="filled"
            label="Cerrado"
            color="warning"
            icon={<Lock />}
            sx={{ mr: 2, fontSize: "14px" }}
          />
        ) : (
          <Chip
            variant="filled"
            label="Abierto"
            color="success"
            icon={<LockOpen />}
            sx={{ mr: 2, fontSize: "14px" }}
          />
        )}
        <MaterialCheckbox items={statuses} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state),
    periodSelected: getSelectedPeriod(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch),
    setPeriod: bindActionCreators(setPeriod, dispatch),
    resetTree: bindActionCreators(resetTree, dispatch),
    add: bindActionCreators(addPeriord, dispatch),
    resetPeriod: bindActionCreators(resetPeriod, dispatch),
    openNewPeriod: bindActionCreators(openNewPeriod, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodsManagement);
export default component;
