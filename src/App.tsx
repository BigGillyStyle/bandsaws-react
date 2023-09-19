import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import {
  Configure,
  DynamicWidgets,
  Highlight,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';
import { RangeSliderRadix } from './RangeSliderRadix';
import ResultsTable from './ResultsTable';

const searchClient = algoliasearch(
  'SYGTRQB84S',
  '2f4bea7736da46295fd879dc7641967a'
);

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">bandsaws-react</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="bandsaws2"
          insights={false}
          routing={true}
        >
          <Configure hitsPerPage={8} />
          <SortBy
            items={[
              { label: 'Default', value: 'bandsaws2' },
              { label: 'Price (asc)', value: 'bandsaws2_price_asc' },
              { label: 'Price (desc)', value: 'bandsaws2_price_desc' },
            ]}
          />
          <div className="search-panel">
            <div className="search-panel__filters">
              <DynamicWidgets fallback={RefinementList}>
                <Panel header="Price">
                  <RangeSliderRadix attribute="Price" />
                </Panel>
                <Panel header="Size">
                  <RangeSliderRadix attribute="Size" />
                </Panel>
                <Panel header="Net Weight Pounds">
                  <RangeSliderRadix attribute="Net Weight Pounds" />
                </Panel>
                <Panel header="HP">
                  <RangeSliderRadix attribute="HP" />
                </Panel>
                <Panel header="Make">
                  <RefinementList attribute="Make" />
                </Panel>
                <Panel header="Voltage">
                  <RefinementList attribute="Voltage" />
                </Panel>
                <Panel header="Dust Ports">
                  <RefinementList attribute="Dust Ports" />
                </Panel>
                <Panel header="Foot Brake">
                  <RefinementList attribute="Foot Brake" />
                </Panel>
                <Panel header="Phase Power">
                  <RefinementList attribute="Phase Power" />
                </Panel>
                <Panel header="Amperage 220">
                  <RefinementList attribute="Amperage 220" />
                </Panel>
                <Panel header="Blade Guides">
                  <RefinementList attribute="Blade Guides" />
                </Panel>
                <Panel header="Magnetic Switch">
                  <RefinementList attribute="Magnetic Switch" />
                </Panel>
                <Panel header="Max Cut Width Inches">
                  <RefinementList attribute="Max Cut Width Inches" />
                </Panel>
                <Panel header="Max Blade Size Inches">
                  <RefinementList attribute="Max Blade Size Inches" />
                </Panel>
                <Panel header="Max Cut Height Inches">
                  <RefinementList attribute="Max Cut Height Inches" />
                </Panel>
                <Panel header="Min Blade Size Inches">
                  <RefinementList attribute="Min Blade Size Inches" />
                </Panel>
                <Panel header="Shipping Weight Pounds">
                  <RefinementList attribute="Shipping Weight Pounds" />
                </Panel>
              </DynamicWidgets>
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
              {/* <Hits hitComponent={Hit} /> */}
              <ResultsTable />

              <div className="pagination">
                <Pagination />R
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <h1>
        <Highlight attribute="Model" hit={hit} />
      </h1>
      <p>
        <Highlight attribute="Make" hit={hit} />
      </p>
      <p>
        <Highlight attribute="Price" hit={hit} />
      </p>
      <p>
        <Highlight attribute="Website" hit={hit} />
      </p>
      <p>
        <Highlight attribute="Image URL" hit={hit} />
      </p>
    </article>
  );
}
