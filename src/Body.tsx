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
import RangeSliderMui from './RangeSliderMui';
import RefinementListMui from './RefinementListMui';
import ResultsTableMui from './ResultsTableMui';
import SortByMui from './SortByMui';

const searchClient = algoliasearch(
  'SYGTRQB84S',
  '2f4bea7736da46295fd879dc7641967a'
);

export function Body() {
  return (
    <Grid container>
      <InstantSearch
        searchClient={searchClient}
        indexName="bandsaws2"
        insights={false}
        routing={true}
      >
        <Configure hitsPerPage={8} />
        {/* <SortBy
          items={[
            { label: 'Default', value: 'bandsaws2' },
            { label: 'Price (asc)', value: 'bandsaws2_price_asc' },
            { label: 'Price (desc)', value: 'bandsaws2_price_desc' },
          ]}
        /> */}
        <Grid item xs={3}>
          <DynamicWidgets fallback={RefinementListMui}>
            <Panel header="Price">
              <RangeSliderMui attribute="Price" />
            </Panel>
            <Panel header="Size">
              <RangeSliderMui attribute="Size" />
            </Panel>
            <Panel header="Net Weight Pounds">
              <RangeSliderMui attribute="Net Weight Pounds" />
            </Panel>
            <Panel header="HP">
              <RangeSliderMui attribute="HP" />
            </Panel>
            <Panel header="Make">
              <RefinementListMui attribute="Make" />
            </Panel>
            <Panel header="Voltage">
              <RefinementListMui attribute="Voltage" />
            </Panel>
            <Panel header="Dust Ports">
              <RefinementListMui attribute="Dust Ports" />
            </Panel>
            <Panel header="Foot Brake">
              <RefinementListMui attribute="Foot Brake" />
            </Panel>
            <Panel header="Phase Power">
              <RefinementListMui attribute="Phase Power" />
            </Panel>
            <Panel header="Amperage 220">
              <RefinementListMui attribute="Amperage 220" />
            </Panel>
            <Panel header="Blade Guides">
              <RefinementListMui attribute="Blade Guides" />
            </Panel>
            <Panel header="Magnetic Switch">
              <RefinementListMui attribute="Magnetic Switch" />
            </Panel>
            <Panel header="Max Cut Width Inches">
              <RefinementListMui attribute="Max Cut Width Inches" />
            </Panel>
            <Panel header="Max Blade Size Inches">
              <RefinementListMui attribute="Max Blade Size Inches" />
            </Panel>
            <Panel header="Max Cut Height Inches">
              <RefinementListMui attribute="Max Cut Height Inches" />
            </Panel>
            <Panel header="Min Blade Size Inches">
              <RefinementListMui attribute="Min Blade Size Inches" />
            </Panel>
            <Panel header="Shipping Weight Pounds">
              <RefinementListMui attribute="Shipping Weight Pounds" />
            </Panel>
          </DynamicWidgets>
        </Grid>

        <Grid item xs={9}>
          <SortByMui
            items={[
              { label: 'Default', value: 'bandsaws2' },
              { label: 'Price (asc)', value: 'bandsaws2_price_asc' },
              { label: 'Price (desc)', value: 'bandsaws2_price_desc' },
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
