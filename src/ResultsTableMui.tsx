import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function ResultsTableMui(props: UseHitsProps) {
  const { hits } = useHits(props);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>HP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits.map((hit) => (
            <TableRow
              key={hit.objectID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{hit.Make}</TableCell>
              <TableCell>{hit.Model}</TableCell>
              <TableCell>{USDollar.format(hit.Price)}</TableCell>
              <TableCell>{hit.Size}</TableCell>
              <TableCell>{hit.HP}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
