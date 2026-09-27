import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex w-full items-center justify-between border-b transition-all duration-300 ease-out px-4 sm:px-6 ${
        isScrolled
          ? 'h-14 bg-[#0d120f]/95 border-[#1f2d25] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'h-16 bg-[#0d120f]/80 border-[#1a231e] backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center gap-5">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-[#8ba497] hover:bg-[#151f1a] hover:text-[#f0ede6] transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search with precision terminal style */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5d7367]" />
          <input
            type="text"
            placeholder="Search registry, consent order, token..."
            className="w-full rounded-lg border border-[#1f2d25] bg-[#090d0b] pl-10 pr-4 py-1.5 text-xs text-[#e1e9e4] placeholder-[#5d7367] focus:border-[#3ea876] focus:bg-[#0f1612] focus:outline-none transition-all font-mono"
          />
        </div>

      </div>

      <div className="flex items-center gap-4">
        {/* Underline animated nav links */}
        <div className="hidden xl:flex items-center gap-6 text-xs text-[#8ba497]">
          <Link to="/dashboard" className="nav-link-animated py-1 hover:text-[#f4f2ed] transition-colors">
            Surveillance
          </Link>
          <Link to="/upload" className="nav-link-animated py-1 hover:text-[#f4f2ed] transition-colors">
            Ingestion Pipeline
          </Link>
          <Link to="/factories" className="nav-link-animated py-1 hover:text-[#f4f2ed] transition-colors">
            Facility Registry
          </Link>
        </div>

        {/* Action Button */}
        <Link
          to="/upload"
          className="btn-sweep hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1f593b] text-[#f4f7f5] text-xs font-semibold border border-[#2e8256] transition-all shadow-sm group"
        >
          <span>Ingest Telemetry</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#a8e6c4] group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-[#8ba497] hover:bg-[#151f1a] hover:text-[#f0ede6] transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#d97706] animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
        </button>

        {/* User Identity */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#1a231e]">
          <div className="w-7 h-7 rounded-md bg-[#16211b] border border-[#233329] text-[#a8e6c4] font-mono text-xs font-bold flex items-center justify-center">
            EA
          </div>
          <div className="hidden md:block text-left leading-none">
            <p className="text-xs font-semibold text-[#e1e9e4]">Zonal Enforcement</p>
            <p className="text-[10px] text-[#6b8276] font-mono mt-0.5">Region IV Catchment</p>
          </div>
        </div>
      </div>
    </header>
  );
};
