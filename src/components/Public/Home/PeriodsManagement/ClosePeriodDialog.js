import * as React from "react";
import {
  Button,
  Checkbox,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField
} from "@mui/material";

const ClosePeriodDialog = ({
  open,
  onClose,
  periodSelected,
  getDate,
  setDateEnd,
  isPeriodOpen,
  setIsPeriodOpen,
  onClosePeriod
}) => {
  return <Dialog
    open={open}
    onClose={onClose}
    width={"1000px"}
  >
    <DialogTitle>Cerrar Periodo</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{mt: 1}}>
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
          <Grid item lg={3} sm={12}>
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
          <Grid item lg={4} sm={12}>
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
              sx={{width: 220}}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </Grid>

          <Grid item lg={12} sm={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={isPeriodOpen}
                    onChange={(e) => {
                      setIsPeriodOpen(e.target.checked);
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
      <Button onClick={onClose} >
        Cancelar
      </Button>
      <Button onClick={onClosePeriod} >
        Cerrar Peridodo
      </Button>
    </DialogActions>
  </Dialog>;
}

export default ClosePeriodDialog;