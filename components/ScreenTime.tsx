import React from 'react';
import { DailyMetric } from '../types';

interface ScreenTimeProps {
  data: DailyMetric[];
}

export const ScreenTime: React.FC<ScreenTimeProps> = ({ data }) => {
  // Get last 7 days of data
  const last7Days = data.slice(-7);
  
  // Extract screen time data
  const screenTimeData = last7Days.map(day => ({
    date: new Date(day.date),
    screenTime: day.screenTime || 0,
  }));

  // Find max value for scaling
  const maxScreenTime = Math.max(...screenTimeData.map(d => d.screenTime), 70);
  const chartMax = Math.ceil(maxScreenTime / 10) * 10; // Round up to nearest 10

  // Format date to show day of week
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Weekly Engagement</h3>
      </div>

      {/* Chart Area */}
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-slate-400 w-8">
          <span>{chartMax}</span>
          <span>{Math.round(chartMax * 0.75)}</span>
          <span>{Math.round(chartMax * 0.5)}</span>
          <span>{Math.round(chartMax * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Chart bars */}
        <div className="ml-10 h-full flex items-end justify-between gap-3 pb-6">
          {screenTimeData.map((item, index) => {
            const heightPercentage = (item.screenTime / chartMax) * 100;
            const isToday = index === screenTimeData.length - 1;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                {/* Bar */}
                <div className="w-full relative flex items-end" style={{ height: '100%' }}>
                  {/* Hover tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    <div className="font-semibold">{item.screenTime} min</div>
                  </div>
                  
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isToday 
                        ? 'bg-indigo-300' 
                        : 'bg-indigo-600'
                    } hover:bg-indigo-500 cursor-pointer shadow-sm`}
                    style={{ 
                      height: `${Math.max(heightPercentage, 2)}%`,
                      minHeight: heightPercentage > 0 ? '8px' : '4px'
                    }}
                  />
                </div>
                
                {/* X-axis label */}
                <div className="text-xs text-slate-500 mt-2 text-center whitespace-nowrap font-medium">
                  {formatDate(item.date)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
