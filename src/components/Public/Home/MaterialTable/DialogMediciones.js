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
import { formatCurrencyWithIntl, formatNumberWithIntl } from "utils/formats";
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
  }, [contentDialog]);

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
                  value={`${
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
                  id="unitatTipus"
                  label="Tipo Unidad"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog?.unitatTipus?.description
                      ? contentDialog?.unitatTipus?.description
                      : ""
                  }`}
                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitatsAnterior"
                  label="Medición Anterior Origen"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`${
                    contentDialog
                      ? formatNumberWithIntl(
                          contentDialog?.unitatsAnterior,
                          intl
                        )
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
                  value={contentDialog?.unitatsActual ?? "" }
                  onChange={(e) => {
                    const data = dataMedicion;
                    data[0].value = e.target.value;
                    setDataMedicion(data);

                    handleUpdateMediciones(contentDialog.id, data);

                  }}
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
                  value={contentDialog?.medicioOrigen ?? ""}
                  onChange={(e) => {
                    const data = dataMedicion;
                    data[1].value = e.target.value;
                    setDataMedicion(data);
                    handleUpdateMediciones(contentDialog.id, data);
                  }}
                  fullWidth
                />
              </Grid>
    
              <Grid item lg={2} sm={12}>
                <TextField
                  id="unitats"
                  label="Medición Planificada"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={contentDialog?.unitats ?? ""}

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
                  value={contentDialog?.obraPendent ?? ""}

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
                  value={contentDialog?.unitatsPress ?? ""}

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
                  value={contentDialog? formatCurrencyWithIntl(contentDialog?.preu, intl) : ""}

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
                  value={contentDialog? formatCurrencyWithIntl(contentDialog?.preuNet, intl) : ""}

                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="importTotal"
                  label="Importe Final Planificado"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={contentDialog? formatCurrencyWithIntl(contentDialog?.importTotal, intl) : ""}

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
                  value={contentDialog? formatCurrencyWithIntl(contentDialog?.costUni, intl) : ""}

                  disabled
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item lg={2} sm={12}>
                <TextField
                  id="costTotal"
                  label="Coste Final Planificado"
                  type="input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={contentDialog? formatCurrencyWithIntl(contentDialog?.costTotal, intl) : ""}

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
      </DialogActions>
    </Dialog>
  );
};

export default DialogMediciones;
