import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowUpRight, 
  Users, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  X, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { Factory } from '../types';
import { getStoredFactories, saveFactory, resetStoredFactories } from '../utils/factoryStorage';

export type SortField = 
  | 'id' 
  | 'name' 
  | 'impactSeverity' 
  | 'affectedPopulation' 
  | 'riverOxygenLossPct' 
  | 'overallSignalScore';

export type SortOrder = 'asc' | 'desc';

export const FactoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');
  const [sortField, setSortField] = useState<SortField>('impactSeverity');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [factories, setFactories] = useState<Factory[]>(getStoredFactories());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Case Form State
  const [formData, setFormData] = useState({
    id: `FAC-00${factories.length + 1}`,
    name: '',
    industry: 'Chemical Manufacturing',
    location: '',
    receivingWaterbody: '',
    impactSeverity: 'HIGH' as 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW',
    affectedPopulation: 50000,
    riverOxygenLossPct: 18.0,
    overallSignalScore: 78.5,
    recommendedAction: ''
  });

  // Sync with storage updates across tabs/pages
  useEffect(() => {
    const handleStorageUpdate = () => {
      setFactories(getStoredFactories());
    };
    window.addEventListener('ecoaudit_factories_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener('ecoaudit_factories_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
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

  const industries = useMemo(() => {
    const set = new Set<string>();
    factories.forEach(f => {
      if (f.industry) set.add(f.industry);
    });
    return Array.from(set);
  }, [factories]);

  const sortedAndFiltered = useMemo(() => {
    return factories.filter((fac) => {
      const matchesSearch =
        fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fac.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fac.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (fac.receivingWaterbody && fac.receivingWaterbody.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (fac.impactHeadline && fac.impactHeadline.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesIndustry = selectedIndustry === 'ALL' || fac.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'impactSeverity':
          comparison = getSeverityWeight(a.impactSeverity) - getSeverityWeight(b.impactSeverity);
          if (comparison === 0) {
            comparison = (a.affectedPopulation || 0) - (b.affectedPopulation || 0);
          }
          break;
        case 'affectedPopulation':
          comparison = (a.affectedPopulation || 0) - (b.affectedPopulation || 0);
          break;
        case 'riverOxygenLossPct':
          comparison = (a.riverOxygenLossPct || 0) - (b.riverOxygenLossPct || 0);
          break;
        case 'overallSignalScore':
          comparison = (a.overallSignalScore || 0) - (b.overallSignalScore || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [factories, searchTerm, selectedIndustry, sortField, sortOrder]);

  const renderSortArrow = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 inline ml-1 opacity-50" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-emerald-400 inline ml-1" />
      : <ArrowDown className="w-3.5 h-3.5 text-emerald-400 inline ml-1" />;
  };

  const handleCreateCase = (e: React.FormEvent) => {
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
      location: formData.location.trim() || 'Industrial Estate Corridor',
      receivingWaterbody: formData.receivingWaterbody.trim() || 'Regional Catchment Basin',
      status: formData.impactSeverity,
      impactSeverity: formData.impactSeverity,
      impactHeadline: headline,
      affectedPopulation: Number(formData.affectedPopulation),
      riverOxygenLossPct: Number(formData.riverOxygenLossPct),
      pollutionExcessKgDay: Number((formData.riverOxygenLossPct * 24.5).toFixed(1)),
      overallSignalScore: Number(formData.overallSignalScore),
      activeSignalsCount: formData.impactSeverity === 'CRITICAL' ? 3 : formData.impactSeverity === 'HIGH' ? 2 : 1,
      lastAnalyzed: 'Just now',
      recommendedAction: actionText,
      consentOrderId: `CTO-${formData.id.replace('FAC-', '')}-2026`
    };

    const updated = saveFactory(newFactory);
    setFactories(updated);
    setIsModalOpen(false);
    setSuccessToast(`Case filed successfully: ${newFactory.name} added to Monitored Installations.`);
    setTimeout(() => setSuccessToast(null), 4000);

    // Reset form
    setFormData({
      id: `FAC-00${updated.length + 1}`,
      name: '',
      industry: 'Chemical Manufacturing',
      location: '',
      receivingWaterbody: '',
      impactSeverity: 'HIGH',
      affectedPopulation: 50000,
      riverOxygenLossPct: 18.0,
      overallSignalScore: 78.5,
      recommendedAction: ''
    });
  };

  const handleResetData = () => {
    if (window.confirm('Reset facility list back to the 4 default installations?')) {
      const reset = resetStoredFactories();
      setFactories(reset);
      setSuccessToast('Reset to 4 default monitored installations.');
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#0e2417] border border-[#235839] text-[#a3e6c0] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[#1b2620] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400 font-medium px-2.5 py-0.5 rounded-full bg-[#0e2417] border border-[#1d4a30] text-xs font-mono">
              Facility Registry & Impact Index
            </span>
            <span className="text-[#62776d] text-xs font-mono">Continuous Forensic Surveillance</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#f4f2ed] tracking-tight font-normal">
            Monitored Industrial Installations
          </h1>
          <p className="text-[#889f93] text-sm mt-1 max-w-2xl leading-relaxed">
            Prioritize facilities by real-world human exposure and receiving stream oxygen depletion alongside statistical telemetry anomalies.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>File New Case</span>
          </button>
          <button
            onClick={handleResetData}
            title="Reset to 4 default records"
            className="p-2 rounded-xl border border-[#213027] bg-[#0c1410] hover:bg-[#131f19] text-[#768e82] hover:text-[#d3e3db] text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b120e] border border-[#1b2820] rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52685d]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search facility, basin, or headline.."
            className="w-full rounded-xl border border-[#1b2820] bg-[#070d0a] pl-10 pr-4 py-2 text-xs text-[#e1ece6] placeholder-[#52685d] focus:outline-none focus:border-emerald-600/70 transition-colors font-sans"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-[#070d0a] border border-[#1b2820] rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#52685d]" />
            <span className="text-xs text-[#889f93] font-mono">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value as SortField);
                setSortOrder('desc');
              }}
              className="bg-transparent text-xs text-[#d3e3db] focus:outline-none cursor-pointer font-sans"
            >
              <option value="impactSeverity" className="bg-[#0b120e] text-white">Real-World Impact</option>
              <option value="affectedPopulation" className="bg-[#0b120e] text-white">Exposed Population</option>
              <option value="riverOxygenLossPct" className="bg-[#0b120e] text-white">River DO Loss</option>
              <option value="overallSignalScore" className="bg-[#0b120e] text-white">Anomaly Score</option>
              <option value="name" className="bg-[#0b120e] text-white">Facility Name</option>
              <option value="id" className="bg-[#0b120e] text-white">Facility Code</option>
            </select>
          </div>

          {/* Sector Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-[#070d0a] border border-[#1b2820] rounded-xl px-3 py-2 text-xs text-[#d3e3db] focus:outline-none cursor-pointer font-sans"
          >
            <option value="ALL" className="bg-[#0b120e] text-white">All Industrial Sectors</option>
            {industries.map(ind => (
              <option key={ind} value={ind} className="bg-[#0b120e] text-white">{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Installations Table */}
      <div className="bg-[#090f0c] border border-[#1b2820] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1b2820] bg-[#060a08] text-[#5e776b] font-mono text-[11px] uppercase tracking-wider select-none">
                <th 
                  onClick={() => handleHeaderSort('id')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors w-24"
                >
                  <div className="flex items-center gap-1">
                    <span>Code</span>
                    {renderSortArrow('id')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors min-w-[200px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Facility & Receiving Basin</span>
                    {renderSortArrow('name')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('impactSeverity')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors min-w-[300px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Real-World Impact Directive</span>
                    {renderSortArrow('impactSeverity')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('affectedPopulation')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors text-right w-28"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Exposed Pop.</span>
                    {renderSortArrow('affectedPopulation')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('riverOxygenLossPct')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors text-center w-24"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>DO Loss</span>
                    {renderSortArrow('riverOxygenLossPct')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('overallSignalScore')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#a3c2b2] transition-colors min-w-[170px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Anomaly Score</span>
                    {renderSortArrow('overallSignalScore')}
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center w-24 font-mono">
                  Dossier
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152019] text-xs">
              {sortedAndFiltered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#62776d] font-mono">
                    No facilities found matching current search or filters.
                  </td>
                </tr>
              ) : (
                sortedAndFiltered.map((fac) => {
                  const isCritical = fac.impactSeverity === 'CRITICAL' || fac.status === 'CRITICAL';
                  const isHigh = fac.impactSeverity === 'HIGH' || fac.status === 'HIGH';
                  const isModerate = fac.impactSeverity === 'MODERATE' || fac.status === 'MODERATE';

                  return (
                    <tr 
                      key={fac.id} 
                      className="hover:bg-[#0f1914] transition-colors group"
                    >
                      {/* Code */}
                      <td className="py-4 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {fac.id}
                      </td>

                      {/* Facility & Basin */}
                      <td className="py-4 px-4">
                        <Link 
                          to={`/factories/${fac.id}`}
                          className="font-bold text-[#e1ece6] group-hover:text-emerald-300 transition-colors block text-sm"
                        >
                          {fac.name}
                        </Link>
                        <div className="text-[11px] text-[#6e8579] font-sans mt-0.5">
                          {fac.receivingWaterbody || fac.location}
                        </div>
                      </td>

                      {/* Real-World Impact Directive */}
                      <td className="py-4 px-4 text-[#c5d6cd] font-sans leading-relaxed">
                        {fac.impactHeadline || `${fac.status} priority verification required.`}
                      </td>

                      {/* Exposed Pop */}
                      <td className="py-4 px-4 text-right whitespace-nowrap font-mono text-[#a3c2b2]">
                        <div className="flex items-center justify-end gap-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-500/70" />
                          <span>{fac.affectedPopulation && fac.affectedPopulation > 0 ? fac.affectedPopulation.toLocaleString() : '0'}</span>
                        </div>
                      </td>

                      {/* DO Loss */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {fac.riverOxygenLossPct && fac.riverOxygenLossPct > 0 ? (
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            isCritical 
                              ? 'bg-rose-950/50 text-rose-300 border border-rose-800/40' 
                              : isHigh 
                              ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40' 
                              : isModerate 
                              ? 'bg-yellow-950/30 text-yellow-300 border border-yellow-800/30'
                              : 'bg-emerald-950/30 text-emerald-300 border border-emerald-800/30'
                          }`}>
                            -{fac.riverOxygenLossPct}% DO
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-400">Baseline</span>
                        )}
                      </td>

                      {/* Anomaly Score */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-sm text-[#f4f2ed]">
                            {fac.overallSignalScore ? fac.overallSignalScore.toFixed(1) : '15.0'}
                          </span>
                          
                          {/* Clean Status Pill */}
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium border ${
                            isCritical
                              ? 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                              : isHigh
                              ? 'bg-amber-950/30 border-amber-800/50 text-amber-300'
                              : isModerate
                              ? 'bg-yellow-950/30 border-yellow-800/50 text-yellow-300'
                              : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isCritical ? 'bg-rose-400' : isHigh ? 'bg-amber-400' : isModerate ? 'bg-yellow-400' : 'bg-emerald-400'
                            }`} />
                            <span>
                              {isCritical ? 'Priority Review Required' : isHigh ? 'Requires Verification' : isModerate ? 'Moderate Variance' : 'Normal Baseline'}
                            </span>
                          </span>
                        </div>
                      </td>

                      {/* Dossier Link */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <Link
                          to={`/factories/${fac.id}`}
                          className="px-3 py-1.5 rounded-lg border border-[#213027] bg-[#0c1410] hover:bg-emerald-950/40 hover:border-emerald-700/60 text-[#c5d6cd] hover:text-white text-xs font-mono font-medium transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* File New Case Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="rounded-2xl border border-[#23382c] bg-[#0d1612] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2a22] pb-3">
              <div>
                <h2 className="font-serif text-xl font-normal text-[#f4f2ed]">
                  File Environmental Verification Case
                </h2>
                <p className="text-xs text-[#7d968a] mt-0.5">
                  Register a monitored facility or investigative case into the active surveillance registry.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#62776d] hover:text-white p-1 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-3.5 text-xs">
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
                    <option value="Metal Finishing">Metal Finishing</option>
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
                  placeholder="e.g. Kalyani Chemical Refining Works"
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
                    placeholder="e.g. Palar River Reach 3"
                  />
                </div>
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Location / Cluster</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-[#1f3026] bg-[#070d0a] px-3 py-2 text-[#e1ece6] focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Ranipet SIPCOT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#889f93] font-medium mb-1">Impact Priority</label>
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
                <label className="block text-[#889f93] font-medium mb-1">Audit Directive / Findings Summary</label>
                <textarea
                  rows={2}
                  value={formData.recommendedAction}
                  onChange={(e) => setFormData({ ...formData, recommendedAction: e.target.value })}
                  placeholder="e.g. Schedule immediate split grab sampling at downstream municipal intake."
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
                  File & Add to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
