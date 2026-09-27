import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StatusBadge } from '../components/common/StatusBadge';
import { AnalysisWorkflow, WorkflowStepItem } from '../components/common/AnalysisWorkflow';
import { AuditTimeline, AuditItem } from '../components/common/AuditTimeline';
import { ImpactEngineCard } from '../components/impact/ImpactEngineCard';
import { OxygenDepletionChart } from '../components/impact/OxygenDepletionChart';
import { ImpactAssessment } from '../types';
import { saveFactory } from '../utils/factoryStorage';
import {
  ArrowLeft,
  Activity,
  Cpu,
  Zap,
  Info,
  CheckCircle2,
  PlusCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

interface FactoryProfile {
  id: string;
  name: string;
  location: string;
  industry: string;
  consentOrderId: string;
  lastAnalyzed: string;
  overallSignalScore: number;
  status: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  impact: ImpactAssessment;
  detectors: {
    isolationForest: {
      score: number;
      title: string;
      observation: string;
      details: string;
      recommendation: string;
    };
    biologicalKinetics: {
      score: number;
      title: string;
      observation: string;
      details: string;
      recommendation: string;
    };
    powerCorrelation: {
      score: number;
      title: string;
      observation: string;
      details: string;
      recommendation: string;
    };
  };
  trendData: Array<{ time: string; bod: number; cod: number; powerKwh: number; volumeM3: number }>;
}

const FACTORY_REGISTRY: Record<string, FactoryProfile> = {
  'FAC-003': {
    id: 'FAC-003',
    name: 'Apex Tannery & Leatherworks',
    location: 'Ranipet SIPCOT, Tamil Nadu',
    industry: 'Tannery / Leather',
    consentOrderId: 'CTO-TAN-2024-4412',
    lastAnalyzed: '2026-09-27 11:30:00',
    overallSignalScore: 88.1,
    status: 'CRITICAL',
    impact: {
      impact_severity: 'CRITICAL',
      impact_headline: 'Critical – 85,000 people affected – 28% oxygen loss – Investigate Immediately.',
      affected_population: 85000,
      river_oxygen_loss_pct: 28.0,
      oxygen_depletion_mg_l: 2.02,
      pollution_excess_kg_day: 676.4,
      pollution_excess_pct: 521.9,
      receiving_waterbody: 'Palar River Basin - Sub-reach 7',
      baseline_do_mg_l: 7.2,
      critical_intakes: ['Ranipet Municipal Drinking Abstraction', '14 Downstream Agricultural Canals'],
      recommended_action: 'Deploy rapid mobile water quality inspection team to Palar River Basin (River Km 3.5 intake). Initiate unannounced physical audit of secondary clarifier and power sub-meter.',
      action_verb: 'Investigate Immediately',
      ecological_risks: [
        'Benthic Hypoxia: Dissolved oxygen breaches 4.0 mg/L threshold at Km 6.0.',
        'High Population Exposure: 85,000 residents rely on downstream riverbank borewells.',
        'Organic Overload: Estimated +676.4 kg/day excess COD/BOD discharge footprint.'
      ],
      oxygen_sag_curve: [
        { distanceKm: 0.0, baselineDoMgL: 7.2, impactedDoMgL: 6.97, dissolvedOxygenDeficit: 0.23, criticalThresholdMgL: 4.0 },
        { distanceKm: 1.5, baselineDoMgL: 7.2, impactedDoMgL: 6.05, dissolvedOxygenDeficit: 1.15, criticalThresholdMgL: 4.0 },
        { distanceKm: 3.5, baselineDoMgL: 7.2, impactedDoMgL: 4.95, dissolvedOxygenDeficit: 2.25, criticalThresholdMgL: 4.0 },
        { distanceKm: 6.0, baselineDoMgL: 7.2, impactedDoMgL: 3.82, dissolvedOxygenDeficit: 3.38, criticalThresholdMgL: 4.0 },
        { distanceKm: 10.0, baselineDoMgL: 7.2, impactedDoMgL: 4.45, dissolvedOxygenDeficit: 2.75, criticalThresholdMgL: 4.0 },
        { distanceKm: 15.0, baselineDoMgL: 7.2, impactedDoMgL: 5.60, dissolvedOxygenDeficit: 1.60, criticalThresholdMgL: 4.0 },
        { distanceKm: 20.0, baselineDoMgL: 7.2, impactedDoMgL: 6.45, dissolvedOxygenDeficit: 0.75, criticalThresholdMgL: 4.0 },
        { distanceKm: 25.0, baselineDoMgL: 7.2, impactedDoMgL: 6.95, dissolvedOxygenDeficit: 0.25, criticalThresholdMgL: 4.0 }
      ]
    },
    detectors: {
      isolationForest: {
        score: 89.0,
        title: 'Zero-Variance TSS & Parameter Clamping',
        observation: 'Zero Variance Detected (CV = 0.000)',
        details: 'TSS logged at exactly 45.0 mg/L continuously across 72 hours, indicating potential optical probe lock or synthetic simulation override.',
        recommendation: 'Request raw optical probe calibration records and check PLC telemetry memory registers.'
      },
      biologicalKinetics: {
        score: 84.0,
        title: 'Arrhenius Digestion Temperature Kinetics',
        observation: 'Secondary Clarifier Digestion Non-conformance',
        details: 'Secondary clarifier microbial digestion rates fail standard Arrhenius temperature dependence (divergence > 45%).',
        recommendation: 'Perform physical grab-sample split audit at aeration inlet and clarifier weir.'
      },
      powerCorrelation: {
        score: 91.0,
        title: 'ETP Pump Sub-Meter Correlation',
        observation: 'Inverse Power-to-Discharge Ratio (r = -0.68)',
        details: 'Negative correlation between primary pump kWh and reported effluent cubic meters.',
        recommendation: 'Deploy mobile sub-meter datalogger on secondary effluent pump feeder.'
      }
    },
    trendData: [
      { time: '00:00', bod: 45.0, cod: 220, powerKwh: 32, volumeM3: 95 },
      { time: '04:00', bod: 45.0, cod: 218, powerKwh: 31, volumeM3: 98 },
      { time: '08:00', bod: 45.0, cod: 222, powerKwh: 30, volumeM3: 140 },
      { time: '12:00', bod: 45.0, cod: 225, powerKwh: 29, volumeM3: 165 },
      { time: '16:00', bod: 45.0, cod: 220, powerKwh: 31, volumeM3: 170 },
      { time: '20:00', bod: 45.0, cod: 219, powerKwh: 32, volumeM3: 120 },
    ]
  },
  'FAC-001': {
    id: 'FAC-001',
    name: 'AeroChem Specialty Organics',
    location: 'Manali Industrial Area, Chennai',
    industry: 'Chemical Manufacturing',
    consentOrderId: 'CTO-CHE-2024-8841',
    lastAnalyzed: '2026-09-27 10:45:00',
    overallSignalScore: 80.5,
    status: 'HIGH',
    impact: {
      impact_severity: 'HIGH',
      impact_headline: 'High – 62,000 people affected – 22% oxygen loss – High Priority Field Verification.',
      affected_population: 62000,
      river_oxygen_loss_pct: 22.5,
      oxygen_depletion_mg_l: 1.66,
      pollution_excess_kg_day: 412.0,
      pollution_excess_pct: 390.0,
      receiving_waterbody: 'Kosasthalaiyar River Reach - Basin 3A',
      baseline_do_mg_l: 7.4,
      critical_intakes: ['Ennore Estuary Fishery Buffer', 'Minjur Aquifer Recharge Zone'],
      recommended_action: 'Issue statutory 48-hour data clarification notice. Verify continuous effluent DO probes and inspect downstream municipal abstraction point.',
      action_verb: 'High Priority Field Verification',
      ecological_risks: [
        'Estuary Buffer Stress: Inflow organic loading threatens brackish fishery nursery zone.',
        'Downstream Exposure: 62,000 inhabitants in peri-urban coastal wards.',
        'Aeration Deficit: +412 kg/day excess COD footprint during peak shifts.'
      ],
      oxygen_sag_curve: [
        { distanceKm: 0.0, baselineDoMgL: 7.4, impactedDoMgL: 7.20, dissolvedOxygenDeficit: 0.20, criticalThresholdMgL: 4.0 },
        { distanceKm: 1.5, baselineDoMgL: 7.4, impactedDoMgL: 6.60, dissolvedOxygenDeficit: 0.80, criticalThresholdMgL: 4.0 },
        { distanceKm: 3.5, baselineDoMgL: 7.4, impactedDoMgL: 5.74, dissolvedOxygenDeficit: 1.66, criticalThresholdMgL: 4.0 },
        { distanceKm: 6.0, baselineDoMgL: 7.4, impactedDoMgL: 5.20, dissolvedOxygenDeficit: 2.20, criticalThresholdMgL: 4.0 },
        { distanceKm: 10.0, baselineDoMgL: 7.4, impactedDoMgL: 5.80, dissolvedOxygenDeficit: 1.60, criticalThresholdMgL: 4.0 },
        { distanceKm: 15.0, baselineDoMgL: 7.4, impactedDoMgL: 6.50, dissolvedOxygenDeficit: 0.90, criticalThresholdMgL: 4.0 },
        { distanceKm: 20.0, baselineDoMgL: 7.4, impactedDoMgL: 7.00, dissolvedOxygenDeficit: 0.40, criticalThresholdMgL: 4.0 },
        { distanceKm: 25.0, baselineDoMgL: 7.4, impactedDoMgL: 7.30, dissolvedOxygenDeficit: 0.10, criticalThresholdMgL: 4.0 }
      ]
    },
    detectors: {
      isolationForest: {
        score: 82.0,
        title: 'Multivariate Density & Limit Clamping',
        observation: 'Artificial Boundary Clamping (CV = 0.014)',
        details: 'Continuous BOD values clustered tightly within 29.2–29.8 mg/L (immediately below statutory 30.0 limit).',
        recommendation: 'Request unedited raw optical probe calibration logs and verify PLC telemetry scaling blocks.'
      },
      biologicalKinetics: {
        score: 71.0,
        title: 'Stoichiometric Biological Degradation Kinetics',
        observation: 'Arrhenius Temperature Model Divergence',
        details: 'Reported COD reduction rate remains 88% constant during a 6°C drop in aeration tank liquor temperature.',
        recommendation: 'Perform physical grab-sample split audit at aeration inlet and secondary clarifier overflow.'
      },
      powerCorrelation: {
        score: 88.0,
        title: 'ETP Power vs Wastewater Volume Correlation',
        observation: 'Sub-meter Electricity Draw Deficit (r = -0.42)',
        details: 'Aeration blower energy draw flatlined at 42 kWh/h during a 42% surge in reported hydraulic volume discharge.',
        recommendation: 'Cross-reference main grid feeder smart-meter interval logs with the factory effluent flow meter.'
      }
    },
    trendData: [
      { time: '00:00', bod: 29.4, cod: 140, powerKwh: 42, volumeM3: 45 },
      { time: '04:00', bod: 29.5, cod: 138, powerKwh: 41, volumeM3: 44 },
      { time: '08:00', bod: 29.3, cod: 142, powerKwh: 43, volumeM3: 72 },
      { time: '12:00', bod: 29.6, cod: 145, powerKwh: 42, volumeM3: 85 },
      { time: '16:00', bod: 29.4, cod: 141, powerKwh: 42, volumeM3: 88 },
      { time: '20:00', bod: 29.5, cod: 139, powerKwh: 41, volumeM3: 65 },
    ]
  },
  'FAC-004': {
    id: 'FAC-004',
    name: 'Vanguard Dyeing & Textile Mills',
    location: 'Tirupur Textile Hub, Tamil Nadu',
    industry: 'Textiles & Dyeing',
    consentOrderId: 'CTO-TEX-2024-9031',
    lastAnalyzed: '2026-09-27 09:15:00',
    overallSignalScore: 48.0,
    status: 'MODERATE',
    impact: {
      impact_severity: 'MODERATE',
      impact_headline: 'Moderate – 38,000 people affected – 12% oxygen loss – Scheduled Verification.',
      affected_population: 38000,
      river_oxygen_loss_pct: 12.0,
      oxygen_depletion_mg_l: 0.82,
      pollution_excess_kg_day: 145.0,
      pollution_excess_pct: 110.0,
      receiving_waterbody: 'Noyyal River - Tirupur Downstream',
      baseline_do_mg_l: 6.8,
      critical_intakes: ['Orathupalayam Reservoir Inflow'],
      recommended_action: 'Schedule routine sensor calibration check during upcoming weekly compliance cycle. Monitor diurnal flow variations.',
      action_verb: 'Scheduled Verification',
      ecological_risks: [
        'Seasonal Inflow Dilution: Moderate assimilative stress during low seasonal river flow.',
        'Downstream Agro Impact: 38,000 population in irrigation canal command area.'
      ]
    },
    detectors: {
      isolationForest: {
        score: 45.0,
        title: 'Multivariate Density & Limit Clamping',
        observation: 'Mild Shift Handover Clustering',
        details: 'Minor distribution anomalies detected during weekend shift changeovers.',
        recommendation: 'Include in next scheduled routine audit cycle.'
      },
      biologicalKinetics: {
        score: 52.0,
        title: 'Biological Treatment Kinetics',
        observation: 'Conforming Arrhenius Curve',
        details: 'Kinetics within expected biological degradation tolerances.',
        recommendation: 'Maintain continuous data telemetry.'
      },
      powerCorrelation: {
        score: 48.0,
        title: 'Power Correlation',
        observation: 'Minor VFD Inverter Lag',
        details: 'Slight delay in power response curve during pump startup.',
        recommendation: 'Check variable frequency drive response logs.'
      }
    },
    trendData: [
      { time: '00:00', bod: 22.1, cod: 110, powerKwh: 38, volumeM3: 50 },
      { time: '04:00', bod: 23.4, cod: 115, powerKwh: 39, volumeM3: 52 },
      { time: '08:00', bod: 24.0, cod: 118, powerKwh: 45, volumeM3: 70 },
      { time: '12:00', bod: 25.1, cod: 122, powerKwh: 48, volumeM3: 78 },
      { time: '16:00', bod: 24.5, cod: 119, powerKwh: 46, volumeM3: 75 },
      { time: '20:00', bod: 23.0, cod: 112, powerKwh: 40, volumeM3: 55 },
    ]
  },
  'FAC-002': {
    id: 'FAC-002',
    name: 'Brahmaputra Pulp & Paper Ltd',
    location: 'Cachar Industrial Estate, Assam',
    industry: 'Pulp & Paper',
    consentOrderId: 'CTO-PAP-2023-1029',
    lastAnalyzed: '2026-09-27 08:30:00',
    overallSignalScore: 14.7,
    status: 'LOW',
    impact: {
      impact_severity: 'LOW',
      impact_headline: 'Low Impact – Baseline Assimilative Capacity Preserved (0 downstream risk) – Routine Monitoring.',
      affected_population: 0,
      river_oxygen_loss_pct: 2.1,
      oxygen_depletion_mg_l: 0.17,
      pollution_excess_kg_day: 0.0,
      pollution_excess_pct: 0.0,
      receiving_waterbody: 'Brahmaputra Tributary - Reach C4',
      baseline_do_mg_l: 8.2,
      critical_intakes: ['Cachar Rural Water Supply Zone'],
      recommended_action: 'Maintain continuous automated telemetry surveillance. No physical inspection required.',
      action_verb: 'Routine Monitoring',
      ecological_risks: [
        'Assimilative Buffer Robust: Receiving tributary maintains >95% dissolved oxygen saturation.'
      ]
    },
    detectors: {
      isolationForest: {
        score: 12.0,
        title: 'Multivariate Density Distribution',
        observation: 'Stochastic Natural Baseline',
        details: 'Effluent readings exhibit natural stochastic Gaussian distribution without threshold clamping.',
        recommendation: 'Maintain standard telemetry cycle.'
      },
      biologicalKinetics: {
        score: 18.0,
        title: 'Biological Treatment Kinetics',
        observation: 'Strong Arrhenius Calibration (R² = 0.94)',
        details: 'BOD/COD removal rate matches temperature kinetics model.',
        recommendation: 'No action needed.'
      },
      powerCorrelation: {
        score: 15.0,
        title: 'ETP Power Correlation',
        observation: 'Tight Power Coupling (r = 0.91)',
        details: 'Aeration blowers scale proportionally with organic loading.',
        recommendation: 'No action needed.'
      }
    },
    trendData: [
      { time: '00:00', bod: 18.2, cod: 95, powerKwh: 52, volumeM3: 60 },
      { time: '04:00', bod: 17.8, cod: 92, powerKwh: 50, volumeM3: 58 },
      { time: '08:00', bod: 20.4, cod: 105, powerKwh: 68, volumeM3: 85 },
      { time: '12:00', bod: 21.0, cod: 108, powerKwh: 72, volumeM3: 90 },
      { time: '16:00', bod: 19.5, cod: 102, powerKwh: 65, volumeM3: 80 },
      { time: '20:00', bod: 18.0, cod: 94, powerKwh: 54, volumeM3: 62 },
    ]
  }
};

const mockAuditTrail: AuditItem[] = [
  {
    id: 1,
    action: 'IMPACT_ENGINE_EVALUATION_COMPLETED',
    details: 'Streeter-Phelps oxygen sag and downstream community vulnerability computed. Assimilative loss calculated.',
    performedBy: 'EcoAudit Forensic Impact Engine',
    createdAt: '2026-09-27 11:30:15',
  },
  {
    id: 2,
    action: 'PIPELINE_ANALYSIS_COMPLETED',
    details: 'Forensic models evaluated. Verification priority formulated.',
    performedBy: 'EcoTrace AI Analytical Core',
    createdAt: '2026-09-27 11:30:00',
  },
  {
    id: 3,
    action: 'TELEMETRY_CSV_INGESTION',
    details: 'Received continuous effluent telemetry records from CPCB OCEMS data bridge.',
    performedBy: 'System Ingestion Bridge',
    createdAt: '2026-09-27 11:28:10',
  },
];

const completedWorkflowSteps: WorkflowStepItem[] = [
  { id: '1', name: 'Data Intake & Ingestion', description: '1,440 continuous rows parsed', status: 'COMPLETED', durationMs: 2000 },
  { id: '2', name: 'Structural & Range Validation', description: 'Schema valid; 1 minor gap warning imputed', status: 'WARNING', durationMs: 2000 },
  { id: '3', name: 'Feature Engineering & Alignment', description: 'Normalized rolling variance & delta metrics generated', status: 'COMPLETED', durationMs: 2000 },
  { id: '4', name: 'Isolation Forest Multivariate Detection', description: 'Detected boundary clamping near statutory limit', status: 'COMPLETED', durationMs: 2000 },
  { id: '5', name: 'Biological Treatment Kinetic Fit', description: 'Stoichiometric divergence from Arrhenius curve', status: 'COMPLETED', durationMs: 2000 },
  { id: '6', name: 'Power Consumption Correlation', description: 'Power draw flatline vs volume surge', status: 'COMPLETED', durationMs: 2000 },
  { id: '7', name: 'Real-World Impact Engine Assessment', description: 'Streeter-Phelps DO sag profile & population exposure computed', status: 'COMPLETED', durationMs: 2000 },
  { id: '8', name: 'Composite Priority & Directive Formulation', description: 'Executive Impact Headline & Targeted Protocol Dispatched', status: 'COMPLETED', durationMs: 2000 },
];

export const FactoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [investigationModalOpen, setInvestigationModalOpen] = useState(false);
  const [investigationCreated, setInvestigationCreated] = useState(false);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [reanalysisComplete, setReanalysisComplete] = useState(false);

  // Fallback to FAC-003 or FAC-001 or default
  const factory = (id && FACTORY_REGISTRY[id]) ? FACTORY_REGISTRY[id] : FACTORY_REGISTRY['FAC-003'];

  const handleReanalyze = () => {
    setIsReanalyzing(true);
    setReanalysisComplete(false);
    setTimeout(() => {
      setIsReanalyzing(false);
      setReanalysisComplete(true);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#1f2d25]">
        <div className="flex items-start gap-4">
          <Link
            to="/factories"
            className="p-2.5 rounded-lg border border-[#23332a] bg-[#101713] text-[#8ba497] hover:text-white hover:bg-[#15271e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-normal text-[#f4f2ed]">
                {factory.name}
              </h1>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-[#141d18] text-[#a8e6c4] border border-[#23332a]">
                {id || factory.id}
              </span>
            </div>
            <p className="text-xs text-[#8ba497] font-sans mt-1">
              {factory.location} • <span className="text-[#c4d4cc] font-medium">{factory.industry}</span> • Consent Order: <span className="font-mono text-[#a8e6c4]">{factory.consentOrderId}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReanalyze}
            disabled={isReanalyzing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#23332a] bg-[#101713] text-[#c4d4cc] text-xs font-mono hover:bg-[#141d18] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isReanalyzing ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-[#3ea876]" />
                <span>Re-Evaluating Models...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#3ea876]" />
                <span>Run Impact Engine</span>
              </>
            )}
          </button>

          <button
            onClick={() => setInvestigationModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white text-xs font-semibold shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Initiate Field Verification</span>
          </button>
        </div>
      </div>

      {reanalysisComplete && (
        <div className="p-3.5 rounded-xl bg-[#0d2116] border border-[#1b4731] text-[#a8e6c4] text-xs flex items-center justify-between font-mono">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3ea876]" />
            <span>Impact Engine evaluated: {factory.impact.impact_headline}</span>
          </span>
          <button
            onClick={() => setReanalysisComplete(false)}
            className="text-[#3ea876] underline font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Primary Highlight: REAL-WORLD IMPACT ENGINE DOSSIER CARD */}
      <ImpactEngineCard 
        impact={factory.impact}
        factoryName={factory.name}
        factoryId={factory.id}
        onActionClick={() => setInvestigationModalOpen(true)}
      />

      {/* 2. Statistical Anomaly vs Detector Scores Dossier Banner */}
      <section className="rounded-xl border border-[#1f2d25] bg-[#101713] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-2">
          <span className="font-mono text-[10px] text-[#789284] font-semibold uppercase tracking-wider">
            STATISTICAL FORENSIC ANOMALY SCORE
          </span>
          <div className="flex items-baseline gap-4">
            <div className="font-display text-4xl sm:text-5xl font-normal text-[#f4f2ed]">
              {factory.overallSignalScore}
              <span className="font-sans text-sm text-[#5d7367] font-normal"> / 100</span>
            </div>
            <StatusBadge status={factory.status} size="lg" />
          </div>
          <p className="text-xs text-[#9ab0a4] font-sans leading-relaxed pt-1">
            Aggregated statistical score cross-calibrated against multivariate density, biological kinetics, and power-to-flow coupling.
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#090d0b] p-4 rounded-xl border border-[#1a251f] grid grid-cols-3 gap-2 text-center">
          <div className="p-2">
            <p className="text-[10px] font-mono text-[#789284] uppercase">Multivariate (40%)</p>
            <p className="font-mono text-xl font-bold text-[#f4f2ed] mt-1">
              {factory.detectors.isolationForest.score}
            </p>
          </div>
          <div className="p-2 border-l border-[#1a251f]">
            <p className="text-[10px] font-mono text-[#789284] uppercase">Biological (30%)</p>
            <p className="font-mono text-xl font-bold text-[#f4f2ed] mt-1">
              {factory.detectors.biologicalKinetics.score}
            </p>
          </div>
          <div className="p-2 border-l border-[#1a251f]">
            <p className="text-[10px] font-mono text-[#789284] uppercase">Power Draw (30%)</p>
            <p className="font-mono text-xl font-bold text-[#f4f2ed] mt-1">
              {factory.detectors.powerCorrelation.score}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Streeter-Phelps Dissolved Oxygen Sag Curve */}
      <OxygenDepletionChart 
        data={factory.impact.oxygen_sag_curve}
        waterbodyName={factory.impact.receiving_waterbody}
        riverOxygenLossPct={factory.impact.river_oxygen_loss_pct}
      />

      {/* 4. The 3 Forensic Detectors Breakdown */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-normal text-[#f4f2ed]">
          Forensic Detector Dossier Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Detector 1 */}
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#1a251f]">
                <div className="flex items-center gap-1.5 text-xs text-[#3ea876] font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>DETECTOR 01</span>
                </div>
                <span className="font-mono font-bold text-xs text-[#f4f2ed]">
                  {factory.detectors.isolationForest.score}/100
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#f4f2ed]">
                {factory.detectors.isolationForest.title}
              </h3>
              <p className="text-[11px] font-mono text-[#ecc94b]">
                {factory.detectors.isolationForest.observation}
              </p>
              <p className="text-xs text-[#9ab0a4] font-sans leading-relaxed">
                {factory.detectors.isolationForest.details}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1a251f] text-[11px] text-[#789284] flex items-start gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#3ea876] flex-shrink-0 mt-0.5" />
              <span>{factory.detectors.isolationForest.recommendation}</span>
            </div>
          </div>

          {/* Detector 2 */}
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#1a251f]">
                <div className="flex items-center gap-1.5 text-xs text-[#3ea876] font-mono">
                  <Activity className="w-3.5 h-3.5" />
                  <span>DETECTOR 02</span>
                </div>
                <span className="font-mono font-bold text-xs text-[#f4f2ed]">
                  {factory.detectors.biologicalKinetics.score}/100
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#f4f2ed]">
                {factory.detectors.biologicalKinetics.title}
              </h3>
              <p className="text-[11px] font-mono text-[#ecc94b]">
                {factory.detectors.biologicalKinetics.observation}
              </p>
              <p className="text-xs text-[#9ab0a4] font-sans leading-relaxed">
                {factory.detectors.biologicalKinetics.details}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1a251f] text-[11px] text-[#789284] flex items-start gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#3ea876] flex-shrink-0 mt-0.5" />
              <span>{factory.detectors.biologicalKinetics.recommendation}</span>
            </div>
          </div>

          {/* Detector 3 */}
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#1a251f]">
                <div className="flex items-center gap-1.5 text-xs text-[#3ea876] font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>DETECTOR 03</span>
                </div>
                <span className="font-mono font-bold text-xs text-[#f4f2ed]">
                  {factory.detectors.powerCorrelation.score}/100
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#f4f2ed]">
                {factory.detectors.powerCorrelation.title}
              </h3>
              <p className="text-[11px] font-mono text-[#ecc94b]">
                {factory.detectors.powerCorrelation.observation}
              </p>
              <p className="text-xs text-[#9ab0a4] font-sans leading-relaxed">
                {factory.detectors.powerCorrelation.details}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1a251f] text-[11px] text-[#789284] flex items-start gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#3ea876] flex-shrink-0 mt-0.5" />
              <span>{factory.detectors.powerCorrelation.recommendation}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visible Analysis Workflow Pipeline */}
      <AnalysisWorkflow steps={completedWorkflowSteps} />

      {/* Forensic Telemetry Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pollution parameter trend */}
        <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 space-y-3">
          <div className="pb-3 border-b border-[#1a251f]">
            <h3 className="font-display text-lg font-normal text-[#f4f2ed]">
              Effluent Parameter Telemetry (mg/L)
            </h3>
            <p className="text-xs text-[#8ba497] font-sans mt-0.5">
              Clamping of reported parameters against statutory consent limits
            </p>
          </div>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={factory.trendData}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#18231c" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <YAxis tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d0b',
                    borderColor: '#23332a',
                    borderRadius: '8px',
                    color: '#f4f2ed',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '11px' }} />
                <ReferenceLine y={30} stroke="#be123c" strokeDasharray="3 3" label={{ value: '30 mg/L Statutory Limit', fill: '#fb7185', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                <Line
                  type="monotone"
                  dataKey="bod"
                  name="BOD (mg/L)"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#f43f5e' }}
                />
                <Line
                  type="monotone"
                  dataKey="cod"
                  name="COD (mg/L)"
                  stroke="#3ea876"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#3ea876' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Power vs Wastewater Volume */}
        <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 space-y-3">
          <div className="pb-3 border-b border-[#1a251f]">
            <h3 className="font-display text-lg font-normal text-[#f4f2ed]">
              ETP Power Draw vs Effluent Throughput
            </h3>
            <p className="text-xs text-[#8ba497] font-sans mt-0.5">
              Throughput surges without corresponding electrical power draw
            </p>
          </div>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={factory.trendData}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#18231c" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <Tooltip
                  cursor={{ stroke: '#2e4336', strokeDasharray: '2 2' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-[#2e4336] bg-[#090f0c] p-3 shadow-2xl font-mono text-xs space-y-1.5 min-w-[170px]">
                          <p className="font-bold text-[#f4f2ed] border-b border-[#1f2d25] pb-1 text-sm">
                            Time: {label}
                          </p>
                          <div className="flex items-center justify-between text-[#d97706]">
                            <span>Power Draw:</span>
                            <span className="font-bold text-[#fbbf24] ml-2">{payload[0]?.value} kWh/h</span>
                          </div>
                          <div className="flex items-center justify-between text-[#38bdf8]">
                            <span>Discharge Flow:</span>
                            <span className="font-bold text-white ml-2">{payload[1]?.value} m³/h</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '11px' }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="powerKwh"
                  name="Power Draw (kWh/h)"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#d97706' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="volumeM3"
                  name="Discharge Flow (m³/h)"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#38bdf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Audit Timeline */}
      <AuditTimeline items={mockAuditTrail} />

      {/* Modal for Investigation Case */}
      {investigationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#23332a] bg-[#101713] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div>
              <h2 className="font-display text-xl font-normal text-[#f4f2ed]">
                Create Formal Verification Case
              </h2>
              <p className="text-xs text-[#8ba497] font-sans mt-1">
                Initiate an official sensor audit or field grab-sample inspection protocol.
              </p>
            </div>

            {investigationCreated ? (
              <div className="p-4 rounded-xl bg-[#0d2116] border border-[#1b4731] text-[#a8e6c4] flex items-center gap-3 font-mono text-xs">
                <CheckCircle2 className="w-5 h-5 text-[#3ea876] flex-shrink-0" />
                <div>
                  <p className="font-bold">Investigation Registered</p>
                  <p className="text-[11px] text-[#789284] mt-0.5">
                    Case reference #INV-2026-092 assigned to Zonal Inspection Team.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveFactory({
                    id: factory.id,
                    name: factory.name,
                    industry: factory.industry,
                    location: factory.location,
                    consentOrderId: factory.consentOrderId,
                    overallSignalScore: factory.overallSignalScore,
                    status: factory.status,
                    impactSeverity: factory.impact.impact_severity,
                    impactHeadline: factory.impact.impact_headline,
                    affectedPopulation: factory.impact.affected_population,
                    riverOxygenLossPct: factory.impact.river_oxygen_loss_pct,
                    pollutionExcessKgDay: factory.impact.pollution_excess_kg_day,
                    activeSignalsCount: 3,
                    lastAnalyzed: 'Just now (Case Filed)',
                    receivingWaterbody: factory.impact.receiving_waterbody,
                    recommendedAction: factory.impact.recommended_action
                  });
                  setInvestigationCreated(true);
                  setTimeout(() => {
                    setInvestigationModalOpen(false);
                    setInvestigationCreated(false);
                  }, 1800);
                }}
                className="space-y-4 font-sans text-xs"
              >
                <div>
                  <label className="block text-[#8ba497] font-medium mb-1">Facility</label>
                  <input
                    type="text"
                    disabled
                    value={`${factory.name} (${id || factory.id})`}
                    className="w-full rounded-lg border border-[#1a251f] bg-[#090d0b] px-3 py-2 text-xs text-[#789284] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#8ba497] font-medium mb-1">Audit Priority</label>
                  <select 
                    defaultValue={factory.impact.impact_severity === 'CRITICAL' ? 'URGENT' : factory.impact.impact_severity === 'HIGH' ? 'HIGH' : 'MEDIUM'}
                    className="w-full rounded-lg border border-[#23332a] bg-[#090d0b] px-3 py-2 text-xs text-[#f4f2ed] focus:outline-none focus:border-[#3ea876] font-mono"
                  >
                    <option value="URGENT">URGENT PRIORITY ({factory.impact.impact_headline})</option>
                    <option value="HIGH">HIGH PRIORITY (Within 48h)</option>
                    <option value="MEDIUM">MEDIUM PRIORITY (Routine inspection cycle)</option>
                    <option value="LOW">LOW PRIORITY (Desk review)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8ba497] font-medium mb-1">Audit Directive & Real-World Rationale</label>
                  <textarea
                    rows={3}
                    defaultValue={factory.impact.recommended_action}
                    className="w-full rounded-lg border border-[#23332a] bg-[#090d0b] p-3 text-xs text-[#f4f2ed] focus:outline-none focus:border-[#3ea876]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInvestigationModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-[#23332a] text-xs font-mono text-[#8ba497] hover:text-[#f4f2ed] hover:bg-[#141d18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Submit Verification Case
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
