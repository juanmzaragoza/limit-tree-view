import * as React from "react";

import { makeStyles } from "@material-ui/styles";

import { greenColor, redColor } from "utils/helper";
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  DialogActions,
  IconButton,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DialogCostes from "./DialogCostes";
import { loadCostes } from "redux/partida";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
          zIndex: 999,
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
  backDrop: {
    backgroundColor: "white",
    color: "white",
  },
});

const MaterialTable = ({
  content,
  contentTotal,
  columns,
  columnsSubTotal,
  groups,
  onDoubleClick = (row) => {},
  actions,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = (idRow) => {
    actions.loadCost({ id: idRow });
    setOpen(true);
  };

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
                            <React.Fragment>
                              <IconButton
                                aria-label="upload picture"
                                component="span"
                                onClick={() => handleClick(row.id)}
                                color={"info"}
                              >
                                <MonetizationOnIcon />
                              </IconButton>
                            </React.Fragment>
                          )}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            <DialogCostes
              open={open}
              onClose={() => setOpen(false)}
             
            />
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
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadCost: bindActionCreators(loadCostes, dispatch),
  };
  return { actions };
};

const component = connect(null, mapDispatchToProps)(MaterialTable);
export default component;
