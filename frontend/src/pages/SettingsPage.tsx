import React, { useState } from 'react';
import { Save, CheckCircle2, Scale } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [isoWeight, setIsoWeight] = useState(40);
  const [bioWeight, setBioWeight] = useState(30);
  const [pwrWeight, setPwrWeight] = useState(30);
  const [saved, setSaved] = useState(false);

  const totalWeight = isoWeight + bioWeight + pwrWeight;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Editorial Header */}
      <div className="border-b border-mineral-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="editorial-tag text-forest-400 font-semibold px-2 py-0.5 rounded bg-forest-900/40 border border-forest-700/50">
            Model Calibration
          </span>
          <span className="text-mineral-500 text-xs font-mono">Engine v2.4 • Dynamic Weighting</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-parchment-100 tracking-tight">
          Forensic Weighting & Sensitivities
        </h1>
        <p className="text-mineral-400 text-sm mt-1.5 max-w-2xl leading-relaxed">
          Calibrate relative scoring weights across the 3 forensic modules to balance density anomaly detection with biological stoichiometric constraints.
        </p>
      </div>

      <div className="editorial-card p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-mineral-800">
          <div>
            <h2 className="font-display text-lg font-medium text-parchment-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-forest-400" />
              <span>Composite Score Weighting Matrix</span>
            </h2>
            <p className="text-xs text-mineral-400 mt-0.5">
              The composite verification priority score is calculated as a normalized linear combination of all 3 modules.
            </p>
          </div>
          <div className="font-mono text-xs text-mineral-400">
            Target Sum: <span className="font-bold text-parchment-100">100%</span>
          </div>
        </div>

        <div className="space-y-5 text-xs">
          {/* Module 1 */}
          <div className="p-4 rounded-lg bg-mineral-900 border border-mineral-800 space-y-3">
            <div className="flex justify-between items-center font-medium text-parchment-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-forest-400" />
                <span className="text-sm font-display">1. Isolation Forest & Boundary Clamping Detector</span>
              </div>
              <span className="font-mono text-forest-300 text-sm font-bold">{isoWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={isoWeight}
              onChange={(e) => setIsoWeight(Number(e.target.value))}
              className="w-full accent-[#2f7a55] cursor-pointer"
            />
            <p className="text-[11px] text-mineral-400 leading-relaxed">
              Scans multivariate feature density, flat-line telemetry signatures, digit distribution, and regulatory limit clamping near statutory maximums.
            </p>
          </div>

          {/* Module 2 */}
          <div className="p-4 rounded-lg bg-mineral-900 border border-mineral-800 space-y-3">
            <div className="flex justify-between items-center font-medium text-parchment-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-ochre-400" />
                <span className="text-sm font-display">2. Stoichiometric Biological Degradation Kinetics</span>
              </div>
              <span className="font-mono text-ochre-300 text-sm font-bold">{bioWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bioWeight}
              onChange={(e) => setBioWeight(Number(e.target.value))}
              className="w-full accent-[#c28b38] cursor-pointer"
            />
            <p className="text-[11px] text-mineral-400 leading-relaxed">
              Calculates deviation of reported COD/BOD reductions from Arrhenius temperature-dependent microbial decay models and stoichiometric oxygen balances.
            </p>
          </div>

          {/* Module 3 */}
          <div className="p-4 rounded-lg bg-mineral-900 border border-mineral-800 space-y-3">
            <div className="flex justify-between items-center font-medium text-parchment-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-crimson-400" />
                <span className="text-sm font-display">3. Sub-meter ETP Power Draw vs Hydraulic Discharge</span>
              </div>
              <span className="font-mono text-crimson-300 text-sm font-bold">{pwrWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pwrWeight}
              onChange={(e) => setPwrWeight(Number(e.target.value))}
              className="w-full accent-[#be123c] cursor-pointer"
            />
            <p className="text-[11px] text-mineral-400 leading-relaxed">
              Assesses linear correlation between dedicated aeration blower/pump electrical energy consumption (kWh) and reported wastewater hydraulic throughput ($m^3$).
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-mineral-800">
          <span className={`text-xs font-mono font-bold ${totalWeight === 100 ? 'text-forest-400' : 'text-crimson-400'}`}>
            Total Weight: {totalWeight}% {totalWeight !== 100 && '(Must equal exactly 100%)'}
          </span>

          <button
            onClick={handleSave}
            disabled={totalWeight !== 100}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-700 hover:bg-forest-600 text-white text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-forest-200" />
                <span>Calibration Matrix Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Calibration Parameters</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
