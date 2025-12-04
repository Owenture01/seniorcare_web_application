import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'concerning' | 'info';
  message: string;
  time: string;
}

interface AlertsProps {
  alerts: Alert[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-100 border-rose-200 text-rose-800';
      case 'concerning':
        return 'bg-amber-100 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-800';
    }
  };

  const getSeverityLabel = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'CRITICAL';
      case 'concerning':
        return 'CONCERNING';
      case 'info':
        return 'INFO';
      default:
        return 'NOTICE';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-800">Alerts</h3>
      </div>
      
      <div className="space-y-3 max-h-[280px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-4 text-slate-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No alerts at this time</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityStyles(alert.severity)} flex items-start space-x-3`}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-bold text-sm">
                    {getSeverityLabel(alert.severity)}:
                  </span>
                  <span className="text-xs font-medium ml-2 flex-shrink-0">
                    {alert.time}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{alert.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
