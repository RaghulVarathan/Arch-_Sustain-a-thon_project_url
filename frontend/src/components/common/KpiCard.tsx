import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  supportingInfo?: string;
  trend?: {
    value: string;
    isNeutral?: boolean;
    isPositive?: boolean;
  };
  icon?: LucideIcon;
  variant?: 'default' | 'accent' | 'warning' | 'alert';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  supportingInfo,
  trend,
  icon: Icon,
}) => {
  return (
    <div className="rounded-xl border border-[#1f2d25] bg-[#101613] p-5 flex flex-col justify-between hover:border-[#2a3e33] hover:bg-[#131a16] transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono uppercase tracking-wider text-[10px] text-[#789284] font-semibold">
            {label}
          </p>
          <div className="mt-2.5 flex items-baseline">
            <span className="font-display text-3xl sm:text-4xl font-normal text-[#f4f2ed] tracking-tight">
              {value}
            </span>
          </div>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-[#16201b] border border-[#23332a] text-[#a8e6c4]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {(supportingInfo || trend) && (
        <div className="mt-4 pt-3 border-t border-[#1a251f] flex items-center justify-between text-xs text-[#80998c]">
          {supportingInfo && <span className="truncate max-w-[180px]">{supportingInfo}</span>}
          {trend && (
            <span
              className={`font-mono text-[11px] font-medium shrink-0 ${
                trend.isNeutral
                  ? 'text-[#8ba497]'
                  : trend.isPositive
                  ? 'text-[#48bb78]'
                  : 'text-[#ecc94b]'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
