import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/styles";
import "./TableStyle.css";
import { greenColor, redColor } from "utils/helper";
import { Button, Popover } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
const useStyles = makeStyles({
  stickyActionsColumn: {
    "& table:first-child": {
      "& tr": {
        "& td:first-child, th:first-child": {
          backgroundColor: "white",
          position: "sticky",
          left: 0,
          zIndex: 999,
        },
        "& th:first-child": {
          zIndex: 9999,
        },
      },
    },
  },
  colorGreen: {
    color: greenColor,
  },
  colorRed: {
    color: redColor,
  },
});

export default function MaterialTable({
  content,
  contentTotal,
  columns,
  columnsSubTotal,
  groups,
  onDoubleClick = (row) => {},
}) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer className={classes.stickyActionsColumn}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="tableRowBorder">
              {groups.map((column, index) => {
                return (
                  <TableCell
                    align="center"
                    colSpan={column.colSpan}
                    sx={{ fontWeight: "bold" }}
                    key={index}
                    className={column.className}
                  >
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
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  onDoubleClick={(e) => onDoubleClick(row)}
                >
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
                        <span
                          className={
                            column.numeric
                              ? value > 0
                                ? classes.colorGreen
                                : value < 0
                                ? classes.colorRed
                                : ""
                              : ""
                          }
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}{" "}
                        </span>
                        {value2
                          ? column.format && typeof value === "number"
                            ? column.format(value2)
                            : ` - ${value2}`
                          : ""}
                        <span style={{ float: "right" }}>
                          {column.button && (
                            <>
                              <Button variant="contained" onClick={handleClick}>
                                <MonetizationOnIcon />
                              </Button>
                              <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <TableContainer component={Paper}>
                                  <Table
                                    size="small"
                                    aria-label="a dense table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="right">
                                          Coste
                                        </TableCell>
                                        <TableCell align="right">
                                          Presupuesto
                                        </TableCell>
                                        <TableCell align="right">
                                          Coste R
                                        </TableCell>
                                        <TableCell align="right">
                                          Coste Medi
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell align="right">
                                          "row.coste"
                                        </TableCell>
                                        <TableCell align="left">
                                          ow.pres
                                        </TableCell>
                                        <TableCell align="left">
                                          row.medicio
                                        </TableCell>
                                        <TableCell align="left">
                                          ow.costeR
                                        </TableCell>
                                        <TableCell align="left">
                                          row.costeMedi
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Popover>
                            </>
                          )}
                        </span>
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
                    align={column.numeric ? "right" : "left"}
                    className={column.className}
                  >
                    <strong>
                      {value === undefined && "---"}
                      <span
                        className={
                          column.numeric
                            ? value > 0
                              ? classes.colorGreen
                              : value < 0
                              ? classes.colorRed
                              : ""
                            : ""
                        }
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </span>
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
