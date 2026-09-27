-- ==========================================================
-- EcoAudit Seed Data (Sample Industrial Monitoring Data)
-- ==========================================================

-- Insert Sample Factories
INSERT INTO factories (id, name, location, industry, consent_order_id, contact_person, contact_email) VALUES
('FAC-001', 'AeroChem Specialty Organics', 'Manali Industrial Area, Chennai', 'Chemical Manufacturing', 'CTO-CHE-2024-8841', 'R. Swaminathan', 'plant.env@aerochem.example.com'),
('FAC-002', 'Brahmaputra Pulp & Paper Ltd', 'Cachar Industrial Estate, Assam', 'Pulp & Paper', 'CTO-PAP-2023-1029', 'A. Sharma', 'compliance@brahmapulp.example.com'),
('FAC-003', 'Apex Tannery & Leatherworks', 'Ranipet SIPCOT, Tamil Nadu', 'Tannery / Leather', 'CTO-TAN-2024-4412', 'M. Khan', 'etp.head@apextan.example.com'),
('FAC-004', 'Vanguard Dyeing & Textile Mills', 'Tirupur Textile Hub, Tamil Nadu', 'Textiles & Dyeing', 'CTO-TEX-2024-9031', 'P. Murugan', 'audit@vanguardtex.example.com'),
('FAC-005', 'Godavari Bulk Drug Synthetics', 'Pashamylaram IDA, Hyderabad', 'Pharmaceuticals', 'CTO-PHA-2023-7721', 'Dr. V. Reddy', 'regulatory@godavaridrugs.example.com'),
('FAC-006', 'Kaveri Distilleries & Bio-Ethanol', 'Mandya District, Karnataka', 'Distillery & Fermentation', 'CTO-DIS-2024-3190', 'S. Gowda', 'operations@kaveribio.example.com')
ON CONFLICT (id) DO NOTHING;

-- Sample Initial Analysis Results with Impact Engine Assessment
INSERT INTO analysis_results (factory_id, isolation_forest_score, biological_pattern_score, power_consumption_score, overall_signal_score, status, signals, explanations, impact_severity, impact_headline, affected_population, river_oxygen_loss_pct, oxygen_depletion_mg_l, pollution_excess_kg_day, recommended_action, receiving_waterbody) VALUES
('FAC-001', 82.0, 71.0, 88.0, 80.5, 'HIGH', 
  '["Unusual multivariate BOD/COD ratio variance", "Inconsistent dissolved oxygen vs aeration pattern", "Sub-meter power deficit during peak discharge reporting"]'::jsonb,
  '{"isolation_forest": "Multivariate clustering observed near regulatory threshold bounds (BOD at 29.2-29.8 mg/L against 30.0 limit).", "biological_pattern": "Observed COD removal rate deviated by 38% from stoichiometric oxygen uptake reference curves.", "power_correlation": "ETP blower electricity consumption flatlined while reported hydraulic wastewater throughput increased by 42%."}'::jsonb,
  'HIGH', 'High – 62,000 people affected – 22% oxygen loss – High Priority Field Verification.', 62000, 22.5, 1.66, 412.0,
  'Issue statutory 48-hour data clarification notice. Verify continuous effluent DO probes and inspect downstream municipal abstraction point.', 'Kosasthalaiyar River Reach - Basin 3A'),
('FAC-003', 89.0, 84.0, 91.0, 88.1, 'CRITICAL',
  '["Repetitive identical TSS values across shift logs", "Biological kinetics inconsistent with aeration tank temperature", "Effluent volume reported without corresponding pump power draw"]'::jsonb,
  '{"isolation_forest": "Zero variance detected across consecutive 72-hour TSS logs at exactly 45.0 mg/L.", "biological_pattern": "Secondary clarifier digestion kinetics fail standard Arrhenius temperature dependence.", "power_correlation": "Negative correlation (r = -0.68) between primary pump kWh and reported cubic meter discharge."}'::jsonb,
  'CRITICAL', 'Critical – 85,000 people affected – 28% oxygen loss – Investigate Immediately.', 85000, 28.0, 2.02, 676.4,
  'Deploy rapid mobile water quality inspection team to Palar River Basin (River Km 3.5 intake). Initiate unannounced physical audit of secondary clarifier and power sub-meter.', 'Palar River Basin - Sub-reach 7'),
('FAC-004', 45.0, 52.0, 48.0, 48.0, 'MODERATE',
  '["Occasional diurnal timing deviations in pH reporting", "Mild seasonal temperature lag"]'::jsonb,
  '{"isolation_forest": "Slight clustering during weekend shift handovers.", "biological_pattern": "Biological treatment kinetics within expected parameters.", "power_correlation": "Minor lag in variable frequency drive response curve."}'::jsonb,
  'MODERATE', 'Moderate – 38,000 people affected – 12% oxygen loss – Scheduled Verification.', 38000, 12.0, 0.82, 145.0,
  'Schedule routine sensor calibration check during upcoming weekly compliance cycle.', 'Noyyal River - Tirupur Downstream'),
('FAC-002', 12.0, 18.0, 15.0, 14.7, 'LOW',
  '["Stable biological kinetics", "Normal power-to-throughput correlation"]'::jsonb,
  '{"isolation_forest": "All effluent parameters follow standard stochastic distribution.", "biological_pattern": "Aeration basin kinetics match pilot empirical calibration curve (R² = 0.94).", "power_correlation": "Strong positive correlation (r = 0.91) between aeration wattage and organic loading."}'::jsonb,
  'LOW', 'Low Impact – Baseline Assimilative Capacity Preserved (0 downstream risk) – Routine Monitoring.', 0, 2.1, 0.17, 0.0,
  'Maintain continuous automated telemetry surveillance.', 'Brahmaputra Tributary - Reach C4')
ON CONFLICT DO NOTHING;

-- Sample Initial Investigation
INSERT INTO investigations (factory_id, priority, status, reason, notes, assigned_to) VALUES
('FAC-003', 'HIGH', 'UNDER_REVIEW', 'Zero-variance TSS reporting and inverse power-to-discharge correlation requiring physical sensor audit', 'Preliminary review indicates potential sensor bypass or calibration lock. Field inspection scheduled.', 'Officer K. Venkatesh'),
('FAC-001', 'MEDIUM', 'PENDING', 'Power deficit during high-volume discharge periods', 'Requested sub-meter utility logs from State Electricity Board.', 'Analyst S. Priya')
ON CONFLICT DO NOTHING;
