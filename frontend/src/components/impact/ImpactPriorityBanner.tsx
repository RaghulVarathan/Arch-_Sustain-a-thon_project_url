import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Users, 
  Droplets, 
  Flame, 
  ArrowRight,
  Radio,
  Siren
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type EmergencyLevel = 'CRITICAL' | 'HIGH' | 'MODERATE';

interface ImpactPriorityBannerProps {
  totalAffectedPopulation?: number;
  criticalOxygenLossAlerts?: number;
  totalExcessPollutionKgDay?: number;
  highImpactCount?: number;
  initialLevel?: EmergencyLevel;
}

export const ImpactPriorityBanner: React.FC<ImpactPriorityBannerProps> = ({
  totalAffectedPopulation = 185000,
  criticalOxygenLossAlerts = 2,
  totalExcessPollutionKgDay = 1233.4,
  initialLevel = 'CRITICAL'
}) => {
  const [level, setLevel] = useState<EmergencyLevel>(initialLevel);

  // Dynamic Theme Configurations based on Emergency Level
  const getTheme = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          containerBorder: 'animate-emergency-border border-rose-500/80',
          gradientBg: 'from-rose-950/90 via-red-950/60 to-slate-950 animate-emergency-gradient',
          beaconBg: 'bg-rose-600/30 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.6)]',
          beaconPing: 'bg-rose-500',
          badge: 'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
          dot: 'bg-rose-500 shadow-[0_0_10px_#f43f5e]',
          accentText: 'text-rose-400',
          pillBg: 'bg-rose-950/40 border-rose-800/60',
          btnBg: 'from-rose-600 via-red-600 to-rose-700 shadow-rose-900/60 hover:from-rose-500 hover:to-red-500',
          alertTitle: `CRITICAL EMERGENCY – ${totalAffectedPopulation.toLocaleString()} LIVES AT RISK`,
          alertSubtitle: 'Assimilative river oxygen capacity breached (<4.0 mg/L) across 2 critical municipal water catchments.',
          tagLabel: 'CRITICAL EMERGENCY PROTOCOL'
        };
      case 'HIGH':
        return {
          containerBorder: 'border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.35)]',
          gradientBg: 'from-amber-950/80 via-orange-950/50 to-slate-950',
          beaconBg: 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]',
          beaconPing: 'bg-amber-500',
          badge: 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          dot: 'bg-amber-500 shadow-[0_0_10px_#f59e0b]',
          accentText: 'text-amber-400',
          pillBg: 'bg-amber-950/40 border-amber-800/60',
          btnBg: 'from-amber-600 via-orange-600 to-amber-700 shadow-amber-900/60 hover:from-amber-500 hover:to-orange-500',
          alertTitle: `HIGH ALERT – ${totalAffectedPopulation.toLocaleString()} Downstream Exposure`,
          alertSubtitle: 'Elevated organic loading detected with progressive oxygen depletion in receiving waterways.',
          tagLabel: 'ELEVATED REGULATORY ALERT'
        };
      case 'MODERATE':
      default:
        return {
          containerBorder: 'border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.25)]',
          gradientBg: 'from-yellow-950/60 via-slate-900 to-slate-950',
          beaconBg: 'bg-yellow-600/20 border-yellow-500/60 text-yellow-300',
          beaconPing: 'bg-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40',
          dot: 'bg-yellow-400 shadow-[0_0_8px_#eab308]',
          accentText: 'text-yellow-400',
          pillBg: 'bg-yellow-950/30 border-yellow-800/40',
          btnBg: 'from-yellow-600 to-amber-600 shadow-yellow-900/40 hover:from-yellow-500 hover:to-amber-500',
          alertTitle: `MODERATE WATCH – Active Catchment Verification`,
          alertSubtitle: 'Telemetry variances under review with scheduled weekly verification cycles.',
          tagLabel: 'ACTIVE SURVEILLANCE WATCH'
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${theme.gradientBg} border ${theme.containerBorder} p-5 sm:p-6 mb-8 transition-all duration-700`}>
      
      {/* 1. Radar Laser Sweep Effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-radar-scan opacity-60" />

      {/* 2. Background Ambient Glow */}
      <div className={`absolute top-0 right-1/4 w-96 h-40 ${level === 'CRITICAL' ? 'bg-rose-600/20' : 'bg-amber-600/15'} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
        
        {/* Left Side: Animated Emergency Beacon & Headline */}
        <div className="flex items-start gap-4 sm:gap-5">
          
          {/* Emergency Siren / Beacon with Blinking Ripple Waves */}
          <div className="relative shrink-0 mt-0.5">
            {/* Outward Pulsing Ripple Rings */}
            <span className={`absolute -inset-1 rounded-2xl ${theme.beaconPing} opacity-75 animate-ping duration-1000`} />
            <span className={`absolute -inset-2 rounded-2xl ${theme.beaconPing} opacity-40 animate-pulse duration-700`} />
            
            {/* Central Beacon Icon Box */}
            <div className={`relative p-3.5 rounded-2xl border ${theme.beaconBg} backdrop-blur-md animate-beacon transition-all duration-500`}>
              {level === 'CRITICAL' ? (
                <Siren className="w-7 h-7 text-rose-300 animate-spin duration-3000" />
              ) : (
                <AlertOctagon className="w-7 h-7 text-amber-300 animate-bounce duration-1000" />
              )}
            </div>
          </div>

          <div className="space-y-1.5 max-w-2xl">
            {/* Top Badge Row with Blinking Live Beacon Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${theme.badge}`}>
                <span className={`w-2 h-2 rounded-full ${theme.dot} animate-fast-blink`} />
                <span>{theme.tagLabel}</span>
              </span>

              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Real-Time Hydraulic Telemetry Stream</span>
              </span>
            </div>

            {/* Impact Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              {theme.alertTitle}
            </h2>

            {/* Subtitle / Explainability Notice */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {theme.alertSubtitle} Downstream municipal drinking intakes require immediate physical verification.
            </p>
          </div>
        </div>

        {/* Right Side: KPI Gauges & Interactive Emergency Level Selector */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 sm:flex items-center gap-2.5">
            
            {/* Metric 1: Exposed Population */}
            <div className={`p-3 rounded-xl backdrop-blur-md border ${theme.pillBg} text-left transition-all`}>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Exposed</span>
              </div>
              <div className="text-base font-extrabold text-white font-mono leading-none">
                {totalAffectedPopulation.toLocaleString()}
              </div>
              <div className="text-[10px] text-cyan-300 font-semibold mt-0.5">Residents</div>
            </div>

            {/* Metric 2: Dissolved Oxygen Sag */}
            <div className={`p-3 rounded-xl backdrop-blur-md border ${theme.pillBg} text-left transition-all`}>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                <Droplets className="w-3.5 h-3.5 text-rose-400" />
                <span>DO Loss</span>
              </div>
              <div className={`text-base font-extrabold font-mono leading-none ${theme.accentText}`}>
                {criticalOxygenLossAlerts} Basins
              </div>
              <div className="text-[10px] text-rose-300 font-semibold mt-0.5">&gt;20% Deficit</div>
            </div>

            {/* Metric 3: Excess Pollution */}
            <div className={`p-3 rounded-xl backdrop-blur-md border ${theme.pillBg} text-left transition-all`}>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Excess</span>
              </div>
              <div className="text-base font-extrabold text-orange-300 font-mono leading-none">
                +{totalExcessPollutionKgDay.toFixed(0)}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold mt-0.5">kg/day</div>
            </div>
          </div>

          {/* Action CTA Button with Glowing Shimmer */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Link
              to="/factories"
              className={`w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r ${theme.btnBg} text-white text-xs font-black tracking-wide flex items-center justify-center gap-2.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer border border-white/20`}
            >
              <span>DISPATCH AUDIT SQUAD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Interactive Level Switcher Pills for Demonstration */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
              {(['CRITICAL', 'HIGH', 'MODERATE'] as EmergencyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  title={`Switch view to ${lvl} emergency level`}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    level === lvl
                      ? lvl === 'CRITICAL'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : lvl === 'HIGH'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-yellow-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
