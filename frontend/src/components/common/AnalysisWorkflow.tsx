import React from 'react';
import { CheckCircle2, Circle, AlertCircle, AlertTriangle, Loader2 } from 'lucide-react';

export type StepStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'WARNING' | 'FAILED';

export interface WorkflowStepItem {
  id: string;
  name: string;
  description: string;
  status: StepStatus;
  durationMs?: number;
  details?: string;
  warningCount?: number;
}

interface AnalysisWorkflowProps {
  steps: WorkflowStepItem[];
  currentStepId?: string;
  className?: string;
}

export const AnalysisWorkflow: React.FC<AnalysisWorkflowProps> = ({
  steps,
  currentStepId,
  className = '',
}) => {
  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4 text-forest-400 flex-shrink-0" />;
      case 'IN_PROGRESS':
        return <Loader2 className="w-4 h-4 text-forest-300 animate-spin flex-shrink-0" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-ochre-400 flex-shrink-0" />;
      case 'FAILED':
        return <AlertCircle className="w-4 h-4 text-crimson-400 flex-shrink-0" />;
      case 'NOT_STARTED':
      default:
        return <Circle className="w-4 h-4 text-mineral-600 flex-shrink-0" />;
    }
  };

  const getStatusBadge = (status: StepStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-forest-950 text-forest-300 border border-forest-800">
            COMPLETED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-mineral-800 text-forest-200 border border-forest-500 animate-pulse">
            EVALUATING
          </span>
        );
      case 'WARNING':
        return (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-ochre-950 text-ochre-300 border border-ochre-800">
            IMPUTED
          </span>
        );
      case 'FAILED':
        return (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-crimson-950 text-crimson-300 border border-crimson-800">
            FAILED
          </span>
        );
      case 'NOT_STARTED':
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mineral-900 text-mineral-500 border border-mineral-800">
            QUEUED
          </span>
        );
    }
  };

  return (
    <div className={`editorial-card rounded-lg p-6 border-mineral-800 space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-mineral-850 gap-2">
        <div>
          <h3 className="font-display text-lg font-normal text-parchment-100">
            Forensic Analytical Pipeline Execution
          </h3>
          <p className="text-xs text-mineral-400 font-sans mt-0.5">
            Transparent stage audit across data validation, Stoichiometric curve fit & energy draw
          </p>
        </div>
        <span className="font-mono text-xs text-mineral-400">
          {steps.filter((s) => s.status === 'COMPLETED' || s.status === 'WARNING').length} of {steps.length} Stages Concluded
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isCurrent = step.id === currentStepId;
          return (
            <div
              key={step.id}
              className={`p-3.5 rounded border transition-all ${
                isCurrent
                  ? 'border-forest-500/80 bg-forest-950/40 shadow-sm'
                  : step.status === 'COMPLETED'
                  ? 'border-mineral-800/80 bg-mineral-900/60'
                  : step.status === 'WARNING'
                  ? 'border-ochre-800/60 bg-ochre-950/30'
                  : 'border-mineral-850 bg-mineral-950/40 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getStepIcon(step.status)}</div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[11px] text-mineral-500 font-bold">
                        [STAGE 0{idx + 1}]
                      </span>
                      <h4 className="text-xs font-bold text-parchment-100">{step.name}</h4>
                    </div>
                    <p className="text-[11px] text-mineral-400 font-sans mt-0.5">{step.description}</p>
                    {step.details && (
                      <p className="text-[11px] font-mono text-parchment-200 mt-1.5 bg-mineral-950 px-2.5 py-1 rounded border border-mineral-800 inline-block">
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {getStatusBadge(step.status)}
                  {step.durationMs !== undefined && (
                    <span className="text-[10px] font-mono text-mineral-500">
                      {(step.durationMs / 1000).toFixed(2)}s
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
