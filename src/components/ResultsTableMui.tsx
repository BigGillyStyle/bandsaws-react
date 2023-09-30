import Link from '@mui/material/Link';
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Size (in.)</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>Net Weight (lb.)</TableCell>
              <TableCell>Shipping Weight (lb.)</TableCell>
              <TableCell>Max Cut Width (in.)</TableCell>
              <TableCell>Max Cut Height (in.)</TableCell>
              <TableCell>Min Blade Size (in.)</TableCell>
              <TableCell>Max Blade Size (in.)</TableCell>
              <TableCell>Blade Guides</TableCell>
              <TableCell>Foot Brake?</TableCell>
              <TableCell>Dust Ports</TableCell>
              <TableCell>Magnetic Switch?</TableCell>
              <TableCell>Voltage</TableCell>
              <TableCell>Phase Power</TableCell>
              <TableCell>Amps (110V)</TableCell>
              <TableCell>Amps (220V)</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits.map((hit) => (
              <TableRow
                key={hit.objectID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{hit.make}</TableCell>
                <TableCell>{hit.model}</TableCell>
                <TableCell>{USDollar.format(hit.price)}</TableCell>
                <TableCell>{hit.size}</TableCell>
                <TableCell>{hit.hp}</TableCell>
                <TableCell>{hit.netWeightPounds}</TableCell>
                <TableCell>{hit.shippingWeightPounds}</TableCell>
                <TableCell>{hit.maxCutWidthInches}</TableCell>
                <TableCell>{hit.maxCutHeightInches}</TableCell>
                <TableCell>{hit.minBladeSizeInches}</TableCell>
                <TableCell>{hit.maxBladeSizeInches}</TableCell>
                <TableCell>{hit.bladeGuides.join(', ')}</TableCell>
                <TableCell>{hit.footBrake ? 'Y' : 'N'}</TableCell>
                <TableCell>{hit.dustPorts}</TableCell>
                <TableCell>{hit.magneticSwitch ? 'Y' : 'N'}</TableCell>
                <TableCell>{hit.voltage}</TableCell>
                <TableCell>{hit.phasePower}</TableCell>
                <TableCell>{hit.amperage110}</TableCell>
                <TableCell>{hit.amperage220}</TableCell>
                <TableCell>
                  <Link href={hit.website} target="_blank">
                    link
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
