# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React-based bandsaw comparison tool built with Algolia InstantSearch, Material-UI components, and Parcel bundler. The application allows users to search, filter, and compare bandsaw specifications using a data grid interface with multiple refinement options.

## Common Commands

### Development
- `npm install` - Install dependencies
- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run clean` - Clean dist and cache directories

### Data Management
- `npm run import-data-to-db` - Import bandsaw data to Supabase database
- `npm run import-data-to-algolia` - Import data from Supabase to Algolia search index

## Architecture Overview

### Core Structure
- **Frontend**: React 19 with TypeScript, using Material-UI for components
- **Search**: Algolia InstantSearch with react-instantsearch hooks and components
- **Build Tool**: Parcel 2 with ES modules support
- **Data Sources**: Supabase (PostgreSQL) for data storage, Algolia for search indexing

### Key Components Architecture

**App Structure (`src/App.tsx`)**:
- Uses Material-UI's Box layout with CssBaseline
- Contains Header (AppBar) and Body (main content area)

**Search Interface (`src/Body.tsx`)**:
- Wrapped in InstantSearch provider with routing enabled
- Left sidebar drawer (270px width) contains all refinement widgets
- Main content area displays results in a data grid
- Uses DynamicWidgets with fallback to RefinementListMui
- Configured for 1000 hits per page

**Data Grid (`src/components/ResultsDataGridMui.tsx`)**:
- Material-UI DataGrid with comprehensive column definitions
- Custom row styling with alternating colors
- Price formatting with USD currency display
- External website links in dedicated column
- Custom row ID using Algolia's objectID

### Data Flow
1. **Import Flow**: JSON data → Supabase (snake_case) → Algolia (camelCase)
2. **Search Flow**: User input → Algolia search → InstantSearch widgets → DataGrid results
3. **Field Mapping**: Automatic transformation between database snake_case and frontend camelCase

### Component Types
- **RangeSliderMui**: For numeric range filtering (price, weight, dimensions)
- **RefinementListMui**: For categorical filtering (manufacturer, voltage, features)
- **PanelMui**: Wrapper component for organizing filter sections
- **ResultsDataGridMui**: Main results display with sortable columns

### Environment Configuration
Requires `.env` file with:
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` for database operations
- `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` for search functionality

### Data Import Scripts
- `data/import-bandsaws-to-db.ts`: Clears and imports JSON data to Supabase with field name transformation
- `data/import-bandsaws-to-algolia.ts`: Syncs Supabase data to Algolia index with reverse field mapping

## Key Development Patterns

### Field Naming Convention
The codebase maintains two naming conventions:
- **Database (Supabase)**: snake_case (e.g., `net_weight_pounds`)
- **Frontend/Algolia**: camelCase (e.g., `netWeightPounds`)

Transformation is handled in import scripts with comprehensive field mapping objects.

### Material-UI Integration
- Uses emotion-based styling with sx props
- Custom theme integration through CssBaseline
- Consistent drawer width defined in `constants.ts` (270px)
- DataGrid customization through CSS classes and row functions

### InstantSearch Implementation
- Routing enabled for URL state persistence
- High hit count (1000) for comprehensive results
- DynamicWidgets pattern allows for flexible filter UI
- Custom components wrap InstantSearch hooks for Material-UI integration

### TypeScript Usage
- ES modules with `"type": "module"` in package.json
- tsx for Node.js script execution
- React 19 types with strict component typing
