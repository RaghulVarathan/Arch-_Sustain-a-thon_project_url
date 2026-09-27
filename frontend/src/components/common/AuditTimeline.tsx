import React from 'react';
import { History, Shield, CheckCircle, FileText, PlusCircle } from 'lucide-react';

export interface AuditItem {
  id: number;
  action: string;
  details: string;
  performedBy: string;
  createdAt: string;
}

interface AuditTimelineProps {
  items: AuditItem[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ items }) => {
  const getActionIcon = (action: string) => {
    if (action.includes('INVESTIGATION')) return <PlusCircle className="w-3.5 h-3.5 text-orange-600" />;
    if (action.includes('ANALYSIS') || action.includes('DETECTOR')) return <Shield className="w-3.5 h-3.5 text-brand-600" />;
    if (action.includes('UPLOAD')) return <FileText className="w-3.5 h-3.5 text-blue-600" />;
    return <CheckCircle className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Regulatory Audit Trail</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Immutable Log</span>
      </div>

      <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {items.map((item) => (
          <div key={item.id} className="relative pl-7 text-xs">
            <div className="absolute left-1.5 top-0.5 w-3.5 h-3.5 rounded-full bg-white border border-slate-300 flex items-center justify-center">
              {getActionIcon(item.action)}
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-bold text-slate-800">{item.action.replace(/_/g, ' ')}</span>
              <span className="font-mono text-[10px] text-slate-400">{item.createdAt}</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-0.5">{item.details}</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">
              Actor: <span className="text-slate-700">{item.performedBy}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
