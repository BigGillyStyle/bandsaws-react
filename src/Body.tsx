import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import {
  Configure,
  DynamicWidgets,
  InstantSearch,
  Pagination,
} from 'react-instantsearch';
import './Body.css';
import { Panel } from './Panel';
import RangeSliderMui from './components/RangeSliderMui';
import RefinementListMui from './components/RefinementListMui';
import ResultsTableMui from './components/ResultsTableMui';

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
      <Configure hitsPerPage={20} />
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
          <Panel header="Price">
            <RangeSliderMui attribute="price" />
          </Panel>
          <Panel header="Size">
            <RangeSliderMui attribute="size" />
          </Panel>
          <Panel header="Net Weight Pounds">
            <RangeSliderMui attribute="netWeightPounds" />
          </Panel>
          <Panel header="HP">
            <RangeSliderMui attribute="hp" />
          </Panel>
          <Panel header="Make">
            <RefinementListMui attribute="make" />
          </Panel>
          <Panel header="Voltage">
            <RefinementListMui attribute="voltage" />
          </Panel>
          <Panel header="Dust Ports">
            <RefinementListMui attribute="dustPorts" />
          </Panel>
          <Panel header="Foot Brake">
            <RefinementListMui attribute="footBrake" />
          </Panel>
          <Panel header="Phase Power">
            <RefinementListMui attribute="phasePower" />
          </Panel>
          <Panel header="Amperage 220">
            <RefinementListMui attribute="amperage220" />
          </Panel>
          <Panel header="Blade Guides">
            <RefinementListMui attribute="bladeGuides" />
          </Panel>
          <Panel header="Magnetic Switch">
            <RefinementListMui attribute="magneticSwitch" />
          </Panel>
          <Panel header="Max Cut Width Inches">
            <RefinementListMui attribute="maxCutWidthInches" />
          </Panel>
          <Panel header="Max Blade Size Inches">
            <RefinementListMui attribute="maxBladeSizeInches" />
          </Panel>
          <Panel header="Max Cut Height Inches">
            <RefinementListMui attribute="maxCutHeightInches" />
          </Panel>
          <Panel header="Min Blade Size Inches">
            <RefinementListMui attribute="minBladeSizeInches" />
          </Panel>
          <Panel header="Shipping Weight Pounds">
            <RefinementListMui attribute="shippingWeightPounds" />
          </Panel>
        </DynamicWidgets>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/* <SortByMui
            items={[
              { label: 'Default', value: 'bandsaws' },
              { label: 'Price (asc)', value: 'bandsaws_price_asc' },
              { label: 'Price (desc)', value: 'bandsaws_price_desc' },
            ]}
          />
          <SearchBox placeholder="" /> */}
        <Toolbar />
        <ResultsTableMui />

        <div className="pagination">
          <Pagination />
        </div>
      </Box>
    </InstantSearch>
  );
}
