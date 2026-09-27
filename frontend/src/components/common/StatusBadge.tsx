import React from 'react';
import { VerificationStatus } from '../../types';

interface StatusBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const config = {
    LOW: {
      label: 'Normal Baseline',
      style: 'bg-forest-950 text-forest-300 border-forest-800',
      dot: 'bg-forest-400',
    },
    MODERATE: {
      label: 'Moderate Variance',
      style: 'bg-ochre-950 text-ochre-300 border-ochre-800',
      dot: 'bg-ochre-400',
    },
    HIGH: {
      label: 'Requires Verification',
      style: 'bg-ochre-900 text-ochre-200 border-ochre-600',
      dot: 'bg-ochre-300',
    },
    CRITICAL: {
      label: 'Priority Review Required',
      style: 'bg-crimson-950 text-crimson-300 border-crimson-800',
      dot: 'bg-crimson-400',
    },
  }[status] || {
    label: 'Unanalyzed',
    style: 'bg-mineral-900 text-mineral-400 border-mineral-800',
    dot: 'bg-mineral-500',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-xs px-3 py-1.5 gap-2.5 font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded border font-mono ${config.style} ${sizeClasses} tracking-tight`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};
