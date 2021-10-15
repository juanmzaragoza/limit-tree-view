import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/styles";
import "./TableStyle.css"
const useStyles = makeStyles({
  stickyActionsColumn: {
    '& table:first-child': {
      '& tr': {
        '& td:first-child, th:first-child': {
          backgroundColor: 'white',
          position: 'sticky',
          left: 0,
          zIndex: 999
        },
        '& th:first-child': {
          zIndex: 9999
        }
      }
    }
  },

})


export default function MaterialTable({ content, contentTotal , columns, columnsSubTotal, groups,  onDoubleClick = (row) => {},}) {
 const classes = useStyles();

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer className={classes.stickyActionsColumn}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="tableRowBorder">
         
              {groups.map((column, index) => {
                    
                    return (
                      <TableCell align="center" colSpan={column.colSpan} sx={{ fontWeight: "bold" }} key={index}  className={columns.className} >
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
                  className={columns.className}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map((row,index) => {
              return (
                <TableRow hover  tabIndex={-1} key={index}   onDoubleClick={(e) => onDoubleClick(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const value2 = row[column.id2];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        className={column.className}
                    
                      >
                        {value === undefined && "---"}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                        {value2 ? column.format && typeof value === "number"
                          ? column.format(value2)
                          : ` - ${value2}` : ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            <TableRow>
     
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
