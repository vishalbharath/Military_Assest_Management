import React from 'react';

const AssetTypeChart = ({ data }) => {
  const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Assets by Type</h3>
      <div className="space-y-4">
        {data.map((item) => {
          const percentage = (item.count / maxCount) * 100;
          
          return (
            <div key={item.type} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">
                  {item.type.replace('_', ' ')}
                </span>
                <span className="text-sm text-slate-600">{item.count}</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-slate-500">
                <span>Available: {item.available}</span>
                <span>Assigned: {item.assigned}</span>
                <span>Maintenance: {item.maintenance}</span>
                <span>Expended: {item.expended}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetTypeChart;