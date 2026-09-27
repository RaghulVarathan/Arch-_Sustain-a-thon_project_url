import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-xl bg-mineral-900 border border-mineral-800 flex items-center justify-center text-ochre-400">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="editorial-tag text-ochre-400 px-2.5 py-0.5 rounded bg-ochre-900/30 border border-ochre-700/40">
          Telemetry Void • 404
        </span>
        <h1 className="font-display text-3xl font-medium text-parchment-100">
          Record Not Found in Forensics Index
        </h1>
        <p className="text-mineral-400 text-xs leading-relaxed max-w-sm mx-auto">
          The requested dossier, telemetry stream, or inspection audit record does not exist in the active regulatory database.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-forest-700 hover:bg-forest-600 text-white text-xs font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
        <Link
          to="/factories"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-mineral-900 hover:bg-mineral-800 text-mineral-200 border border-mineral-700 text-xs font-medium transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Factory Directory</span>
        </Link>
      </div>
    </div>
  );
};
