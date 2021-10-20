import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/styles";

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
import EuroIcon from "@mui/icons-material/Euro";
import SpeedIcon from "@mui/icons-material/Speed";

import { loadCostes } from "redux/partida";
import { selectPartida, updatePartida, loadData } from "redux/unit-control";
import { getCost, getIsLoading } from "redux/partida/selectors";
import { getPartidaInfo, getUnitControl } from "redux/unit-control/selectors";

import { greenColor, redColor } from "utils/helper";

import DialogCostes from "./DialogCostes";
import DialogMediciones from "./DialogMediciones";

import "./TableStyle.css";

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
  partidaInfo,
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
    actions.selectPartida({ ids: idRow });
    setOpenMediciones(true);
  };

  const handleUpdateMediciones = async (id, dataMedicion) => {
    dataMedicion.map((data) => {
      if (data.value !== undefined) {
        partidaInfo[data.field] = data.value;
      }
    });

    try {
      await actions.updatePartida({ id, data: partidaInfo });
      actions.loadData({ id: unitControl.id });
      actions.selectPartida({ ids: partidaInfo.id });
      setOpenMediciones(false);
      // update related data
    } catch (e) {
      // handle errors
    }
  };

  const renderDialogCostes = React.useCallback(() => (
    <DialogCostes
      open={open}
      onClose={() => setOpen(false)}
      contentDialog={costs}
      loading={loading}
    />
  ),[open, costs, loading]);

  const renderDialogMediciones = React.useCallback(() => (
    <DialogMediciones
      open={openMediciones}
      onClose={() => setOpenMediciones(false)}
      contentDialog={partidaInfo}
      loading={loading}
      handleUpdateMediciones={handleUpdateMediciones}
    />
  ),[openMediciones, loading, partidaInfo]);

  return loadingTable ? (
    <Stack sx={{ color: "grey.500", alignItems: "center", marginTop: "130px" }}>
      <CircularProgress color="inherit" />
    </Stack>
  ) : (
    <Paper sx={{ width: "100%" }}>
      {content.length > 0 && (
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
                          {column.buttonMedicion && (
                            <React.Fragment>
                              <Tooltip title="Mediciones" arrow>
                                <IconButton
                                  aria-label="mediciones"
                                  onClick={() => handleClickMediciones(row.id)}
                                  color={"info"}
                                  sx={{ padding: 0 }}
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
                                  sx={{ padding: 0, mr: 1 }}
                                  onClick={() => handleClick(row.id)}
                                  color={"info"}
                                >
                                  <EuroIcon />
                                </IconButton>
                              </Tooltip>
                            </React.Fragment>
                          )}
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
      )}
      {renderDialogCostes()}
      {renderDialogMediciones()}
    </Paper>
  );
};

const mapStateToProps = (state, props) => {
  return {
    costs: getCost(state),
    loading: getIsLoading(state),
    partidaInfo: getPartidaInfo(state),
    unitControl: getUnitControl(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadCost: bindActionCreators(loadCostes, dispatch),
    selectPartida: bindActionCreators(selectPartida, dispatch),
    updatePartida: bindActionCreators(updatePartida, dispatch),
    loadData: bindActionCreators(loadData, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(MaterialTable);
export default component;
