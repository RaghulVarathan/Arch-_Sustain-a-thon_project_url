import React from 'react';
import { 
  Users, 
  Droplets, 
  Flame, 
  ArrowRight, 
  ShieldAlert, 
  MapPin, 
  Waves, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImpactAssessment } from '../../types';

interface ImpactEngineCardProps {
  impact?: ImpactAssessment;
  factoryName?: string;
  factoryId?: string;
  onActionClick?: () => void;
  compact?: boolean;
}

export const ImpactEngineCard: React.FC<ImpactEngineCardProps> = ({
  impact,
  factoryName,
  factoryId = 'FAC-001',
  onActionClick,
  compact = false
}) => {
  if (!impact) return null;

  const isCritical = impact.impact_severity === 'CRITICAL';
  const isHigh = impact.impact_severity === 'HIGH';
  const isModerate = impact.impact_severity === 'MODERATE';

  const severityBadgeClass = isCritical
    ? 'bg-[#2a1317] text-[#e58b97] border-[#4a1e27]'
    : isHigh
    ? 'bg-[#2a1e12] text-[#e0a86c] border-[#4a341e]'
    : isModerate
    ? 'bg-[#262214] text-[#cfb672] border-[#453c22]'
    : 'bg-[#13241a] text-[#86c49f] border-[#20422f]';

  if (compact) {
    return (
      <div className="p-4 rounded-xl border border-[#202f26] bg-[#0d1410] space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium uppercase border ${severityBadgeClass}`}>
              {impact.impact_severity}
            </span>
            <span className="text-xs text-[#7d9487] truncate max-w-[200px]">
              {impact.receiving_waterbody}
            </span>
          </div>
          <span className="text-xs font-mono font-medium text-[#c4d4cc]">
            -{impact.river_oxygen_loss_pct}% DO
          </span>
        </div>
        <p className="text-xs text-[#e1ece6] leading-relaxed">
          {impact.impact_headline}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1e2d24] bg-[#0e1612] p-5 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#18241d]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg border border-[#23352a] bg-[#142019] text-[#9ab3a5]">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#f0ede6]">
                {factoryName ? `${factoryName} — Impact Assessment` : 'Real-World Impact Assessment'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#142219] text-[#88b89d] border border-[#203a2a]">
                Impact Engine
              </span>
            </div>
            <div className="text-xs text-[#768e81] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#546b5f]" />
              <span>Receiving Basin: <span className="text-[#b5c7bd]">{impact.receiving_waterbody}</span></span>
            </div>
          </div>
        </div>

        <span className={`self-start sm:self-center px-3 py-1 rounded text-xs font-mono font-medium uppercase border ${severityBadgeClass}`}>
          {impact.impact_severity} Priority
        </span>
      </div>

      {/* Forensic Headline */}
      <div className="p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d]">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#5f7a6c] font-medium block mb-1">
          Forensic Impact Directive
        </span>
        <p className="text-xs sm:text-sm text-[#e1ece6] leading-relaxed font-normal">
          {impact.impact_headline}
        </p>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Affected Population */}
        <div className="p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#688274] mb-1.5">
            <span className="text-[10px] font-mono uppercase">Exposed Pop.</span>
            <Users className="w-3.5 h-3.5 text-[#7ea391]" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#f0ede6]">
              {impact.affected_population > 0 ? impact.affected_population.toLocaleString() : '0'}
            </div>
            <p className="text-[11px] text-[#71897c] mt-0.5">
              {impact.affected_population > 0 ? 'Downstream population' : 'No human risk'}
            </p>
          </div>
        </div>

        {/* River DO Loss */}
        <div className="p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#688274] mb-1.5">
            <span className="text-[10px] font-mono uppercase">River DO Sag</span>
            <Droplets className="w-3.5 h-3.5 text-[#7ea391]" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#f0ede6]">
              -{impact.river_oxygen_loss_pct}%
            </div>
            <p className="text-[11px] text-[#71897c] mt-0.5">
              -{impact.oxygen_depletion_mg_l} mg/L deficit
            </p>
          </div>
        </div>

        {/* Pollution Excess */}
        <div className="p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#688274] mb-1.5">
            <span className="text-[10px] font-mono uppercase">Excess Load</span>
            <Flame className="w-3.5 h-3.5 text-[#7ea391]" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#f0ede6]">
              +{impact.pollution_excess_kg_day} <span className="text-xs font-normal text-[#71897c]">kg/d</span>
            </div>
            <p className="text-[11px] text-[#71897c] mt-0.5">
              {impact.pollution_excess_pct > 0 ? `+${impact.pollution_excess_pct}% above consent` : 'Within limits'}
            </p>
          </div>
        </div>

        {/* Baseline Standard */}
        <div className="p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#688274] mb-1.5">
            <span className="text-[10px] font-mono uppercase">Baseline DO</span>
            <Waves className="w-3.5 h-3.5 text-[#7ea391]" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#f0ede6]">
              {impact.baseline_do_mg_l} <span className="text-xs font-normal text-[#71897c]">mg/L</span>
            </div>
            <p className="text-[11px] text-[#71897c] mt-0.5">
              Healthy natural baseline
            </p>
          </div>
        </div>
      </div>

      {/* Details and Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-1">
        {/* Ecological Risks */}
        <div className="lg:col-span-5 p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c8d8cf]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#a89063]" />
            <span>Ecological & Public Intakes</span>
          </div>

          <ul className="space-y-1.5 text-xs text-[#8da497]">
            {impact.ecological_risks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5f7a6c] mt-1.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>

          {impact.critical_intakes && impact.critical_intakes.length > 0 && (
            <div className="pt-2 border-t border-[#18241d]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5f7a6c] block mb-1">
                Downstream Abstraction Points:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {impact.critical_intakes.map((intake, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-[#121c16] text-[#a4b8ad] border border-[#1f2e24]">
                    {intake}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Action */}
        <div className="lg:col-span-7 p-3.5 rounded-lg bg-[#090f0c] border border-[#18241d] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#c8d8cf]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5e9675]" />
                <span>Recommended Action</span>
              </div>
              <span className="text-[11px] font-mono text-[#768e81]">
                Directive: <span className="text-[#c8d8cf]">{impact.action_verb}</span>
              </span>
            </div>

            <p className="text-xs text-[#b8ccc1] leading-relaxed p-2.5 rounded bg-[#0d1611] border border-[#18251d]">
              {impact.recommended_action}
            </p>
          </div>

          <div className="flex items-center justify-end pt-1">
            {onActionClick ? (
              <button
                onClick={onActionClick}
                className="px-4 py-2 rounded-lg bg-[#1a4a32] hover:bg-[#235e40] text-[#f0ede6] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#286b49] cursor-pointer"
              >
                <span>Initiate Targeted Investigation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to={`/factories/${factoryId}`}
                className="px-4 py-2 rounded-lg bg-[#1a4a32] hover:bg-[#235e40] text-[#f0ede6] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#286b49] cursor-pointer"
              >
                <span>Inspect Full Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
