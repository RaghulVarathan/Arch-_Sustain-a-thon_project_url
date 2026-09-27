import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BarChart3, Info, Compass, Users, Droplets, Flame } from 'lucide-react';

const sectorData = [
  { sector: 'Chemicals', monitored: 28, prioritized: 7, avgScore: 68.4 },
  { sector: 'Textiles & Dyeing', monitored: 35, prioritized: 4, avgScore: 42.1 },
  { sector: 'Tanneries', monitored: 18, prioritized: 6, avgScore: 74.8 },
  { sector: 'Distilleries', monitored: 14, prioritized: 2, avgScore: 31.0 },
  { sector: 'Pulp & Paper', monitored: 15, prioritized: 1, avgScore: 19.5 },
  { sector: 'Pharmaceuticals', monitored: 22, prioritized: 3, avgScore: 38.2 },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Editorial Masthead */}
      <div className="border-b border-[#1f2d25] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="editorial-tag text-[#d97706] font-semibold px-2 py-0.5 rounded bg-[#2b1e0f] border border-[#4a341e]">
              Forensic Synthesis
            </span>
            <span className="text-[#6b8276] text-xs font-mono">Q3 Telemetry & Basin Impact Ledger</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-[#f4f2ed] tracking-tight">
            Catchment & Sector Forensics
          </h1>
          <p className="text-[#8ba497] text-sm mt-1.5 max-w-2xl leading-relaxed">
            Macro-statistical distribution of biological degradation kinetics, multivariate density variances, and ETP energy correlation discrepancies across industrial sectors.
          </p>
        </div>
      </div>

      {/* Asymmetrical Top Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sector Comparison Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#1f2d25] bg-[#101713] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1a251f]">
            <div>
              <h2 className="font-display text-lg font-medium text-[#f4f2ed] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#3ea876]" />
                <span>Verification Variance Distribution by Sector</span>
              </h2>
              <p className="text-xs text-[#8ba497] mt-0.5">
                Total monitored units versus facilities exhibiting high statistical anomaly indicators
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#8ba497]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2e3d36]" /> Monitored
              </span>
              <span className="flex items-center gap-1.5 text-[#d97706]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]" /> Priority Verification
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#18231c" />
                <XAxis dataKey="sector" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <YAxis tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-[#2e4336] bg-[#090f0c] p-3 shadow-2xl font-mono text-xs space-y-1.5 min-w-[170px]">
                          <p className="font-bold text-[#f4f2ed] border-b border-[#1f2d25] pb-1 text-sm">
                            {label}
                          </p>
                          <div className="flex items-center justify-between text-[#c5d6cd]">
                            <span>Monitored Units:</span>
                            <span className="font-bold text-white ml-2">{payload[0]?.value}</span>
                          </div>
                          <div className="flex items-center justify-between text-[#d97706]">
                            <span>Priority Verification:</span>
                            <span className="font-bold text-[#fbbf24] ml-2">{payload[1]?.value}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="monitored" name="Monitored Units" fill="#24332b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="prioritized" name="Priority Verification" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Forensic Intelligence Rationale Card */}
        <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#3ea876] text-xs font-mono uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Impact Engine Synthesis</span>
            </div>
            
            <h3 className="font-display text-xl text-[#f4f2ed] font-normal leading-snug">
              High Real-World Risk in Palar & Kosasthalaiyar Basins
            </h3>
            
            <p className="text-xs text-[#8ba497] leading-relaxed">
              Tannery and Chemical clusters near Ranipet and Manali show the highest public intake exposure (~147,000 downstream residents) and river oxygen depletion (&gt;22% loss of assimilative buffer).
            </p>

            {/* Clear, Structured Metric Rows */}
            <div className="space-y-2.5 pt-1 font-sans">
              <div className="p-3 rounded-lg bg-[#090d0b] border border-[#1a251f] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8ba497]">
                  <Users className="w-4 h-4 text-[#789284]" />
                  <span>Downstream Exposure</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#f4f2ed]">
                  185,000 residents
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#090d0b] border border-[#1a251f] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8ba497]">
                  <Droplets className="w-4 h-4 text-[#789284]" />
                  <span>Critical River DO Loss</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#f4f2ed]">
                  28% (Palar Reach 7)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#090d0b] border border-[#1a251f] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8ba497]">
                  <Flame className="w-4 h-4 text-[#789284]" />
                  <span>Excess Organic Load</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#f4f2ed]">
                  +1,233.4 kg/day
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a251f] flex items-start gap-2 text-[11px] text-[#6b8276] leading-relaxed">
            <Info className="w-3.5 h-3.5 text-[#52685d] shrink-0 mt-0.5" />
            <span>Impact Engine models Streeter-Phelps oxygen sag dynamics alongside downstream drinking intakes to prioritize audit deployments.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
