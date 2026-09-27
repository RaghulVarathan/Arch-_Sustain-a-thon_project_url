import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { AnalysisWorkflow, WorkflowStepItem } from '../components/common/AnalysisWorkflow';
import { ValidationResults, ValidationItem } from '../components/common/ValidationResults';
import { ImpactEngineCard } from '../components/impact/ImpactEngineCard';
import { saveFactory } from '../utils/factoryStorage';
import { ImpactAssessment } from '../types';

const initialWorkflowSteps: WorkflowStepItem[] = [
  { id: '1', name: 'Data Intake & Ingestion', description: 'Parse multipart CSV, metadata headers & temporal frequency', status: 'NOT_STARTED' },
  { id: '2', name: 'Structural & Range Validation', description: 'Verify schema definitions, sensor ranges & regulatory bounds', status: 'NOT_STARTED' },
  { id: '3', name: 'Feature Engineering & Alignment', description: 'Time-align effluent parameters with sub-meter energy draw logs', status: 'NOT_STARTED' },
  { id: '4', name: 'Isolation Forest Multivariate Detection', description: 'Multivariate density scan & regulatory limit clamping detection', status: 'NOT_STARTED' },
  { id: '5', name: 'Biological Treatment Kinetic Fit', description: 'Stoichiometric COD removal & Arrhenius temperature model fit', status: 'NOT_STARTED' },
  { id: '6', name: 'Power Consumption Correlation', description: 'ETP blower/pump wattage vs reported hydraulic flow correlation', status: 'NOT_STARTED' },
  { id: '7', name: 'Real-World Impact Engine Assessment', description: 'Streeter-Phelps river DO sag profile & population exposure computed', status: 'NOT_STARTED' },
  { id: '8', name: 'Composite Priority & Directive Formulation', description: 'Formulate weighted verification priority score & update directory', status: 'NOT_STARTED' },
];

const mockValidationItems: ValidationItem[] = [
  { id: 'v1', label: 'Schema Column Headers', status: 'PASSED', message: 'All mandatory columns (factory_id, timestamp, parameter, value, power_kwh) detected.' },
  { id: 'v2', label: 'ISO-8601 Temporal Sequence', status: 'PASSED', message: 'Timestamps are chronologically ordered at 15-minute continuous sampling intervals.' },
  { id: 'v3', label: 'Physical Sensor Range Bounds', status: 'PASSED', message: 'Effluent pH (6.8–8.2), BOD (20–45 mg/L), COD (120–210 mg/L) within physical instrumentation limits.' },
  { id: 'v4', label: 'Telemetry Continuity & Gaps', status: 'WARNING', message: '2 missing interval logs detected during 03:00–03:30 shift change. Forward-fill imputation applied.' },
  { id: 'v5', label: 'Duplicate Record Check', status: 'PASSED', message: '0 duplicate timestamp-parameter tuples found across 1,440 rows.' },
  { id: 'v6', label: 'Sub-meter Energy Signal Alignment', status: 'PASSED', message: 'Matched 96 corresponding ETP utility meter intervals with 99.8% temporal precision.' },
];

const CHEMICAL_IMPACT: ImpactAssessment = {
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
  ]
};

const PAPER_IMPACT: ImpactAssessment = {
  impact_severity: 'LOW',
  impact_headline: 'Low Impact – Baseline Assimilative Capacity Preserved (0 downstream risk) – Routine Monitoring.',
  affected_population: 0,
  river_oxygen_loss_pct: 2.1,
  oxygen_depletion_mg_l: 0.17,
  pollution_excess_kg_day: 0.0,
  pollution_excess_pct: 0.0,
  receiving_waterbody: 'Brahmaputra Tributary - Reach C4',
  baseline_do_mg_l: 7.8,
  critical_intakes: ['Cachar Wetland Buffer', 'Upper Riparian Reserve'],
  recommended_action: 'Maintain continuous automated telemetry surveillance without physical intervention.',
  action_verb: 'Routine Monitoring',
  ecological_risks: [
    'Assimilative Buffer Stable: Downstream river DO remains above 7.6 mg/L.',
    'No Downstream Human Exposure: Zero population abstraction points affected.',
    'Biological Kinetics Normal: Secondary aeration conforms to stoichiometric model.'
  ]
};

