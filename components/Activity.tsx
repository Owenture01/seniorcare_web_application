import React from 'react';
import { Activity as ActivityType } from '../types';

interface ActivityProps {
  activities: ActivityType[];
}

export const Activity: React.FC<ActivityProps> = ({ activities }) => {
  // Sort activities by time spent (descending)
  const sortedActivities = [...activities].sort((a, b) => b.timeSpent - a.timeSpent);

  // Find the top activity to highlight
  const topActivity = sortedActivities[0];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Today's Activities</h3>
      </div>

      <div className="space-y-4">
        {sortedActivities.map((activity, index) => {
          const isTopActivity = activity.name === topActivity.name;
          
          return (
            <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 
                    className={`font-semibold ${
                      isTopActivity ? 'text-rose-600' : 'text-slate-700'
                    }`}
                  >
                    {activity.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Time spent: {activity.timeSpent} min
                  </p>
                </div>
                <div 
                  className={`text-2xl font-bold ${
                    isTopActivity ? 'text-rose-600' : 'text-slate-600'
                  }`}
                >
                  {activity.percentage}%
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTopActivity ? 'bg-rose-500' : 'bg-slate-400'
                  }`}
                  style={{ width: `${activity.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <p className="text-sm">No activities recorded today</p>
        </div>
      )}
    </div>
  );
};
