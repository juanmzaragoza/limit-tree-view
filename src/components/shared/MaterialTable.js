import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";




const groups = [
  { label: "Producción" },
  { label: "Coste Teórico" },
  { label: "Coste Real" },
  { label: "Beneficios" },
  { label: "Desviación" },
  { label: "Obra Pendiente" },
];

export default function ColumnGroupingTable({ content, contentTotal , columns, columnsSubTotal}) {
 


  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="tableRowBorder">
              <TableCell align="center" colSpan={2}></TableCell>
              
              <TableCell align="center" colSpan={5} sx={{ fontWeight: "bold" }}>
                Producción
              </TableCell>
              <TableCell align="center" colSpan={5} sx={{ fontWeight: "bold" }}>
                Coste Teórico
              </TableCell>
              <TableCell align="center" colSpan={4} sx={{ fontWeight: "bold" }}>
                Coste Real
              </TableCell>
              <TableCell align="center" colSpan={4} sx={{ fontWeight: "bold" }}>
                Beneficios
              </TableCell>
              <TableCell align="center" colSpan={4} sx={{ fontWeight: "bold" }}>
                Desviación
              </TableCell>
              <TableCell align="center" colSpan={4} sx={{ fontWeight: "bold" }}>
                Obra Pendiente
              </TableCell>
            </TableRow>
            <TableRow sx={{}}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                  align={column.numeric ? 'right' : 'left'}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        className={column.class}
                      >
                        {value === undefined && "---"}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
              {columnsSubTotal.map((column) => {
                const value = contentTotal[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.numeric ? 'right' : 'left'}
                    className={column.class}
                  >
                    <strong>
                      {value === undefined && "---"}
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </strong>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
