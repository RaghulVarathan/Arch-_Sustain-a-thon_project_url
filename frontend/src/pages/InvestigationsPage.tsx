import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, User } from 'lucide-react';

const mockInvestigations = [
  {
    id: 'INV-2026-092',
    factoryId: 'FAC-003',
    factoryName: 'Apex Tannery & Leatherworks',
    priority: 'HIGH' as const,
    status: 'UNDER_REVIEW' as const,
    reason: 'Zero-variance TSS reporting (45.0 mg/L constant) and inverse power-to-discharge correlation (r = -0.68)',
    assignedTo: 'Officer K. Venkatesh',
    createdAt: '2026-09-26 15:45',
    sector: 'Tannery / Leather',
  },
  {
    id: 'INV-2026-091',
    factoryId: 'FAC-001',
    factoryName: 'AeroChem Specialty Organics',
    priority: 'MEDIUM' as const,
    status: 'PENDING' as const,
    reason: 'Continuous boundary clamping of BOD immediately below 30 mg/L statutory limit with kinetic Arrhenius divergence',
    assignedTo: 'Analyst S. Priya',
    createdAt: '2026-09-26 14:30',
    sector: 'Chemical Manufacturing',
  },
  {
    id: 'INV-2026-088',
    factoryId: 'FAC-004',
    factoryName: 'Vanguard Dyeing & Textile Mills',
    priority: 'LOW' as const,
    status: 'VERIFIED' as const,
    reason: 'Diurnal shift reporting timing gap (cross-verified with authenticated plant VFD maintenance records)',
    assignedTo: 'Officer R. Sundar',
    createdAt: '2026-09-24 10:15',
    sector: 'Textiles & Dyeing',
  },
];

export const InvestigationsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-mineral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="editorial-tag text-forest-400 font-semibold px-2 py-0.5 rounded bg-forest-900/40 border border-forest-700/50">
              Regulatory Case Tracking
            </span>
            <span className="text-mineral-500 text-xs font-mono">3 Active Verification Dossiers</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-parchment-100 tracking-tight">
            Verification Cases & Inquiries
          </h1>
          <p className="text-mineral-400 text-sm mt-1.5 max-w-2xl leading-relaxed">
            Active physical inspection protocols, sensor calibration audits, split grab-sampling assignments, and formal verification findings.
          </p>
        </div>
      </div>

      {/* Case cards list with editorial styling */}
      <div className="space-y-4">
        {mockInvestigations.map((inv) => (
          <div
            key={inv.id}
            className="editorial-card p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-mineral-700 transition-colors"
          >
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs font-semibold text-parchment-200 px-2.5 py-1 rounded bg-mineral-850 border border-mineral-700">
                  {inv.id}
                </span>

                <span
                  className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border uppercase tracking-wider ${
                    inv.priority === 'HIGH'
                      ? 'bg-crimson-900/30 border-crimson-700 text-crimson-400'
                      : inv.priority === 'MEDIUM'
                      ? 'bg-ochre-900/30 border-ochre-700 text-ochre-400'
                      : 'bg-mineral-800 border-mineral-700 text-mineral-400'
                  }`}
                >
                  {inv.priority} Verification Priority
                </span>

                <span
                  className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border uppercase tracking-wider ${
                    inv.status === 'UNDER_REVIEW'
                      ? 'bg-forest-900/30 border-forest-600 text-forest-300'
                      : inv.status === 'VERIFIED'
                      ? 'bg-mineral-800 border-mineral-600 text-mineral-300'
                      : 'bg-mineral-850 border-mineral-700 text-mineral-400'
                  }`}
                >
                  {inv.status.replace('_', ' ')}
                </span>
                <span className="text-mineral-500 text-xs font-mono">• {inv.sector}</span>
              </div>

              <div>
                <h3 className="font-display text-lg font-medium text-parchment-100">
                  {inv.factoryName} <span className="font-mono text-xs font-normal text-mineral-400">({inv.factoryId})</span>
                </h3>
                <p className="text-xs text-mineral-300 mt-1 leading-relaxed">{inv.reason}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-mineral-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-mineral-500" />
                  <span>{inv.assignedTo}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-mineral-500" />
                  <span>Opened {inv.createdAt}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-mineral-800">
              <Link
                to={`/factories/${inv.factoryId}`}
                className="px-4 py-2.5 rounded-lg bg-mineral-800 hover:bg-forest-700 text-parchment-200 hover:text-white border border-mineral-700 hover:border-forest-600 text-xs font-medium transition-all inline-flex items-center gap-1.5"
              >
                <span>Inspect Telemetry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
