import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { OxygenSagPoint } from '../../types';
import { Droplets, Info } from 'lucide-react';

interface OxygenDepletionChartProps {
  data?: OxygenSagPoint[];
  waterbodyName?: string;
  riverOxygenLossPct?: number;
}

export const OxygenDepletionChart: React.FC<OxygenDepletionChartProps> = ({
  data,
  waterbodyName = 'Receiving Stream',
  riverOxygenLossPct = 28.0
}) => {
  // Fallback default Streeter-Phelps sag points if none provided
  const points = (data && data.length > 0) ? data : [
    { distanceKm: 0.0, baselineDoMgL: 7.2, impactedDoMgL: 6.9, dissolvedOxygenDeficit: 0.3, criticalThresholdMgL: 4.0 },
    { distanceKm: 1.5, baselineDoMgL: 7.2, impactedDoMgL: 6.2, dissolvedOxygenDeficit: 1.0, criticalThresholdMgL: 4.0 },
    { distanceKm: 3.5, baselineDoMgL: 7.2, impactedDoMgL: 5.1, dissolvedOxygenDeficit: 2.1, criticalThresholdMgL: 4.0 },
    { distanceKm: 6.0, baselineDoMgL: 7.2, impactedDoMgL: 4.2, dissolvedOxygenDeficit: 3.0, criticalThresholdMgL: 4.0 },
    { distanceKm: 10.0, baselineDoMgL: 7.2, impactedDoMgL: 4.8, dissolvedOxygenDeficit: 2.4, criticalThresholdMgL: 4.0 },
    { distanceKm: 15.0, baselineDoMgL: 7.2, impactedDoMgL: 5.8, dissolvedOxygenDeficit: 1.4, criticalThresholdMgL: 4.0 },
    { distanceKm: 20.0, baselineDoMgL: 7.2, impactedDoMgL: 6.5, dissolvedOxygenDeficit: 0.7, criticalThresholdMgL: 4.0 },
    { distanceKm: 25.0, baselineDoMgL: 7.2, impactedDoMgL: 7.0, dissolvedOxygenDeficit: 0.2, criticalThresholdMgL: 4.0 }
  ];

  return (
    <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-6 space-y-4 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a251f] pb-3">
        <div>
          <h4 className="text-sm font-semibold text-[#f4f2ed] flex items-center gap-2 font-display">
            <Droplets className="w-4 h-4 text-[#3ea876]" />
            <span>Streeter-Phelps Dissolved Oxygen (DO) Sag Profile</span>
          </h4>
          <p className="text-xs text-[#8ba497] mt-0.5">
            Dissolved oxygen deficit along <strong className="text-[#c4d4cc] font-medium">{waterbodyName}</strong> downstream reach (0–25 km)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#2b1619] text-[#e58b97] border border-[#4a2228]">
            -{riverOxygenLossPct}% DO Sag
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="baselineDoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3ea876" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3ea876" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="impactedDoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c54a58" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#c54a58" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" stroke="#18231c" vertical={false} />
            <XAxis 
              dataKey="distanceKm" 
              stroke="#6b8276" 
              fontSize={11}
              unit=" km"
              tickLine={false}
              tick={{ fill: '#789284', fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#1f2d25' }}
            />
            <YAxis 
              stroke="#6b8276" 
              fontSize={11}
              domain={[0, 9]} 
              unit=" mg/L"
              tickLine={false}
              tick={{ fill: '#789284', fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#1f2d25' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#090d0b', 
                borderColor: '#23332a',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono',
                color: '#f4f2ed',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
              }}
              formatter={(val: any, name: any) => {
                if (name === 'baselineDoMgL') return [`${val} mg/L`, 'Natural Baseline DO'];
                if (name === 'impactedDoMgL') return [`${val} mg/L`, 'Impacted Stream DO'];
                if (name === 'dissolvedOxygenDeficit') return [`${val} mg/L`, 'Oxygen Deficit'];
                return [val, name];
              }}
            />
            <ReferenceLine 
              y={4.0} 
              stroke="#a85d38" 
              strokeDasharray="3 3" 
              label={{ value: 'Statutory 4.0 mg/L Threshold', position: 'insideBottomRight', fill: '#a85d38', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
            />
            <Area 
              type="monotone" 
              dataKey="baselineDoMgL" 
              name="Natural Baseline DO" 
              stroke="#3ea876" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#baselineDoGrad)" 
            />
            <Area 
              type="monotone" 
              dataKey="impactedDoMgL" 
              name="Impacted Stream DO" 
              stroke="#c54a58" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#impactedDoGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3 rounded-lg bg-[#090d0b] border border-[#1a251f] flex items-start gap-2 text-xs text-[#8ba497]">
        <Info className="w-4 h-4 text-[#52685d] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Critical oxygen sag point occurs at <strong className="text-[#f4f2ed]">River Km 6.0</strong> with a lowest predicted DO of <strong className="text-[#c54a58]">4.2 mg/L</strong>. Assimilative reaeration recovers baseline above Km 22.0.
        </p>
      </div>
    </div>
  );
};
