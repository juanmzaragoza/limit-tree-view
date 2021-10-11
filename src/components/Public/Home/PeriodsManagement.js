import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Checkbox,
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

import { loadData, setPeriod, addPeriord } from "redux/period";
import {
  getIsLoading,
  getRows,
  getSelectedPeriod,
} from "redux/period/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { reset as resetTree } from "redux/project-tree";

const PeriodsManagement = ({
  rows,
  loading,
  project,
  actions,
  periodSelected
}) => {
  const [periods, setPeriods] = React.useState([]);
  const [tancat, setTancat] = React.useState(false);
  const [statuses] = React.useState([
    { label: "Cerrado", value: tancat },
    { label: "Revisado Jefe de Obra", value: false },
    { label: "Revisado Jefe de Grupo", value: false },
  ]);
  const isProjectSelected = () => !!(project && project.codi);
  const [disabled, setDisabled] = React.useState(!isProjectSelected());
  const [open, setOpen] = React.useState(false);
  const [fechaFin, setFechaFin] = React.useState();

  React.useEffect(() => {
    if (isProjectSelected()) {
      actions.resetTree();
      actions.loadData({ projectCodi: project.codi });
      setDisabled(false);
      console.log(project)
    }
  }, [project]);

  const getDate = (value) => value.split("T")[0].replace(/-/g, "/");
  React.useEffect(() => {
    setPeriods(
      rows.map((row) => ({
        label: `${row.numero} - ${getDate(row.diaInici)} ${
          row.diaFi ? `- ${getDate(row.diaFi)}` : ""
        }`,
        value: row,
      }))
    );
  }, [rows]);


  const closePeriod = () => {
    actions.add({ id: project.id , codiAccio: "ACCIO_TANCAR", data: [fechaFin] });
  };

  React.useEffect(() => {
    actions.resetTree();
  },[periodSelected]);


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
          width={1000}
        >
          <DialogTitle>Cerrar Periodo</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
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
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
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
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodsManagement);
export default component;
