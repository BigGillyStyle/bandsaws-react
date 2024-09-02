import { searchClient as algoliasearch } from '@algolia/client-search';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Configure, DynamicWidgets, InstantSearch } from 'react-instantsearch';
import './Body.css';
import { PanelMui } from './components/PanelMui';
import RangeSliderMui from './components/RangeSliderMui';
import RefinementListMui from './components/RefinementListMui';
import ResultsDataGridMui from './components/ResultsDataGridMui';
import { drawerWidth } from './constants';

const searchClient = algoliasearch('SYGTRQB84S', '2f4bea7736da46295fd879dc7641967a');

export function Body() {
  return (
    <InstantSearch searchClient={searchClient} indexName="bandsaws" insights={false} routing={true}>
      <Configure hitsPerPage={1000} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            p: '2rem',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <DynamicWidgets fallback={RefinementListMui}>
          <PanelMui header="Price">
            <RangeSliderMui attribute="price" />
          </PanelMui>
          <PanelMui header="Size">
            <RangeSliderMui attribute="size" />
          </PanelMui>
          <PanelMui header="HP">
            <RangeSliderMui attribute="hp" />
          </PanelMui>
          <PanelMui header="Net Weight (lb.)">
            <RangeSliderMui attribute="netWeightPounds" />
          </PanelMui>
          <PanelMui header="Max Cut Width (in.)">
            <RangeSliderMui attribute="maxCutWidthInches" />
          </PanelMui>
          <PanelMui header="Max Blade Size (in.)">
            <RangeSliderMui attribute="maxBladeWidthInches" />
          </PanelMui>
          <PanelMui header="Max Cut Height (in.)">
            <RangeSliderMui attribute="maxCutHeightInches" />
          </PanelMui>
          <PanelMui header="Min Blade Size (in.)">
            <RangeSliderMui attribute="minBladeWidthInches" />
          </PanelMui>
          <PanelMui header="Manufacturer">
            <RefinementListMui attribute="make" />
          </PanelMui>
          <PanelMui header="Voltage">
            <RefinementListMui attribute="voltage" />
          </PanelMui>
          <PanelMui header="Dust Ports">
            <RefinementListMui attribute="dustPorts" />
          </PanelMui>
          <PanelMui header="Foot Brake">
            <RefinementListMui attribute="footBrake" />
          </PanelMui>
          <PanelMui header="Phase Power">
            <RefinementListMui attribute="phasePower" />
          </PanelMui>
          <PanelMui header="Amps (110V)">
            <RangeSliderMui attribute="amperage110" />
          </PanelMui>
          <PanelMui header="Amps (220V 1PH)">
            <RangeSliderMui attribute="amperage220OnePhase" />
          </PanelMui>
          <PanelMui header="Amps (220V 3PH)">
            <RangeSliderMui attribute="amperage220ThreePhase" />
          </PanelMui>
          <PanelMui header="Blade Guides">
            <RefinementListMui attribute="bladeGuides" />
          </PanelMui>
          <PanelMui header="Magnetic Switch">
            <RefinementListMui attribute="magneticSwitch" />
          </PanelMui>
          <PanelMui header="Shipping Weight (lb.)">
            <RangeSliderMui attribute="shippingWeightPounds" />
          </PanelMui>
        </DynamicWidgets>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          maxHeight: '100vh',
        }}
      >
        <Toolbar />
        <ResultsDataGridMui />
      </Box>
    </InstantSearch>
  );
}
