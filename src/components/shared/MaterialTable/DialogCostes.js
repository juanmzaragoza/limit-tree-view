import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";

export const columns = [
  {
    id: "article",
    label: "Artículo",
    minWidth: 400,
  },

  {
    label: "familia",
    id: "Familia",
    minWidth: 140,
  },
  {
    label: "cost Mitg",
    id: "Coste Medio Unitario",
    minWidth: 140,
  },
];

export const content = [
  {
    id: "article",
    label: "Artículo",
    minWidth: 400,
  },

  {
    label: "familia",
    id: "Familia",
    minWidth: 140,
  },
  {
    label: "cost Mitg",
    id: "Coste Medio Unitario",
    minWidth: 140,
  },
];

const DialogCostes = ({ open, onClose, idCostes }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Coste Real</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Paper>
            <TableContainer>
              <Table  aria-label="sticky table">
                <TableHead>
                  <TableRow >
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
                  {content.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                     

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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCostes;
