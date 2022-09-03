import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function DocDataTable({columns, rows}) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
