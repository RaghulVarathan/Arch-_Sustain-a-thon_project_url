-- ==========================================================
-- EcoAudit Database Schema (PostgreSQL / Supabase)
-- ==========================================================

-- Enable UUID extension if supported
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FACTORIES
CREATE TABLE IF NOT EXISTS factories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    consent_order_id VARCHAR(100),
    contact_person VARCHAR(150),
    contact_email VARCHAR(150),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. MEASUREMENTS (Effluent & Environmental Sensor Data)
CREATE TABLE IF NOT EXISTS measurements (
    id BIGSERIAL PRIMARY KEY,
    factory_id VARCHAR(50) NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
    parameter_name VARCHAR(50) NOT NULL, -- e.g. 'pH', 'BOD', 'COD', 'TSS', 'DO', 'Temp', 'Flow'
    value DOUBLE PRECISION NOT NULL,
    unit VARCHAR(30) NOT NULL,           -- e.g. 'mg/L', 'pH', '°C', 'm3/day'
    measurement_date DATE NOT NULL,
    measurement_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. POWER CONSUMPTION (Operational & ETP Sub-meter Readings)
CREATE TABLE IF NOT EXISTS power_consumption (
    id BIGSERIAL PRIMARY KEY,
    factory_id VARCHAR(50) NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    total_kwh DOUBLE PRECISION NOT NULL,
    source VARCHAR(50) DEFAULT 'SMART_METER', -- e.g. 'SMART_METER', 'MANUAL_LOG', 'UTILITY_API'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ANALYSIS RESULTS (Forensic Detector Scores, Signals & Real-World Impact)
CREATE TABLE IF NOT EXISTS analysis_results (
    id BIGSERIAL PRIMARY KEY,
    factory_id VARCHAR(50) NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
    isolation_forest_score DOUBLE PRECISION NOT NULL,
    biological_pattern_score DOUBLE PRECISION NOT NULL,
    power_consumption_score DOUBLE PRECISION NOT NULL,
    overall_signal_score DOUBLE PRECISION NOT NULL,
    status VARCHAR(30) NOT NULL, -- 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'
    signals JSONB NOT NULL DEFAULT '[]'::jsonb,
    explanations JSONB NOT NULL DEFAULT '{}'::jsonb,
    impact_severity VARCHAR(30),
    impact_headline VARCHAR(500),
    affected_population BIGINT,
    river_oxygen_loss_pct DOUBLE PRECISION,
    oxygen_depletion_mg_l DOUBLE PRECISION,
    pollution_excess_kg_day DOUBLE PRECISION,
    recommended_action TEXT,
    receiving_waterbody VARCHAR(200),
    impact_assessment JSONB,
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. INVESTIGATIONS (Workflows initiated by Environmental Analysts)
CREATE TABLE IF NOT EXISTS investigations (
    id BIGSERIAL PRIMARY KEY,
    factory_id VARCHAR(50) NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
    priority VARCHAR(30) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'URGENT'
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'UNDER_REVIEW', 'VERIFIED', 'CLOSED'
    reason VARCHAR(500) NOT NULL,
    notes TEXT,
    assigned_to VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AUDIT TRAIL (Regulatory action logging)
CREATE TABLE IF NOT EXISTS audit_trail (
    id BIGSERIAL PRIMARY KEY,
    factory_id VARCHAR(50) REFERENCES factories(id) ON DELETE SET NULL,
    analysis_id BIGINT REFERENCES analysis_results(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    performed_by VARCHAR(150) DEFAULT 'SYSTEM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- INDEXES FOR PERFORMANCE
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_measurements_factory_date ON measurements(factory_id, measurement_date);
CREATE INDEX IF NOT EXISTS idx_measurements_param ON measurements(parameter_name);
CREATE INDEX IF NOT EXISTS idx_power_factory_timestamp ON power_consumption(factory_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_analysis_factory_computed ON analysis_results(factory_id, computed_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_signal_score ON analysis_results(overall_signal_score DESC);
CREATE INDEX IF NOT EXISTS idx_investigations_factory_status ON investigations(factory_id, status);
