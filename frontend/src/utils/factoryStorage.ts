import { Factory } from '../types';

export const INITIAL_4_FACTORIES: Factory[] = [
  {
    id: 'FAC-003',
    name: 'Apex Tannery & Leatherworks',
    location: 'Ranipet SIPCOT, Tamil Nadu',
    industry: 'Tannery / Leather',
    consentOrderId: 'CTO-TAN-2024-4412',
    overallSignalScore: 88.1,
    status: 'CRITICAL',
    impactSeverity: 'CRITICAL',
    impactHeadline: 'Critical – 85,000 people affected – 28% oxygen loss – Investigate Immediately.',
    affectedPopulation: 85000,
    riverOxygenLossPct: 28.0,
    pollutionExcessKgDay: 676.4,
    activeSignalsCount: 4,
    lastAnalyzed: '2026-09-27 11:30',
    receivingWaterbody: 'Palar River Basin - Sub-reach 7',
    recommendedAction: 'Deploy rapid mobile water quality inspection team to Palar River Basin (River Km 3.5 intake). Initiate unannounced physical audit of secondary clarifier and power sub-meter.'
  },
  {
    id: 'FAC-001',
    name: 'AeroChem Specialty Organics',
    location: 'Manali Industrial Area, Chennai',
    industry: 'Chemical Manufacturing',
    consentOrderId: 'CTO-CHE-2024-8841',
    overallSignalScore: 80.5,
    status: 'HIGH',
    impactSeverity: 'HIGH',
    impactHeadline: 'High – 62,000 people affected – 22% oxygen loss – High Priority Field Verification.',
    affectedPopulation: 62000,
    riverOxygenLossPct: 22.5,
    pollutionExcessKgDay: 412.0,
    activeSignalsCount: 3,
    lastAnalyzed: '2026-09-27 10:45',
    receivingWaterbody: 'Kosasthalaiyar River Reach - Basin 3A',
    recommendedAction: 'Issue statutory 48-hour data clarification notice. Verify continuous effluent DO probes and inspect downstream municipal abstraction point.'
  },
  {
    id: 'FAC-004',
    name: 'Vanguard Dyeing & Textile Mills',
    location: 'Tirupur Textile Hub, Tamil Nadu',
    industry: 'Textiles & Dyeing',
    consentOrderId: 'CTO-TEX-2024-9031',
    overallSignalScore: 48.0,
    status: 'MODERATE',
    impactSeverity: 'MODERATE',
    impactHeadline: 'Moderate – 38,000 people affected – 12% oxygen loss – Scheduled Verification.',
    affectedPopulation: 38000,
    riverOxygenLossPct: 12.0,
    pollutionExcessKgDay: 145.0,
    activeSignalsCount: 1,
    lastAnalyzed: '2026-09-27 09:15',
    receivingWaterbody: 'Noyyal River - Tirupur Downstream',
    recommendedAction: 'Schedule routine sensor calibration check during upcoming weekly compliance cycle.'
  },
  {
    id: 'FAC-002',
    name: 'Brahmaputra Pulp & Paper Ltd',
    location: 'Cachar Industrial Estate, Assam',
    industry: 'Pulp & Paper',
    consentOrderId: 'CTO-PAP-2023-1029',
    overallSignalScore: 14.7,
    status: 'LOW',
    impactSeverity: 'LOW',
    impactHeadline: 'Low Impact – Baseline Assimilative Capacity Preserved (0 downstream risk) – Routine Monitoring.',
    affectedPopulation: 0,
    riverOxygenLossPct: 2.1,
    pollutionExcessKgDay: 0.0,
    activeSignalsCount: 0,
    lastAnalyzed: '2026-09-27 08:00',
    receivingWaterbody: 'Brahmaputra Tributary - Reach C4',
    recommendedAction: 'Maintain continuous automated telemetry surveillance.'
  }
];

const STORAGE_KEY = 'ecoaudit_stored_factories_v2';

export const getStoredFactories = (): Factory[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_4_FACTORIES));
      return INITIAL_4_FACTORIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to read stored factories:', e);
  }
  return INITIAL_4_FACTORIES;
};

export const saveFactory = (factory: Factory): Factory[] => {
  try {
    const current = getStoredFactories();
    // Check if exists, update or prepend
    const existingIndex = current.findIndex(f => f.id.toLowerCase() === factory.id.toLowerCase());
    let updated: Factory[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...factory };
    } else {
      updated = [factory, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('ecoaudit_factories_updated'));
    return updated;
  } catch (e) {
    console.error('Failed to save factory:', e);
    return getStoredFactories();
  }
};

export const resetStoredFactories = (): Factory[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_4_FACTORIES));
    window.dispatchEvent(new Event('ecoaudit_factories_updated'));
  } catch (e) {
    console.error('Failed to reset factories:', e);
  }
  return INITIAL_4_FACTORIES;
};
