import Grid from '@mui/material/Grid';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import {
  Configure,
  DynamicWidgets,
  InstantSearch,
  Pagination,
  SearchBox,
} from 'react-instantsearch';
import './Body.css';
import { Panel } from './Panel';
import RangeSliderMui from './components/RangeSliderMui';
import RefinementListMui from './components/RefinementListMui';
import ResultsTableMui from './components/ResultsTableMui';
import SortByMui from './components/SortByMui';

const searchClient = algoliasearch(
  'SYGTRQB84S',
  '2f4bea7736da46295fd879dc7641967a'
);

export function Body() {
  return (
    <Grid container>
      <InstantSearch
        searchClient={searchClient}
        indexName="bandsaws"
        insights={false}
        routing={true}
      >
        <Configure hitsPerPage={20} />
        <Grid item xs={2} sx={{ padding: '1rem' }}>
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
        </Grid>

        <Grid item xs={10}>
          <SortByMui
            items={[
              { label: 'Default', value: 'bandsaws' },
              { label: 'Price (asc)', value: 'bandsaws_price_asc' },
              { label: 'Price (desc)', value: 'bandsaws_price_desc' },
            ]}
          />
          <SearchBox placeholder="" />
          <ResultsTableMui />

          <div className="pagination">
            <Pagination />
          </div>
        </Grid>
      </InstantSearch>
    </Grid>
  );
}
