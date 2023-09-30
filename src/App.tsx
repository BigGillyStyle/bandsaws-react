import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Body } from './Body';
import Header from './Header';

export function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Body />
      </Box>
    </>
  );
}
