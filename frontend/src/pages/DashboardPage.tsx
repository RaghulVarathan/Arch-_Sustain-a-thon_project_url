import React, { useState, useEffect, useMemo } from 'react';
import { StatusBadge } from '../components/common/StatusBadge';
import { SpotlightHero } from '../components/ui/SpotlightHero';
import { MarqueeTicker } from '../components/ui/MarqueeTicker';
import { TiltCard } from '../components/ui/TiltCard';
import { NumberCounter } from '../components/ui/NumberCounter';
import { ImpactPriorityBanner } from '../components/impact/ImpactPriorityBanner';
import { ImpactVsAnomalyMatrix } from '../components/impact/ImpactVsAnomalyMatrix';
import {
  Factory as FactoryIcon,
  ArrowUpRight,
  Search,
  Users,
  Flame,
  ShieldAlert,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  X,
  CheckCircle2,
  Droplets,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Factory } from '../types';
import { getStoredFactories, saveFactory } from '../utils/factoryStorage';

const mockTrendData = [
  { date: '09/20', baseline: 114, variance: 6 },
  { date: '09/21', baseline: 112, variance: 8 },
  { date: '09/22', baseline: 116, variance: 4 },
  { date: '09/23', baseline: 109, variance: 11 },
  { date: '09/24', baseline: 106, variance: 14 },
  { date: '09/25', baseline: 108, variance: 12 },
  { date: '09/26', baseline: 106, variance: 14 },
];

export type SortField = 'id' | 'name' | 'overallSignalScore' | 'impactSeverity' | 'riverOxygenLossPct' | 'affectedPopulation';
export type SortOrder = 'asc' | 'desc';

