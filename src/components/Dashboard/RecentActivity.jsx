import React from 'react';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  <span className="font-medium">{activity.userName}</span>{' '}
                  {activity.action.toLowerCase().replace('_', ' ')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {format(new Date(activity.timestamp), 'MMM d, yyyy HH:mm')}
                </p>
                {activity.details && Object.keys(activity.details).length > 0 && (
                  <div className="mt-1">
                    {Object.entries(activity.details).map(([key, value]) => (
                      <span key={key} className="text-xs text-slate-600 mr-3">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;