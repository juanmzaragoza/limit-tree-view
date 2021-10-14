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

const columns = (intl) => {
  const cols = [
    { id: "codi", label: "Cód.", minWidth: 90 },
    {
      id: "descripcio",
      label: "Descripció",
      minWidth: 350,
    },

    {
      label: "P. Anterior",
      id: "produccioAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "P. Periodo",
      id: "produccioPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "P. Año Natural",
      id: "produccioAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "P. Origen",
      id: "produccioOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "P. Pendiente",
      id: "produccioPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CT. Anterior",
      id: "costTeoricAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CT. Pendiente",
      id: "costTeoricPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CT. Año Natural",
      id: "costTeoricAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CT. Origen",
      id: "costTeoricOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CT. Pendiente",
      id: "costTeoricPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CR. Anterior",
      id: "costRealAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CR. Pendiente",
      id: "costRealPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CR. Año Natural",
      id: "costRealAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "CR. Origen",
      id: "costRealOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Benef. Anterior",
      id: "beneficiAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Benef. Periodo",
      id: "beneficiPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Benef. Año Natural",
      id: "beneficiAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Benef. Origen",
      id: "beneficiOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Desv. Anterior",
      id: "desviacioCostAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Desv. Periodo",
      id: "desviacioPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Desv. Año Natural",
      id: "desviacioAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "Desv. Origen",
      id: "desviacioOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "OP. Anterior",
      id: "obraPendentFacturar",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "OP. Periodo",
      id: "obraPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "OP. Año Natural",
      id: "obraPendentAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      label: "OP. Origen",
      id: "obraPendentOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
  ];

  return cols;
};

const columnsSubTotal = (intl) => {
  const cols = [
    {
      id: "produccioAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "produccioPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "produccioAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "produccioOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "produccioPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costTeoricAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costTeoricPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costTeoricAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costTeoricOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costTeoricPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costRealAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costRealPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costRealAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "costRealOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "beneficiAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "beneficiPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "beneficiAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "beneficiOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "desviacioCostAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "desviacioPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "desviacioAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "desviacioOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "obraPendentFacturar",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "obraPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "obraPendentAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      numeric: true,
    },
    {
      id: "obraPendentOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
       numeric: true,
    },
  ];

  return cols;
};

const groups = [
  { label: "Producción" },
  { label: "Coste Teórico" },
  { label: "Coste Real" },
  { label: "Beneficios" },
  { label: "Desviación" },
  { label: "Obra Pendiente" },
];

export default function ColumnGroupingTable({ content, contentTotal }) {
  const intl = useIntl();
  const cols = columns(intl);
  const colsSubTotal = columnsSubTotal(intl);

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
              {cols.map((column) => (
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
                  {cols.map((column) => {
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
              {colsSubTotal.map((column) => {
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
