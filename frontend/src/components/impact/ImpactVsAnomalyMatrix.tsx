import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine
} from 'recharts';
import { Factory } from '../../types';
import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImpactVsAnomalyMatrixProps {
  factories: Factory[];
}

export const ImpactVsAnomalyMatrix: React.FC<ImpactVsAnomalyMatrixProps> = ({ factories }) => {
  const navigate = useNavigate();

  const data = factories.map(f => {
    const oxygenLoss = f.riverOxygenLossPct || (f.status === 'CRITICAL' ? 28 : f.status === 'HIGH' ? 22 : f.status === 'MODERATE' ? 12 : 2);
    const affectedPop = f.affectedPopulation || (f.status === 'CRITICAL' ? 85000 : f.status === 'HIGH' ? 62000 : f.status === 'MODERATE' ? 38000 : 0);
    
    const popWeight = Math.min(100, (affectedPop / 90000) * 100);
    const doWeight = Math.min(100, (oxygenLoss / 30) * 100);
    const impactIndex = Math.round((doWeight * 0.55) + (popWeight * 0.45));

    return {
      id: f.id,
      name: f.name,
      anomalyScore: f.overallSignalScore || 0,
      impactScore: impactIndex,
      affectedPopulation: affectedPop,
      riverOxygenLossPct: oxygenLoss,
      status: f.status || 'LOW',
      impactSeverity: f.impactSeverity || (impactIndex >= 70 ? 'CRITICAL' : impactIndex >= 50 ? 'HIGH' : impactIndex >= 25 ? 'MODERATE' : 'LOW')
    };
  });

  const getThemeColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'CRITICAL': return '#c54a58';
      case 'HIGH': return '#d97706';
      case 'MODERATE': return '#b89045';
      default: return '#3ea876';
    }
  };

  return (
    <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-6 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-[#1a251f] pb-3">
        <div>
          <h2 className="font-display text-lg font-normal text-[#f4f2ed] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#3ea876]" />
            <span>Anomaly Score vs Real-World Impact Matrix</span>
          </h2>
          <p className="text-xs text-[#8ba497] font-sans">
            Cross-verifying statistical variance against river assimilative capacity & public intake exposure
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[#c54a58]">
            <span className="w-2 h-2 rounded-full bg-[#c54a58]" /> High Priority Reach
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 15, bottom: 10, left: -15 }}>
            <CartesianGrid strokeDasharray="2 2" vertical={true} stroke="#18231c" />
            <XAxis 
              type="number" 
              dataKey="anomalyScore" 
              name="Anomaly Score" 
              unit="" 
              domain={[0, 100]}
              axisLine={{ stroke: '#1f2d25' }}
              tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }}
              label={{ value: 'Statistical Anomaly Score →', position: 'insideBottom', offset: -5, fill: '#6b8276', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            />
            <YAxis 
              type="number" 
              dataKey="impactScore" 
              name="Real-World Impact" 
              unit="" 
              domain={[0, 100]}
              axisLine={{ stroke: '#1f2d25' }}
              tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }}
              label={{ value: 'Real-World Impact Index →', angle: -90, position: 'insideLeft', fill: '#6b8276', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '2 2', stroke: '#2e4336' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#090d0b] border border-[#23332a] p-3 rounded-lg shadow-xl text-xs space-y-1 font-mono text-[#e1ece6]">
                      <div className="font-bold text-[#f4f2ed]">{d.name} ({d.id})</div>
                      <div className="text-[#8ba497]">Anomaly Score: <span className="text-white font-bold">{d.anomalyScore}</span></div>
                      <div className="text-[#8ba497]">Impact Index: <span className="text-[#a8e6c4] font-bold">{d.impactScore} / 100</span></div>
                      <div className="text-[#8ba497]">River DO Loss: <span className="text-[#d97706] font-bold">-{d.riverOxygenLossPct}%</span></div>
                      <div className="text-[#8ba497]">Exposed Pop: <span className="text-white font-bold">{d.affectedPopulation.toLocaleString()}</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={50} stroke="#1f2d25" strokeDasharray="3 3" />
            <ReferenceLine y={50} stroke="#1f2d25" strokeDasharray="3 3" />
            <Scatter 
              data={data} 
              onClick={(node) => navigate(`/factories/${node.id}`)}
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getThemeColor(entry.impactSeverity)} 
                  r={6.5}
                  className="transition-all hover:scale-125 cursor-pointer"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1a251f] text-xs">
        <div className="p-2.5 rounded-lg bg-[#090d0b] border border-[#1a251f] text-[#8ba497] font-sans">
          <strong className="text-[#c54a58] font-semibold">Top-Right Quadrant:</strong> High statistical anomaly + high human exposure. Prioritized for immediate inspection.
        </div>
        <div className="p-2.5 rounded-lg bg-[#090d0b] border border-[#1a251f] text-[#8ba497] font-sans">
          <strong className="text-[#3ea876] font-semibold">Divergence Insight:</strong> Distinguishes high-risk public health threats from isolated telemetry sensor noise.
        </div>
      </div>
    </div>
  );
};