export const UploadPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; records: number; type: 'anomaly' | 'normal' } | null>({
    name: 'FAC-001_chennai_chemicals_continuous_telemetry.csv',
    size: '142.6 KB',
    records: 1440,
    type: 'anomaly'
  });
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [currentStepId, setCurrentStepId] = useState<string>('1');
  const [steps, setSteps] = useState<WorkflowStepItem[]>(initialWorkflowSteps);
  const [pipelineFinished, setPipelineFinished] = useState(false);
  const [completedImpact, setCompletedImpact] = useState<ImpactAssessment>(CHEMICAL_IMPACT);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        records: 1440,
        type: 'anomaly'
      });
      resetPipeline();
    }
  };

  const loadSampleDataset = (type: 'anomaly' | 'normal') => {
    if (type === 'anomaly') {
      setSelectedFile({
        name: 'FAC-001_AeroChem_Effluent_Anomalous_Sample.csv',
        size: '184.2 KB',
        records: 1440,
        type: 'anomaly'
      });
    } else {
      setSelectedFile({
        name: 'FAC-002_Brahmaputra_Pulp_Baseline_Sample.csv',
        size: '168.0 KB',
        records: 1440,
        type: 'normal'
      });
    }
    resetPipeline();
  };

  const resetPipeline = () => {
    setPipelineFinished(false);
    setPipelineProgress(0);
    setSteps(initialWorkflowSteps);
  };

  const runAnalysisPipeline = async () => {
    if (!selectedFile) return;
    setPipelineRunning(true);
    setPipelineFinished(false);

    const isNormal = selectedFile.type === 'normal';

    const stepDelays = isNormal ? [
      { id: '1', duration: 700, details: '1,440 continuous rows parsed across 5 environmental features' },
      { id: '2', duration: 700, details: 'Validation passed (0 schema errors, 100% data integrity verified)' },
      { id: '3', duration: 700, details: 'Normalized rolling variance & delta metrics generated' },
      { id: '4', duration: 700, details: 'Isolation Forest Score: 14.7 (Standard stochastic distribution)' },
      { id: '5', duration: 700, details: 'Stoichiometric fit: Conforms to pilot Arrhenius curve (R² = 0.94)' },
      { id: '6', duration: 700, details: 'Power correlation: Strong positive coupling (r = 0.91) with flow' },
      { id: '7', duration: 700, details: 'Streeter-Phelps sag: Baseline assimilative capacity preserved' },
      { id: '8', duration: 700, details: 'Composite Score: 14.7 (Compliant Baseline Conformance Assigned)' },
    ] : [
      { id: '1', duration: 700, details: '1,440 continuous rows parsed across 5 environmental features' },
      { id: '2', duration: 700, details: 'Validation passed with 1 non-blocking temporal gap warning (forward-fill applied)' },
      { id: '3', duration: 700, details: 'Normalized rolling variance & delta metrics generated' },
      { id: '4', duration: 700, details: 'Isolation Forest Score: 82.0 (Detected boundary clamping at 29.5 mg/L)' },
      { id: '5', duration: 700, details: 'Stoichiometric divergence: 38% deviation from Arrhenius curve' },
      { id: '6', duration: 700, details: 'Power draw flatline vs 42% volume surge (r = -0.42)' },
      { id: '7', duration: 700, details: 'Streeter-Phelps sag: -22.5% dissolved oxygen capacity lost' },
      { id: '8', duration: 700, details: 'Composite Score: 80.5 (HIGH Verification Priority Assigned)' },
    ];

    for (let i = 0; i < stepDelays.length; i++) {
      const curr = stepDelays[i];
      setCurrentStepId(curr.id);
      setPipelineProgress(Math.round(((i + 0.5) / stepDelays.length) * 100));

      setSteps((prev) =>
        prev.map((s) => (s.id === curr.id ? { ...s, status: 'IN_PROGRESS' } : s))
      );

      await new Promise((resolve) => setTimeout(resolve, curr.duration));

      setSteps((prev) =>
        prev.map((s) =>
          s.id === curr.id
            ? {
                ...s,
                status: curr.id === '2' && !isNormal ? 'WARNING' : 'COMPLETED',
                durationMs: curr.duration,
                details: curr.details,
              }
            : s
        )
      );
    }

    const finalImpact = isNormal ? PAPER_IMPACT : CHEMICAL_IMPACT;
    setCompletedImpact(finalImpact);
    setPipelineProgress(100);
    setPipelineRunning(false);
    setPipelineFinished(true);

    // Save analyzed case to shared registry
    if (isNormal) {
      saveFactory({
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
        lastAnalyzed: 'Just now (Analyzed via Pipeline)',
        receivingWaterbody: 'Brahmaputra Tributary - Reach C4',
        recommendedAction: 'Maintain continuous automated telemetry surveillance without physical intervention.'
      });
    } else {
      saveFactory({
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
        lastAnalyzed: 'Just now (Analyzed via Pipeline)',
        receivingWaterbody: 'Kosasthalaiyar River Reach - Basin 3A',
        recommendedAction: 'Issue statutory 48-hour data clarification notice. Verify continuous effluent DO probes and inspect downstream municipal abstraction point.'
      });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[#1f2d25] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="editorial-tag text-[#3ea876] font-semibold px-2 py-0.5 rounded bg-[#15271e] border border-[#234d38]">
              Ingestion Bridge
            </span>
            <span className="text-[#6b8276] text-xs font-mono">Format: OCEMS Continuous CSV</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-[#f4f2ed] tracking-tight">
            Telemetry Ingestion & Pipeline
          </h1>
          <p className="text-xs text-[#8ba497] mt-1.5 max-w-2xl leading-relaxed">
            Upload continuous effluent and energy sub-meter logs to execute the multi-stage transparent forensic verification pipeline.
          </p>
        </div>

        {/* Quick Sample Loaders */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => loadSampleDataset('anomaly')}
            disabled={pipelineRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3d2712] bg-[#1a1208] text-[#ecc94b] text-xs font-mono font-medium hover:bg-[#261b0c] transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Chemical Plant Sample</span>
          </button>
          <button
            onClick={() => loadSampleDataset('normal')}
            disabled={pipelineRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1b3d2b] bg-[#0c1f15] text-[#a8e6c4] text-xs font-mono font-medium hover:bg-[#122e20] transition-colors cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Load Paper Mill Sample</span>
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-6 space-y-4">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? 'border-[#3ea876] bg-[#14261c]'
              : 'border-[#23332a] hover:border-[#2e4538] bg-[#090d0b]'
          }`}
        >
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#141d18] border border-[#23332a] text-[#a8e6c4] flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-[#f4f2ed]">
            Drag & drop continuous environmental monitoring CSV file
          </p>
          <p className="text-[11px] text-[#6b8276] mt-1 font-mono">
            Compatible with CPCB / SPCB OCEMS continuous sensor data formats (15-min intervals)
          </p>

          <label className="mt-4 inline-block">
            <span className="px-4 py-2 rounded-lg bg-[#141d18] border border-[#23332a] text-xs font-semibold text-[#c4d4cc] hover:bg-[#1a2620] hover:text-[#f4f2ed] cursor-pointer transition-colors shadow-sm inline-block">
              Select Local File
            </span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setSelectedFile({
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(1)} KB`,
                    records: 1440,
                    type: 'anomaly'
                  });
                  resetPipeline();
                }
              }}
            />
          </label>
        </div>

        {/* Selected File Card & Pipeline Execution Trigger */}
        {selectedFile && (
          <div className="p-4 rounded-xl bg-[#090d0b] border border-[#1f2d25] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#141d18] text-[#a8e6c4] border border-[#23332a]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f4f2ed] font-mono">{selectedFile.name}</p>
                <div className="flex items-center gap-3 text-[11px] text-[#789284] mt-0.5 font-mono">
                  <span>Size: {selectedFile.size}</span>
                  <span>•</span>
                  <span>{selectedFile.records} continuous rows</span>
                  <span>•</span>
                  <span className="text-[#3ea876] font-semibold">Status: Ingested</span>
                </div>
              </div>
            </div>

            <button
              onClick={runAnalysisPipeline}
              disabled={pipelineRunning}
              className="px-5 py-2.5 rounded-lg bg-[#1f593b] hover:bg-[#28734c] text-white text-xs font-semibold border border-[#2e8256] disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0 cursor-pointer"
            >
              {pipelineRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Stage {currentStepId}/8 ({pipelineProgress}%)</span>
                </>
              ) : pipelineFinished ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#a8e6c4]" />
                  <span>Re-Run Forensic Pipeline</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Forensic Analysis</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Real-Time Analysis Progress Bar */}
      {(pipelineRunning || pipelineFinished) && (
        <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#f4f2ed] flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${pipelineFinished ? 'bg-[#3ea876]' : 'bg-[#3ea876] animate-pulse'}`} />
              <span>{pipelineFinished ? 'Forensic Pipeline Complete (100%)' : `Executing Forensic Stage ${currentStepId} of 8 (${pipelineProgress}%)`}</span>
            </span>
            <span className="font-mono text-[#6b8276] text-[11px]">
              {pipelineFinished ? 'All 3 Detectors & Impact Engine Evaluated' : 'Running analytical & kinetic models...'}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#090d0b] overflow-hidden border border-[#1a251f]">
            <div
              className="h-full rounded-full bg-[#3ea876] transition-all duration-300 ease-out"
              style={{ width: `${pipelineProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Validation Results Report */}
      <ValidationResults
        items={mockValidationItems}
        totalRecords={1440}
        processedRecords={1438}
        warningsCount={1}
      />

      {/* Visible Step-by-Step Pipeline Component */}
      <AnalysisWorkflow steps={steps} currentStepId={currentStepId} />

      {/* Outcome Impact Card when finished */}
      {pipelineFinished && (
        <div className="pt-2 animate-fadeIn">
          <ImpactEngineCard
            impact={completedImpact}
            factoryName={selectedFile?.type === 'normal' ? 'Brahmaputra Pulp & Paper Ltd' : 'AeroChem Specialty Organics'}
            factoryId={selectedFile?.type === 'normal' ? 'FAC-002' : 'FAC-001'}
          />
        </div>
      )}
    </div>
  );
};
