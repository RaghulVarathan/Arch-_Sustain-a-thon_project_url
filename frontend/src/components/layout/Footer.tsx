import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#1a231e] bg-[#090d0b] pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-[#789284]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-semibold text-xl tracking-tight text-[#f0ede6]">
                EcoTrace<span className="text-[#3ea876] italic ml-0.5">AI</span>
              </span>
              <span className="editorial-tag text-[9px] text-[#5d7367] font-semibold border-l border-[#24332b] pl-2">
                Forensics Core
              </span>
            </div>
            <p className="text-xs text-[#8ba497] max-w-md leading-relaxed font-sans">
              Environmental intelligence and industrial telemetry anomaly verification platform. Continuous multi-sensor validation for CPCB/SPCB regulatory verification teams.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#a8e6c4]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3ea876] animate-pulse" />
                <span>Engine v2.4 (Online)</span>
              </span>
              <span>•</span>
              <span>PostgreSQL / H2 Forensic Vault</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="font-mono text-[10px] uppercase font-bold text-[#c4d4cc] tracking-wider">
              Forensic Framework
            </p>
            <ul className="space-y-1.5 font-sans">
              <li><Link to="/upload" className="hover:text-[#a8e6c4] transition-colors nav-link-animated inline-block">15-Min OCEMS Ingestion</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#a8e6c4] transition-colors nav-link-animated inline-block">Multivariate Isolation Forest</Link></li>
              <li><Link to="/settings" className="hover:text-[#a8e6c4] transition-colors nav-link-animated inline-block">Arrhenius Stoichiometric Kinetic Fit</Link></li>
              <li><Link to="/analytics" className="hover:text-[#a8e6c4] transition-colors nav-link-animated inline-block">ETP Sub-Meter Wattage Correlation</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="font-mono text-[10px] uppercase font-bold text-[#c4d4cc] tracking-wider">
              Regulatory Standards
            </p>
            <ul className="space-y-1.5 font-sans">
              <li><span className="text-[#8ba497]">CPCB OCEMS Rev 2.4 Guideline</span></li>
              <li><span className="text-[#8ba497]">ISO-14001 Continuous Telemetry</span></li>
              <li><span className="text-[#8ba497]">Environment Protection Act, 1986</span></li>
              <li><span className="text-[#8ba497]">Real-Time Zonal Audit Protocol</span></li>
            </ul>
          </div>
        </div>

        {/* Big Architectural Wordmark Banner */}
        <div className="pt-8 border-t border-[#16201a] select-none overflow-hidden">
          <div className="text-center font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-[#141e18] uppercase transition-colors hover:text-[#19271f] duration-500">
            EcoTrace Forensics
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#5d7367] pt-2 border-t border-[#121914]">
          <p>© 2026 EcoTrace AI Systems. Clean water & industrial surveillance forensics.</p>
          <p className="text-right">Statistical anomaly identification does not constitute a legal finding without physical grab sampling.</p>
        </div>
      </div>
    </footer>
  );
};
