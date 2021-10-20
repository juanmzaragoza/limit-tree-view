import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Stack,
  TextField,
  Grid,

} from "@mui/material";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";

const DialogMediciones = ({
  open,
  onClose,
  contentDialog,
  loading,
  handleUpdateMediciones = () => {},
}) => {

  const [dataMedicion, setDataMedicion] = React.useState([]);

  React.useEffect(() => {
    setDataMedicion([
      { field: "unitatsActual", value: contentDialog?.unitatsActual },
      { field: "medicioOrigen", value: contentDialog?.medicioOrigen },
    ]);
  },[contentDialog]);

  const intl = useIntl();
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Mediciones</DialogTitle>
      <DialogContent>
        {loading ? (
          <Stack sx={{ color: "grey.500", alignItems: "center" }}>
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          <>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item lg={12} sm={12}>
                <TextField
                  id="estudiProjecte"
                  label="Partida"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog
                      ? `${contentDialog?.descripcioReduc} (${contentDialog?.codi})`
                      : ""
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitatsActual"
                  label="Medición hecha periodo"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog ? `${contentDialog?.unitatsActual}` : ""
                  }`}
                  onChange={(e) => {
                    const data = dataMedicion;
                    data[0].value = e.target.value;
                    setDataMedicion(data)}}
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="medicioOrigen"
                  label="Medición Origen"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog ? `${contentDialog?.medicioOrigen}` : ""
                  }`}
                  onChange={(e) => {
                    const data = dataMedicion;
                    data[1].value = e.target.value;
                    setDataMedicion(data)}}
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitats"
                  label="Medición Prevista"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog ? `${contentDialog?.unitats}` : ""
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitatsAnterior"
                  label="Medición Origen Anterior"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog ? `${contentDialog?.unitatsAnterior}` : ""
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="obraPendent"
                  label="Medición Pendiente"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog ? `${contentDialog?.obraPendent}` : ""
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitatsPress"
                  label="Medición Presupuestada"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog?.unitatsPress === undefined
                      ? ""
                      : contentDialog?.unitatsPress
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="preu"
                  label="Pvp Bruto"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    contentDialog ? formatCurrencyWithIntl(contentDialog?.preu, intl) : ""}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="preuNet"
                  label="Pvp Neto"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    contentDialog ? formatCurrencyWithIntl(contentDialog?.preuNet, intl) : ""}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="importTotal"
                  label="Import Total"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    contentDialog ? formatCurrencyWithIntl(contentDialog?.importTotal, intl) : ""}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="costUni"
                  label="Coste Unitario Total"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    contentDialog ? formatCurrencyWithIntl(contentDialog?.costUni, intl) : ""}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="costTotal"
                  label="Coste Total Previsto"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    contentDialog ? formatCurrencyWithIntl(contentDialog?.costTotal, intl) : ""}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleUpdateMediciones(contentDialog.id, dataMedicion);
          }}
          variant="contained"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMediciones;
