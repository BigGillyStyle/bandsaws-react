import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import React from 'react';
import {
  Configure,
  DynamicWidgets,
  InstantSearch,
  Pagination,
  SearchBox,
  SortBy,
} from 'react-instantsearch';
import './App.css';
import { Panel } from './Panel';
import RangeSliderMui from './RangeSliderMui';
import RefinementListMui from './RefinementListMui';
import ResultsTableMui from './ResultsTableMui';

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
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
              <ResultsTableMui />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
