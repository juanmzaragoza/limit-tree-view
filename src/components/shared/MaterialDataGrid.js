import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DetailedTable = ({
  rootStyle = { height: 400, width: '100%' },
  rows,
  columns,
  getRowId = (row) => row.codi,
  disableColumnMenu = true,
  autoHeight = true,
  autoWidth = true,
  disableExtendRowFullWidth = true
}) => {
  return (
    <div style={rootStyle}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns.map(column => ({...column, flex: 1}))}
            getRowId={getRowId}
            disableColumnMenu={disableColumnMenu}
            autoHeight={autoHeight}
            autoWidth={autoWidth}
            disableExtendRowFullWidth={disableExtendRowFullWidth} />
        </div>
      </div>
    </div>
  );
}
export default DetailedTable;