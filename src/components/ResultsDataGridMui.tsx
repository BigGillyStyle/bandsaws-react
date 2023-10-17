import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import * as React from 'react';
import { UseHitsProps, useHits } from 'react-instantsearch';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: GridColDef[] = [
  { field: 'make', headerName: 'Manufacturer', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return '';
      }
      return USDollar.format(params.value);
    },
  },
  { field: 'size', headerName: 'Size (in.)', type: 'number' },
  { field: 'hp', headerName: 'HP', type: 'number', width: 75 },
  {
    field: 'netWeightPounds',
    headerName: 'Net Weight (lb.)',
    type: 'number',
    width: 150,
  },
  {
    field: 'shippingWeightPounds',
    headerName: 'Shipping Weight (lb.)',
    type: 'number',
    width: 150,
  },
  {
    field: 'maxCutWidthInches',
    headerName: 'Max Cut Width (in.)',
    type: 'number',
    width: 150,
  },
  {
    field: 'maxCutHeightInches',
    headerName: 'Max Cut Height (in.)',
    type: 'number',
    width: 150,
  },
  {
    field: 'minBladeWidthInches',
    headerName: 'Min Blade Size (in.)',
    type: 'number',
    width: 150,
  },
  {
    field: 'maxBladeWidthInches',
    headerName: 'Max Blade Size (in.)',
    type: 'number',
    width: 150,
  },
  { field: 'footBrake', headerName: 'Foot Brake?', type: 'boolean' },
  { field: 'dustPorts', headerName: 'Dust Ports', type: 'number' },
  {
    field: 'magneticSwitch',
    headerName: 'Magnetic Switch?',
    type: 'boolean',
    width: 150,
  },
  { field: 'voltage', headerName: 'Voltage', type: 'number', width: 75 },
  { field: 'phasePower', headerName: 'Phase Power', type: 'number' },
  { field: 'amperage110', headerName: 'Amps (110V)', type: 'number' },
  {
    field: 'amperage220OnePhase',
    headerName: 'Amps (220V 1PH)',
    type: 'number',
  },
  {
    field: 'amperage220ThreePhase',
    headerName: 'Amps (220V 3PH)',
    type: 'number',
  },
  { field: 'bladeGuides', headerName: 'Blade Guides', width: 175 },
  {
    field: 'website',
    headerName: 'Website',
    renderCell: (params: GridRenderCellParams<any, string>) => {
      if (params.value == null) {
        return '';
      }
      return (
        <Link href={params.value} target="_blank">
          link
        </Link>
      );
    },
  },
];

const getRowId = (row: any) => row.objectID;

export default function ResultsDataGridMui(props: UseHitsProps) {
  const { hits } = useHits(props);

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <DataGrid rows={hits} columns={columns} rowHeight={30} getRowId={getRowId} disableRowSelectionOnClick />
    </Box>
  );
}
