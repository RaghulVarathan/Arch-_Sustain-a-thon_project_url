import React from 'react';
import { Activity, Zap, Cpu, ShieldCheck, Database, Sliders } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    { icon: Activity, text: 'STOICHIOMETRIC KINETIC FIT' },
    { icon: Cpu, text: 'MULTIVARIATE DENSITY SCAN' },
    { icon: Zap, text: 'ETP POWER DRAW CORRELATION' },
    { icon: ShieldCheck, text: 'CPCB-OCEMS 15-MIN TELEMETRY' },
    { icon: Database, text: 'ARRHENIUS TEMPERATURE MODEL' },
    { icon: Sliders, text: 'ZERO-ENTROPY TSS DETECTION' },
  ];

  return (
    <div className="w-full overflow-hidden border-y border-[#1a231e] bg-[#0c110e] py-2.5 select-none group">
      <div className="flex w-max animate-marquee space-x-8 group-hover:[animation-play-state:paused]">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-[#789284]">
              <Icon className="w-3.5 h-3.5 text-[#3ea876]" />
              <span className="tracking-wider uppercase font-semibold text-[11px] text-[#c4d4cc]">
                {item.text}
              </span>
              <span className="text-[#23332a] mx-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
