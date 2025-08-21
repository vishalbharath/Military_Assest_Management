import React from 'react';
import { clsx } from 'clsx';

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend = 'neutral',
  trendValue,
  color,
  className,
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-600',
  };

  return (
    <div className={clsx('bg-white rounded-lg border p-6 shadow-sm', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">
            {value.toLocaleString()}
          </p>
          {trendValue && (
            <p className={clsx('text-sm mt-1', trendColors[trend])}>
              {trendValue}
            </p>
          )}
        </div>
        <div
          className={clsx(
            'w-12 h-12 rounded-lg flex items-center justify-center border',
            colorClasses[color]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;