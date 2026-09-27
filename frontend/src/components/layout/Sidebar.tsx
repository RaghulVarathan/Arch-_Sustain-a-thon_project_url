import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  UploadCloud,
  FileSearch,
  BarChart3,
  Settings,
  X,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', label: 'Intelligence Dossier', icon: LayoutDashboard },
    { to: '/factories', label: 'Facility Registry', icon: Factory },
    { to: '/upload', label: 'Telemetry Ingestion', icon: UploadCloud },
    { to: '/investigations', label: 'Verification Cases', icon: FileSearch },
    { to: '/analytics', label: 'Sector Dynamics', icon: BarChart3 },
    { to: '/settings', label: 'Model Calibration', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 border-r border-[#1a231e] bg-[#0d120f] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Masthead Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[#1a231e]">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-semibold text-lg tracking-tight text-[#f0ede6]">
                EcoTrace<span className="text-[#3ea876] italic ml-0.5">AI</span>
              </span>
              <span className="editorial-tag text-[9px] text-[#71857b] font-semibold border-l border-[#24332b] pl-2">
                Forensics
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded text-[#8ba497] hover:bg-[#151f1a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 p-3 mt-2">
            <div className="px-3 py-1.5 text-[10px] editorial-tag text-[#5d7367] font-semibold tracking-wider">
              Core Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? 'bg-[#15271e] text-[#a8e6c4] border border-[#234d38] font-semibold shadow-sm'
                        : 'text-[#8ba497] hover:bg-[#141c18] hover:text-[#e1e9e4]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#3ea876]' : 'text-[#627a6f]'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Meta Box */}
        <div className="p-3.5 m-3 rounded-lg border border-[#1f2d25] bg-[#090d0b] text-xs">
          <div className="flex items-center gap-2 text-[#a8e6c4] font-mono text-[11px]">
            <Compass className="w-3.5 h-3.5 text-[#3ea876]" />
            <span className="font-bold text-[#e1e9e4]">Regulatory Mode</span>
          </div>
          <p className="text-[11px] text-[#6b8276] mt-1 leading-snug">
            Standard Operating Procedure for industrial effluent anomaly verification.
          </p>
        </div>
      </aside>
    </>
  );
};
