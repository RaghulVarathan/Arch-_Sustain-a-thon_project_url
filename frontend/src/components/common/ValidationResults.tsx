import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export interface ValidationItem {
  id: string;
  label: string;
  status: 'PASSED' | 'WARNING' | 'FAILED';
  message: string;
}

interface ValidationResultsProps {
  items: ValidationItem[];
  totalRecords: number;
  processedRecords: number;
  warningsCount: number;
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({
  items,
  totalRecords,
  processedRecords,
  warningsCount,
}) => {
  return (
    <div className="editorial-card rounded-lg p-6 border-mineral-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-mineral-850 gap-2">
        <div>
          <h3 className="font-display text-lg font-normal text-parchment-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest-400" />
            <span>Telemetry Structural & Range Validation Ledger</span>
          </h3>
          <p className="text-xs text-mineral-400 font-sans mt-0.5">
            Automated compliance check across schema headers, ISO timestamps, and physical range sanity bounds
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-mineral-400">
            Records: <strong className="text-parchment-100 font-bold">{processedRecords}</strong> / {totalRecords}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              warningsCount > 0
                ? 'bg-ochre-950 text-ochre-300 border border-ochre-800'
                : 'bg-forest-950 text-forest-300 border border-forest-800'
            }`}
          >
            {warningsCount} Warnings
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded border text-xs flex items-start gap-2.5 ${
              item.status === 'PASSED'
                ? 'bg-mineral-950/60 border-mineral-800 text-mineral-200'
                : item.status === 'WARNING'
                ? 'bg-ochre-950/40 border-ochre-800/80 text-ochre-200'
                : 'bg-crimson-950/40 border-crimson-800/80 text-crimson-200'
            }`}
          >
            {item.status === 'PASSED' && (
              <CheckCircle2 className="w-4 h-4 text-forest-400 flex-shrink-0 mt-0.5" />
            )}
            {item.status === 'WARNING' && (
              <AlertTriangle className="w-4 h-4 text-ochre-400 flex-shrink-0 mt-0.5" />
            )}
            {item.status === 'FAILED' && (
              <XCircle className="w-4 h-4 text-crimson-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-parchment-100 font-mono text-[11px]">{item.label}</p>
              <p className="text-[11px] text-mineral-300 mt-0.5 font-sans leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
