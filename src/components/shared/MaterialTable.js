import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";






export default function MaterialTable({ content, contentTotal , columns, columnsSubTotal, groups,  onDoubleClick = (row) => {},}) {


  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="tableRowBorder">
              <TableCell align="center" colSpan={2}></TableCell>
              {groups.map((column, index) => {
                    
                    return (
                      <TableCell align="center" colSpan={column.colSpan} sx={{ fontWeight: "bold" }} key={index}>
                      {column.label}
                    </TableCell>
                    );
              })}
             
            
            </TableRow>
            <TableRow sx={{}}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
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
            {content.map((row,index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}   onDoubleClick={(e) => onDoubleClick(row)}>
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
