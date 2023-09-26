import CssBaseline from '@mui/material/CssBaseline';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import { Body } from './Body';
import Header from './Header';

export function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Body />
    </>
  );
}
