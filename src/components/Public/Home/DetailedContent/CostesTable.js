import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(coste, pres, medicio, costeR, costeMedi) {
  return { coste, pres, medicio, costeR, costeMedi };
}

const rows = [
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
  createData('10.000€', '10.000€', '10.000€', '10.000€'),
];

const DenseTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Coste</TableCell>
            <TableCell align="right">Presupuesto</TableCell>
            <TableCell align="right">Coste R</TableCell>
            <TableCell align="right">Coste Medi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.coste}</TableCell>
              <TableCell align="left">{row.pres}</TableCell>
              <TableCell align="left">{row.medicio}</TableCell>
              <TableCell align="left">{row.costeR}</TableCell>
              <TableCell align="left">{row.costeMedi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;