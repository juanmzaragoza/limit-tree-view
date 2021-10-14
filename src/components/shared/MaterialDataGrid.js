import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DetailedTable = ({
  rootStyle = {  width: '100%' },
  rows,
  columns,
  loading,
  getRowId = (row) => row.codi,
  autoHeight = true,
  autoWidth = true,
  onCellEditCommit = (params, event, details) => {},
  disableColumnMenu = true,
  disableExtendRowFullWidth = true,
  disableInlineEdition = false,
  flexGrid,
}) => {
  return (
    <div style={rootStyle}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1}}>
          <DataGrid
            rows={rows}
            columns={columns.map(column => ({
              ...column,
             flex: flexGrid ? flexGrid : "",
              editable: disableInlineEdition? false:column.editable
            }))}
            getRowId={getRowId}
            loading={loading}
            disableColumnMenu={disableColumnMenu}
            autoHeight={autoHeight}
            autoWidth={autoWidth}
            disableExtendRowFullWidth={disableExtendRowFullWidth}
            style={{ backgroundColor: "white"}} 
            classsName="bodyLabel"
            onCellEditCommit={onCellEditCommit}
          />
        </div>
      </div>
    </div>
  );
}
export default DetailedTable;