import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DetailedTable = ({
  rootStyle = { width: "100%" },
  rows,
  columns,
  loading,
  getRowId = (row) => row.codi,
  autoHeight = true,
  autoWidth = true,
  disableColumnMenu = true,
  disableExtendRowFullWidth = true,
  disableInlineEdition = false,
  flexGrid,
  onCellEditCommit = () => {},
  onRowClick = () => {},
  onRowDoubleClick = () => {},
}) => {
  return (
    <div style={rootStyle}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns.map((column) => ({
              ...column,
              flex: flexGrid ? flexGrid : "",
              editable: disableInlineEdition ? false : column.editable,
            }))}
            getRowId={getRowId}
            loading={loading}
            disableColumnMenu={disableColumnMenu}
            autoHeight={autoHeight}
            autoWidth={autoWidth}
            disableExtendRowFullWidth={disableExtendRowFullWidth}
            style={{ backgroundColor: "white" }}
            classsName="bodyLabel"
            onCellEditCommit={onCellEditCommit}
            onRowClick={(e) => onRowClick(e.row)}
            onRowDoubleClick={(e) => onRowDoubleClick(e.row)}
          />
        </div>
      </div>
    </div>
  );
};
export default DetailedTable;
