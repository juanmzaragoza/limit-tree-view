import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
} from "@mui/material";
import { formatCurrency } from "utils/formats";

export const columns = [
  {
    id: "familiaArticleDescripcio",
    id2: "familiaArticleCodi",
    label: "Familia artículo",
    minWidth: 200,
  },
  {
    id: "articleDescripcio",
    id2: "articleCodi",
    label: "Artículo",
    minWidth: 200,
  },

  {
    label: "Unidades Período",
    id: "unitatsPeriode",
    minWidth: 140,
    numeric: true,
  },
  {
    label: "Precio Período",
    id: "preuPeriode",
    minWidth: 140,
    numeric: true,
    format: (value) => formatCurrency(value ?? 0),
  },
  {
    label: "Importe Anterior",
    id: "importAnterior",
    minWidth: 150,
    numeric: true,
    format: (value) => formatCurrency(value ?? 0),
  },
  {
    label: "Importe Período",
    id: "importPeriode",
    minWidth: 150,
    numeric: true,
    format: (value) => formatCurrency(value ?? 0),
  },
  {
    label: "Importe Año",
    id: "importAny",
    minWidth: 150,
    numeric: true,
    format: (value) => formatCurrency(value ?? 0),
  },
  {
    label: "Importe Origen",
    id: "importOrigen",
    minWidth: 150,
    numeric: true,
    format: (value) => formatCurrency(value ?? 0),
  },
];

const DialogCostes = ({ open, onClose, contentDialog, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>Coste Real</DialogTitle>
      <DialogContent>
        {loading ? (
          <Stack sx={{ color: "grey.500", alignItems: "center"}}>
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          <Paper>
            <TableContainer sx={{ mt: 1 }}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        style={{
                          top: 57,
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                        }}
                        align={column.numeric ? "right" : "left"}
                        className={column.className}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!contentDialog.length && (
                    <TableRow hover>
                      <TableCell align="center" colSpan={9}>
                        No hay costes reales para esta partida.
                      </TableCell>
                    </TableRow>
                  )}

                  {contentDialog.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          const value2 = row[column.id2];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.numeric ? "right" : "left"}
                              className={column.className}
                            >
                              {value === undefined && "---"}
                              <span>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}{" "}
                              </span>
                              {value2 ? ` (${value2})` : ""}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCostes;