export const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [factories, setFactories] = useState<Factory[]>(getStoredFactories());
  const [sortField, setSortField] = useState<SortField>('overallSignalScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Complaint / Case Form State
  const [formData, setFormData] = useState({
    id: `FAC-00${factories.length + 1}`,
    name: '',
    industry: 'Chemical Manufacturing',
    location: '',
    receivingWaterbody: '',
    impactSeverity: 'HIGH' as 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW',
    affectedPopulation: 45000,
    riverOxygenLossPct: 20.0,
    overallSignalScore: 82.0,
    recommendedAction: ''
  });

  // Sync with factoryStorage updates across the entire app
  useEffect(() => {
    const handleUpdate = () => {
      setFactories(getStoredFactories());
    };
    window.addEventListener('ecoaudit_factories_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ecoaudit_factories_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleHeaderSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getSeverityWeight = (s?: string) => {
    switch (s?.toUpperCase()) {
      case 'CRITICAL': return 4;
      case 'HIGH': return 3;
      case 'MODERATE': return 2;
      default: return 1;
    }
  };

  const filteredFactories = useMemo(() => {
    return factories.filter((f) => {
      const matchesFilter =
        activeFilter === 'ALL' ||
        (activeFilter === 'IMPACT' && (f.impactSeverity === 'CRITICAL' || f.impactSeverity === 'HIGH' || (f.affectedPopulation && f.affectedPopulation > 30000))) ||
        (activeFilter === 'PRIORITY' && (f.status === 'HIGH' || f.status === 'CRITICAL')) ||
        (activeFilter === 'MODERATE' && (f.status === 'MODERATE' || f.impactSeverity === 'MODERATE')) ||
        (activeFilter === 'BASELINE' && (f.status === 'LOW' || f.impactSeverity === 'LOW'));
      
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.receivingWaterbody && f.receivingWaterbody.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (f.impactHeadline && f.impactHeadline.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'overallSignalScore':
          comparison = (a.overallSignalScore || 0) - (b.overallSignalScore || 0);
          break;
        case 'impactSeverity':
          comparison = getSeverityWeight(a.impactSeverity) - getSeverityWeight(b.impactSeverity);
          break;
        case 'riverOxygenLossPct':
          comparison = (a.riverOxygenLossPct || 0) - (b.riverOxygenLossPct || 0);
          break;
        case 'affectedPopulation':
          comparison = (a.affectedPopulation || 0) - (b.affectedPopulation || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [factories, activeFilter, searchQuery, sortField, sortOrder]);

  const renderSortArrow = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#52685d] inline ml-1 opacity-60" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-emerald-400 inline ml-1" />
      : <ArrowDown className="w-3.5 h-3.5 text-emerald-400 inline ml-1" />;
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const actionText = formData.recommendedAction.trim() || 
      (formData.impactSeverity === 'CRITICAL' ? 'Investigate Immediately and issue municipal intake alert.' :
       formData.impactSeverity === 'HIGH' ? 'High Priority Field Verification required within 48 hours.' :
       formData.impactSeverity === 'MODERATE' ? 'Scheduled Sensor Calibration Verification.' : 'Routine Telemetry Monitoring.');

    const headline = `${formData.impactSeverity.charAt(0) + formData.impactSeverity.slice(1).toLowerCase()} – ${formData.affectedPopulation.toLocaleString()} people affected – ${formData.riverOxygenLossPct}% oxygen loss – ${formData.impactSeverity === 'CRITICAL' ? 'Investigate Immediately.' : formData.impactSeverity === 'HIGH' ? 'High Priority Field Verification.' : formData.impactSeverity === 'MODERATE' ? 'Scheduled Verification.' : 'Routine Monitoring.'}`;

    const newFactory: Factory = {
      id: formData.id.trim() || `FAC-00${factories.length + 1}`,
      name: formData.name.trim(),
      industry: formData.industry,
      location: formData.location.trim() || 'Industrial Cluster Corridor',
      receivingWaterbody: formData.receivingWaterbody.trim() || 'Regional Catchment Reach',
      status: formData.impactSeverity,
      impactSeverity: formData.impactSeverity,
      impactHeadline: headline,
      affectedPopulation: Number(formData.affectedPopulation),
      riverOxygenLossPct: Number(formData.riverOxygenLossPct),
      pollutionExcessKgDay: Number((formData.riverOxygenLossPct * 22.5).toFixed(1)),
      overallSignalScore: Number(formData.overallSignalScore),
      activeSignalsCount: formData.impactSeverity === 'CRITICAL' ? 3 : 2,
      lastAnalyzed: 'Just now',
      recommendedAction: actionText,
      consentOrderId: `CTO-${formData.id.replace('FAC-', '')}-2026`
    };

    const updated = saveFactory(newFactory);
    setFactories(updated);
    setIsModalOpen(false);
    setSuccessToast(`Complaint filed: ${newFactory.name} added to the registry.`);
    setTimeout(() => setSuccessToast(null), 4000);

    setFormData({
      id: `FAC-00${updated.length + 1}`,
      name: '',
      industry: 'Chemical Manufacturing',
      location: '',
      receivingWaterbody: '',
      impactSeverity: 'HIGH',
      affectedPopulation: 45000,
      riverOxygenLossPct: 20.0,
      overallSignalScore: 82.0,
      recommendedAction: ''
    });
  };

  const totalExposedPop = useMemo(() => {
    return factories.reduce((sum, f) => sum + (f.affectedPopulation || 0), 0);
  }, [factories]);

  const criticalAlertsCount = useMemo(() => {
    return factories.filter(f => f.impactSeverity === 'CRITICAL' || f.status === 'CRITICAL').length;
  }, [factories]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#0e2417] border border-[#235839] text-[#a3e6c0] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 1. Hero Section */}
      <SpotlightHero />

      {/* 2. Impact Priority Alert Banner */}
      <ImpactPriorityBanner 
        totalAffectedPopulation={totalExposedPop || 185000}
        criticalOxygenLossAlerts={criticalAlertsCount || 1}
      />

      {/* 3. Live Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Interactive 3D KPI Cards with Real-World Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <TiltCard>
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#13271d] text-[#a8e6c4] border border-[#234d38] font-bold tracking-wider">
                SURVEILLANCE
              </span>
              <div className="p-2 rounded-lg bg-[#141d18] border border-[#23332a] text-emerald-400">
                <FactoryIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-[#f4f2ed]">
                <NumberCounter end={factories.length} duration={1200} />
              </p>
              <p className="font-mono uppercase tracking-wider text-[10px] text-[#789284] font-semibold">
                Active Catchment Plants
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#3ea876]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ea876] animate-pulse" />
                <span>100% telemetry online</span>
              </div>
            </div>
          </div>
        </TiltCard>

        <TiltCard>
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2b210f] text-[#ecc94b] border border-[#4d3a1a] font-bold tracking-wider">
                PUBLIC HEALTH
              </span>
              <div className="p-2 rounded-lg bg-[#141d18] border border-[#23332a] text-cyan-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-cyan-300">
                <NumberCounter end={totalExposedPop} duration={1600} />
              </p>
              <p className="font-mono uppercase tracking-wider text-[10px] text-[#789284] font-semibold">
                Estimated Inhabitants
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-cyan-400">
                <Droplets className="w-3.5 h-3.5" />
                <span>In potential impact zone</span>
              </div>
            </div>
          </div>
        </TiltCard>

        <TiltCard>
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#35121a] text-[#fb7185] border border-[#5c1c2b] font-bold tracking-wider">
                RECEIVING WATER
              </span>
              <div className="p-2 rounded-lg bg-[#141d18] border border-[#23332a] text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-rose-300">
                <NumberCounter end={criticalAlertsCount} duration={1200} />
              </p>
              <p className="font-mono uppercase tracking-wider text-[10px] text-[#789284] font-semibold">
                Critical DO Depletion Reaches
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>Investigate immediately</span>
              </div>
            </div>
          </div>
        </TiltCard>

        <TiltCard>
          <div className="rounded-xl border border-[#1f2d25] bg-[#101713] p-5 h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2b210f] text-[#ecc94b] border border-[#4d3a1a] font-bold tracking-wider">
                INVESTIGATION
              </span>
              <div className="p-2 rounded-lg bg-[#141d18] border border-[#23332a] text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-amber-300">
                <NumberCounter end={factories.filter(f => f.status !== 'LOW').length} duration={1400} />
              </p>
              <p className="font-mono uppercase tracking-wider text-[10px] text-[#789284] font-semibold">
                Priority Review Signals
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-amber-400">
                <Activity className="w-3.5 h-3.5" />
                <span>Field verification advised</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </section>

      {/* 5. Telemetry Conformance Trend & Anomaly vs Impact Scatter Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-xl border border-[#1f2d25] bg-[#101713] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a251f] pb-3">
            <div>
              <h2 className="font-display text-lg font-normal text-[#f4f2ed]">
                7-Day Ingestion & Conformance Trend
              </h2>
              <p className="text-xs text-[#8ba497] font-sans">
                Continuous telemetry records vs signal variances
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#3ea876]">
                <span className="w-2 h-2 rounded-full bg-[#3ea876]" />
                Baseline
              </span>
              <span className="flex items-center gap-1.5 text-[#d97706]">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                Variance
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3ea876" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3ea876" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradVariance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#18231c" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <YAxis tick={{ fontSize: 11, fill: '#789284', fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#1f2d25' }} />
                <Tooltip
                  cursor={{ stroke: '#2e4336', strokeDasharray: '2 2' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-[#2e4336] bg-[#090f0c] p-3 shadow-2xl font-mono text-xs space-y-1.5 min-w-[170px]">
                          <p className="font-bold text-[#f4f2ed] border-b border-[#1f2d25] pb-1 text-sm">
                            Date: {label}
                          </p>
                          <div className="flex items-center justify-between text-[#3ea876]">
                            <span>Baseline Conformance:</span>
                            <span className="font-bold text-white ml-2">{payload[0]?.value}</span>
                          </div>
                          <div className="flex items-center justify-between text-[#d97706]">
                            <span>Requires Verification:</span>
                            <span className="font-bold text-[#fbbf24] ml-2">{payload[1]?.value}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  name="Baseline Conformance"
                  stroke="#3ea876"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradBaseline)"
                />
                <Area
                  type="monotone"
                  dataKey="variance"
                  name="Requires Verification"
                  stroke="#d97706"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradVariance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Anomaly Score vs Real-World Impact Scatter Matrix */}
        <div className="lg:col-span-6">
          <ImpactVsAnomalyMatrix factories={factories} />
        </div>
      </section>

      {/* 6. Prioritized Verification Registry Table */}
      <section className="rounded-xl border border-[#1f2d25] bg-[#101713] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#1a251f] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-normal text-[#f4f2ed]">
              Prioritized Facility Registry & Impact Directives
            </h2>
            <p className="text-xs text-[#8ba497] font-sans mt-0.5">
              Rank-ordered by real-world environmental impact & statistical anomaly priority
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5d7367]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility or headline..."
                className="rounded-lg border border-[#23332a] bg-[#090d0b] pl-8 pr-3 py-1.5 text-xs text-[#f4f2ed] placeholder-[#5d7367] focus:outline-none focus:border-[#3ea876] font-mono w-44 sm:w-52"
              />
            </div>

            {['ALL', 'IMPACT', 'PRIORITY', 'MODERATE', 'BASELINE'].map((k) => (
              <button
                key={k}
                onClick={() => setActiveFilter(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeFilter === k
                    ? 'bg-[#1f593b] text-[#f4f7f5] font-bold border border-[#2e8256]'
                    : 'bg-[#090d0b] text-[#789284] hover:text-[#f4f2ed] border border-[#1a251f]'
                }`}
              >
                {k === 'IMPACT' ? 'HIGH IMPACT' : k}
              </button>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer ml-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>File Complaint</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9ab0a4] border-collapse">
            <thead className="bg-[#090d0b] text-[#6b8276] font-mono text-[11px] uppercase tracking-wider border-b border-[#1a251f] select-none">
              <tr>
                <th 
                  onClick={() => handleHeaderSort('id')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors w-24"
                >
                  <div className="flex items-center gap-1">
                    <span>CODE</span>
                    {renderSortArrow('id')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('name')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors min-w-[200px]"
                >
                  <div className="flex items-center gap-1">
                    <span>FACILITY & RECEIVING BASIN</span>
                    {renderSortArrow('name')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('overallSignalScore')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors min-w-[180px]"
                >
                  <div className="flex items-center gap-1">
                    <span>ANOMALY SCORE</span>
                    {renderSortArrow('overallSignalScore')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('impactSeverity')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors max-w-sm"
                >
                  <div className="flex items-center gap-1">
                    <span>REAL-WORLD IMPACT HEADLINE</span>
                    {renderSortArrow('impactSeverity')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('riverOxygenLossPct')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors text-center w-28"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>OXYGEN LOSS</span>
                    {renderSortArrow('riverOxygenLossPct')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('affectedPopulation')} 
                  className="py-3 px-4 cursor-pointer hover:text-emerald-300 transition-colors text-right w-36"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>EXPOSED POPULATION</span>
                    {renderSortArrow('affectedPopulation')}
                  </div>
                </th>
                <th className="py-3 px-4 text-right w-24 font-mono">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#16201a]">
              {filteredFactories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#6b8276] font-mono">
                    No facilities found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredFactories.map((fac) => (
                  <tr key={fac.id} className="hover:bg-[#141e18] transition-colors group">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#a8e6c4] whitespace-nowrap">{fac.id}</td>
                    <td className="py-3.5 px-4">
                      <Link 
                        to={`/factories/${fac.id}`}
                        className="font-semibold text-[#f4f2ed] hover:text-emerald-300 transition-colors block"
                      >
                        {fac.name}
                      </Link>
                      <div className="text-[11px] text-[#6b8276] truncate max-w-[200px] mt-0.5">
                        {fac.receivingWaterbody || fac.location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-[#f4f2ed] text-sm">
                          {fac.overallSignalScore ? fac.overallSignalScore.toFixed(1) : '15.0'}
                        </span>
                        <StatusBadge status={fac.status || 'LOW'} size="sm" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-[#d3e3db] leading-relaxed line-clamp-2">
                        {fac.impactHeadline || 'Baseline operational conformance'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-center whitespace-nowrap">
                      {fac.riverOxygenLossPct && fac.riverOxygenLossPct > 0 ? (
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          fac.riverOxygenLossPct >= 20 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          fac.riverOxygenLossPct >= 10 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          -{fac.riverOxygenLossPct}% DO
                        </span>
                      ) : (
                        <span className="text-[#5d7367] text-[11px] font-mono">Baseline</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-right whitespace-nowrap">
                      {fac.affectedPopulation && fac.affectedPopulation > 0 ? (
                        <div className="flex items-center justify-end gap-1.5 text-cyan-300 font-semibold">
                          <Users className="w-3.5 h-3.5 text-cyan-400/80" />
                          <span>{fac.affectedPopulation.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-[#5d7367]">0</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/factories/${fac.id}`}
                        className="px-3 py-1.5 rounded-lg border border-[#23332a] bg-[#141d18] hover:bg-[#1f593b] hover:text-white hover:border-[#2e8256] text-[#c4d4cc] text-xs font-mono transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* File Complaint / Case Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="rounded-2xl border border-[#23382c] bg-[#0d1612] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2a22] pb-3">
              <div>
                <h2 className="font-serif text-xl font-normal text-[#f4f2ed]">
                  File Pollution Complaint / Case
                </h2>
                <p className="text-xs text-[#7d968a] mt-0.5">
                  Submit a new factory case or citizen complaint into the active surveillance registry.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#62776d] hover:text-white p-1 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#889f93] font-medium mb-1 font-mono">Facility ID / Code</label>
                  <input
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] font-mono focus:outline-none focus:border-emerald-500"
                    placeholder="FAC-005"
                  />
                </div>
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Industrial Sector</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Chemical Manufacturing">Chemical Manufacturing</option>
                    <option value="Tannery / Leather">Tannery / Leather</option>
                    <option value="Textiles & Dyeing">Textiles & Dyeing</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Pulp & Paper">Pulp & Paper</option>
                    <option value="Thermal Power & Minerals">Thermal Power & Minerals</option>
                    <option value="Distillery & Fermentation">Distillery & Fermentation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#889f93] font-medium mb-1">Facility Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Kaveri Agro-Chemicals Ltd"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Receiving River Basin</label>
                  <input
                    type="text"
                    value={formData.receivingWaterbody}
                    onChange={(e) => setFormData({ ...formData, receivingWaterbody: e.target.value })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Cauvery River Reach 4"
                  />
                </div>
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Location / Cluster</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. SIPCOT Industrial Complex"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Priority Severity</label>
                  <select
                    value={formData.impactSeverity}
                    onChange={(e) => setFormData({ ...formData, impactSeverity: e.target.value as any })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-2.5 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Exposed Pop.</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.affectedPopulation}
                    onChange={(e) => setFormData({ ...formData, affectedPopulation: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">DO Loss %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={formData.riverOxygenLossPct}
                    onChange={(e) => setFormData({ ...formData, riverOxygenLossPct: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#889f93] font-medium mb-1">Complaint / Directive Summary</label>
                <textarea
                  rows={2}
                  value={formData.recommendedAction}
                  onChange={(e) => setFormData({ ...formData, recommendedAction: e.target.value })}
                  placeholder="e.g. Heavy discharge odor observed during night shifts; urgent downstream intake inspection requested."
                  className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#1b2a22]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#1f3026] text-[#889f93] hover:text-white hover:bg-[#121c17] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  File Complaint & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
