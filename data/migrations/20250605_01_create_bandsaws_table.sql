-- Drop the table if it exists
DROP TABLE IF EXISTS bandsaws;

-- Create the bandsaws table
CREATE TABLE bandsaws (
    id BIGSERIAL PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    size DECIMAL(5,2),
    price INTEGER,
    hp DECIMAL(4,2)[],
    voltage INTEGER[],
    phase_power INTEGER[],
    amperage_110 DECIMAL(5,2)[],
    amperage_220_one_phase DECIMAL(5,2)[],
    amperage_220_three_phase DECIMAL(5,2)[],
    amperage_440_three_phase DECIMAL(5,2)[],
    max_cut_height_inches DECIMAL(5,2),
    max_cut_width_inches DECIMAL(5,2),
    max_blade_width_inches DECIMAL(5,2),
    min_blade_width_inches DECIMAL(5,2),
    net_weight_pounds INTEGER,
    shipping_weight_pounds INTEGER,
    dust_ports INTEGER,
    blade_guides TEXT[],
    foot_brake BOOLEAN,
    magnetic_switch BOOLEAN,
    image_url TEXT,
    website TEXT,
    algolia_object_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on make and model for faster searches
CREATE INDEX idx_bandsaws_make_model ON bandsaws(make, model);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_bandsaws_updated_at
    BEFORE UPDATE ON bandsaws
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add a comment to the table
COMMENT ON TABLE bandsaws IS 'Stores information about various bandsaw models and their specifications';
