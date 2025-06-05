import { createClient } from '@supabase/supabase-js';
import { algoliasearch } from 'algoliasearch';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Algolia client
const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaApiKey = process.env.ALGOLIA_API_KEY;

if (!algoliaAppId || !algoliaApiKey) {
  throw new Error('Missing Algolia credentials in environment variables');
}

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);
const indexName = 'bandsaws';

const fieldMapping: { [key: string]: string } = {
  // Fields that need transformation
  amperage_110: 'amperage110',
  amperage_220_one_phase: 'amperage220OnePhase',
  amperage_220_three_phase: 'amperage220ThreePhase',
  amperage_440_three_phase: 'amperage440ThreePhase',
  blade_guides: 'bladeGuides',
  dust_ports: 'dustPorts',
  foot_brake: 'footBrake',
  image_url: 'imageURL',
  magnetic_switch: 'magneticSwitch',
  max_blade_width_inches: 'maxBladeWidthInches',
  max_cut_height_inches: 'maxCutHeightInches',
  max_cut_width_inches: 'maxCutWidthInches',
  min_blade_width_inches: 'minBladeWidthInches',
  net_weight_pounds: 'netWeightPounds',
  phase_power: 'phasePower',
  shipping_weight_pounds: 'shippingWeightPounds',
  algolia_object_id: 'algoliaObjectId',

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

async function main() {
  try {
    // 1. Clear all records from Algolia index
    console.log('Clearing Algolia index...');
    await algoliaClient.clearObjects({ indexName });
    console.log('Algolia index cleared successfully');

    // 2. Fetch all records from Supabase
    console.log('Fetching records from Supabase...');
    const { data: bandsaws, error: fetchError } = await supabase.from('bandsaws').select('*');

    if (fetchError) {
      throw fetchError;
    }

    if (!bandsaws || bandsaws.length === 0) {
      console.log('No records found in Supabase');
      return;
    }

    console.log(`Found ${bandsaws.length} records in Supabase`);

    // 3. Batch index records to Algolia
    console.log('Indexing records to Algolia...');
    const saveResponse = await algoliaClient.batch({
      indexName,
      batchWriteParams: {
        requests: bandsaws.map((bandsaw) => ({
          action: 'addObject',
          body: Object.fromEntries(Object.entries(bandsaw).map(([key, value]) => [fieldMapping[key] || key, value])),
        })),
      },
    });

    // Flatten all objectIDs from batch responses
    const objectIDs = saveResponse.objectIDs;

    // 4. Update Supabase records with Algolia object IDs
    console.log('Updating Supabase records with Algolia object IDs...');
    // Comment out the batch upsert approach
    // const updates = bandsaws.map((record, index) => ({
    //   id: record.id,
    //   algolia_object_id: objectIDs[index],
    // }));
    //
    // const { error: updateError } = await supabase.from('bandsaws').upsert(updates, {
    //   onConflict: 'id',
    //   defaultToNull: false,
    //   ignoreDuplicates: false,
    // });
    //
    // if (updateError) {
    //   throw updateError;
    // }

    // Update each record individually
    for (let i = 0; i < bandsaws.length; i++) {
      const { error: updateError } = await supabase.from('bandsaws').update({ algolia_object_id: objectIDs[i] }).eq('id', bandsaws[i].id);

      if (updateError) {
        throw updateError;
      }
    }

    console.log('Successfully completed import process');
  } catch (error) {
    console.error('Error during import process:', error);
    process.exit(1);
  }
}

main();
