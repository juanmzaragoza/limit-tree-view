import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
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
    },
    {
      label: "P. Periodo",
      id: "produccioPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "P. Año Natural",
      id: "produccioAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "P. Origen",
      id: "produccioOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "P. Pendiente",
      id: "produccioPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "CT. Anterior",
      id: "costTeoricAnterior",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "CT. Pendiente",
      id: "costTeoricPeriode",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "CT. Año Natural",
      id: "costTeoricAny",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "CT. Origen",
      id: "costTeoricOrigen",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    },
    {
      label: "CT. Pendiente",
      id: "costTeoricPendent",
      minWidth: 140,
      format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
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
      },
      {
       
        id: "produccioPeriode",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
    
        id: "produccioAny",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
     
        id: "produccioOrigen",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
   
        id: "produccioPendent",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
      
        id: "costTeoricAnterior",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
       
        id: "costTeoricPeriode",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
     
        id: "costTeoricAny",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
     
        id: "costTeoricOrigen",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
      {
       
        id: "costTeoricPendent",
        minWidth: 140,
        format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
      },
    ];
  
    return cols;
  };

export default function ColumnGroupingTable({ content, contentTotal }) {
  const intl = useIntl();
  const cols = columns(intl);
  const colsSubTotal = columnsSubTotal(intl);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}></TableCell>
              <TableCell align="center" colSpan={5} sx={{ fontWeight: "bold" }}>
                Producción
              </TableCell>
              <TableCell align="center" colSpan={5} sx={{ fontWeight: "bold" }}>
                Coste Teórico
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
                        align={column.align}
                        className={column.class}
                      >
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
              <TableCell  sx={{ fontWeight: "bold" }}>
                TOTAL
              </TableCell>

    
       
       
                  {colsSubTotal.map((column) => {
                    const value = contentTotal[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={column.class}
                      ><strong>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}</strong>
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
