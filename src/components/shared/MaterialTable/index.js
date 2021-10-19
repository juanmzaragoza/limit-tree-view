import * as React from "react";

import { makeStyles } from "@material-ui/styles";

import { greenColor, redColor } from "utils/helper";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  IconButton,
  Stack,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SpeedIcon from "@mui/icons-material/Speed";
import DialogCostes from "./DialogCostes";
import { loadCostes } from "redux/partida";
import { selectPartida, updatePartida, loadData } from "redux/unit-control";
import { getCost, getIsLoading } from "redux/partida/selectors";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DialogMediciones from "./DialogMediciones";
import { getPartidaInfo, getUnitControl } from "redux/unit-control/selectors";

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
  costs,
  loading,
  loadingTable,
  getPartidaInfo,
  unitControl,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openMediciones, setOpenMediciones] = React.useState(false);

  const handleClick = (idRow) => {
    actions.loadCost({ id: idRow });
    setOpen(true);
  };

  const handleClickMediciones = (idRow) => {
    const partida = actions.findPartida({ ids: idRow });

    setOpenMediciones(true);
  };

  const handleUpdateMediciones = async (id, dataMedicion) => {
    dataMedicion.map((data) => {
      if (data.value !== undefined) {
        getPartidaInfo[data.field] = data.value;
      }
    });

    try {
      await actions.updatePartida({ id, data: getPartidaInfo });
      actions.loadData({ id: unitControl.id });
      actions.findPartida({ ids: getPartidaInfo.id });
      setOpenMediciones(false);
      
      // update related data
    } catch (e) {
      // handle errors
    }
  };

  return loadingTable ? (
    <Stack sx={{ color: "grey.500", alignItems: "center", marginTop: "130px" }}>
      <CircularProgress color="inherit" />
    </Stack>
  ) : (
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
                            column.colorValue
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
                          {column.buttonMedicion && (
                            <React.Fragment>
                              <Tooltip title="Mediciones" arrow>
                                <IconButton
                                  aria-label="medicones"
                                  component="span"
                                  onClick={() => handleClickMediciones(row.id)}
                                  color={"info"}
                                >
                                  <SpeedIcon />
                                </IconButton>
                              </Tooltip>
                            </React.Fragment>
                          )}
                          {column.button && (
                            <React.Fragment>
                              <Tooltip title="Costes Reales" arrow>
                                <IconButton
                                  aria-label="costes-reales"
                                  component="span"
                                  onClick={() => handleClick(row.id)}
                                  color={"info"}
                                >
                                  <MonetizationOnIcon />
                                </IconButton>
                              </Tooltip>
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
              contentDialog={costs}
              loading={loading}
            />
            <DialogMediciones
              open={openMediciones}
              onClose={() => setOpenMediciones(false)}
              contentDialog={getPartidaInfo}
              loading={loading}
              handleUpdateMediciones={handleUpdateMediciones}
         
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
                          column.colorValue
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

const mapStateToProps = (state, props) => {
  return {
    costs: getCost(state),
    loading: getIsLoading(state),
    getPartidaInfo: getPartidaInfo(state),
    unitControl: getUnitControl(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadCost: bindActionCreators(loadCostes, dispatch),
    findPartida: bindActionCreators(selectPartida, dispatch),
    updatePartida: bindActionCreators(updatePartida, dispatch),
    loadData: bindActionCreators(loadData, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(MaterialTable);
export default component;
