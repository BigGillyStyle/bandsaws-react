import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Field name mapping from camelCase to snake_case
const fieldMapping: { [key: string]: string } = {
  // Fields that need transformation
  amperage110: 'amperage_110',
  amperage220OnePhase: 'amperage_220_one_phase',
  amperage220ThreePhase: 'amperage_220_three_phase',
  amperage440ThreePhase: 'amperage_440_three_phase',
  bladeGuides: 'blade_guides',
  dustPorts: 'dust_ports',
  footBrake: 'foot_brake',
  imageURL: 'image_url',
  magneticSwitch: 'magnetic_switch',
  maxBladeWidthInches: 'max_blade_width_inches',
  maxCutHeightInches: 'max_cut_height_inches',
  maxCutWidthInches: 'max_cut_width_inches',
  minBladeWidthInches: 'min_blade_width_inches',
  netWeightPounds: 'net_weight_pounds',
  phasePower: 'phase_power',
  shippingWeightPounds: 'shipping_weight_pounds',
  algoliaObjectId: 'algolia_object_id',

  // Fields that don't need transformation (already match)
  id: 'id',
  make: 'make',
  model: 'model',
  size: 'size',
  price: 'price',
  hp: 'hp',
  voltage: 'voltage',
  website: 'website',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

function mapFieldsToSnakeCase(data: any[]): any[] {
  return data.map((item) => {
    const mappedItem: any = {};
    for (const [key, value] of Object.entries(item)) {
      const mappedKey = fieldMapping[key] || key;
      mappedItem[mappedKey] = value;
    }
    return mappedItem;
  });
}

async function importBandsaws() {
  try {
    // Read the JSON file
    const jsonPath = join(__dirname, 'bandsaws.json');
    const jsonData = readFileSync(jsonPath, 'utf-8');
    const bandsaws = JSON.parse(jsonData);

    // Map the field names to snake_case
    const mappedBandsaws = mapFieldsToSnakeCase(bandsaws);

    // Clear existing data
    console.log('Clearing existing data...');
    const { error: deleteError } = await supabase.from('bandsaws').delete().neq('id', 0); // This will delete all rows

    if (deleteError) {
      throw deleteError;
    }
    console.log('Existing data cleared successfully');

    // Insert new data
    console.log('Importing new data...');
    const { error: insertError } = await supabase.from('bandsaws').insert(mappedBandsaws);

    if (insertError) {
      throw insertError;
    }

    console.log('Data import completed successfully');
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
}

// Run the import
importBandsaws();
