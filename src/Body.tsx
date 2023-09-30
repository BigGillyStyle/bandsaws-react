import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import { Configure, DynamicWidgets, InstantSearch } from 'react-instantsearch';
import './Body.css';
import { PanelMui } from './components/PanelMui';
import RangeSliderMui from './components/RangeSliderMui';
import RefinementListMui from './components/RefinementListMui';
import ResultsDataGridMui from './components/ResultsDataGridMui';

const searchClient = algoliasearch(
  'SYGTRQB84S',
  '2f4bea7736da46295fd879dc7641967a'
);
const drawerWidth = 240;

export function Body() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="bandsaws"
      insights={false}
      routing={true}
    >
      <Configure hitsPerPage={1000} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            p: '1rem',
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
          <PanelMui header="Net Weight Pounds">
            <RangeSliderMui attribute="netWeightPounds" />
          </PanelMui>
          <PanelMui header="HP">
            <RangeSliderMui attribute="hp" />
          </PanelMui>
          <PanelMui header="Make">
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
          <PanelMui header="Amperage 220">
            <RefinementListMui attribute="amperage220" />
          </PanelMui>
          <PanelMui header="Blade Guides">
            <RefinementListMui attribute="bladeGuides" />
          </PanelMui>
          <PanelMui header="Magnetic Switch">
            <RefinementListMui attribute="magneticSwitch" />
          </PanelMui>
          <PanelMui header="Max Cut Width Inches">
            <RefinementListMui attribute="maxCutWidthInches" />
          </PanelMui>
          <PanelMui header="Max Blade Size Inches">
            <RefinementListMui attribute="maxBladeSizeInches" />
          </PanelMui>
          <PanelMui header="Max Cut Height Inches">
            <RefinementListMui attribute="maxCutHeightInches" />
          </PanelMui>
          <PanelMui header="Min Blade Size Inches">
            <RefinementListMui attribute="minBladeSizeInches" />
          </PanelMui>
          <PanelMui header="Shipping Weight Pounds">
            <RefinementListMui attribute="shippingWeightPounds" />
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
