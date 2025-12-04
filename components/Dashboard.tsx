import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, AlertOctagon, Brain } from 'lucide-react';
import { Patient, DailyMetric } from '../types';
import { ReactionTimeChart, MemoryChart, ErrorCountChart } from './Charts';
import { AIInsight } from './AIInsight';

interface DashboardProps {
  patient: Patient;
}

export const Dashboard: React.FC<DashboardProps> = ({ patient }) => {
  
  // Calculate summary stats
  const stats = useMemo(() => {
    const history = patient.history;
    const current = history[0];
    const previous = history[1]; // simplified comparison for prototype
    
    // Helper to calculate percent change
    const calcChange = (curr: number, prev: number) => {
      if (!prev) return 0;
      return ((curr - prev) / prev) * 100;
    };

    return {
      avgReaction: Math.round(history.reduce((acc, curr) => acc + curr.reactionTime, 0) / history.length),
      currentReaction: current.reactionTime,
      reactionChange: calcChange(current.reactionTime, previous.reactionTime),
      
      avgMemory: Math.round(history.reduce((acc, curr) => acc + curr.memoryScore, 0) / history.length),
      currentMemory: current.memoryScore,
      memoryChange: calcChange(current.memoryScore, previous.memoryScore),

      totalErrors: history.reduce((acc, curr) => acc + curr.errorCount, 0),
      currentErrors: current.errorCount,
      errorChange: current.errorCount - previous.errorCount // absolute diff for small numbers
    };
  }, [patient]);

  const renderTrend = (value: number, inverse: boolean = false) => {
    // Inverse: true means LOWER is better (e.g. reaction time, errors)
    const isGood = inverse ? value <= 0 : value >= 0;
    const Icon = value === 0 ? Minus : (value > 0 ? TrendingUp : TrendingDown);
    const colorClass = value === 0 ? 'text-slate-400' : (isGood ? 'text-emerald-500' : 'text-rose-500');

    return (
      <div className={`flex items-center text-xs font-medium ${colorClass}`}>
        <Icon className="w-3 h-3 mr-1" />
        {Math.abs(value).toFixed(1)}% {inverse ? (value > 0 ? 'slower' : 'faster') : (value > 0 ? 'increase' : 'decrease')}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Section: AI Insights */}
      <section>
        <AIInsight patient={patient} />
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: Reaction Time */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            {renderTrend(stats.reactionChange, true)}
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Reaction Time</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900">{stats.currentReaction}</span>
              <span className="text-sm text-slate-400">ms</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Error Rate */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-lg">
              <AlertOctagon className="w-6 h-6 text-rose-600" />
            </div>
             {/* For errors, we show absolute difference in text manually for clarity */}
             <div className={`flex items-center text-xs font-medium ${stats.errorChange <= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stats.errorChange === 0 ? <Minus className="w-3 h-3 mr-1"/> : (stats.errorChange > 0 ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>)}
                {Math.abs(stats.errorChange)} {Math.abs(stats.errorChange) === 1 ? 'error' : 'errors'} {stats.errorChange > 0 ? 'more' : 'less'}
             </div>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Daily Errors</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900">{stats.currentErrors}</span>
              <span className="text-sm text-slate-400">count</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Memory Capacity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            {renderTrend(stats.memoryChange, false)}
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Memory Score</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900">{stats.currentMemory}</span>
              <span className="text-sm text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Main Chart: Reaction Time Longitudinal */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Reaction Speed Trend</h3>
            <p className="text-sm text-slate-500">Longitudinal performance over the last 30 days. Lower is better.</p>
          </div>
          <ReactionTimeChart data={[...patient.history].reverse()} />
        </div>

        {/* Secondary Chart: Memory */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6">
             <h3 className="text-lg font-bold text-slate-800">Memory Capacity</h3>
             <p className="text-sm text-slate-500">Standardized recall test scores.</p>
          </div>
          <MemoryChart data={[...patient.history].reverse()} />
        </div>

        {/* Tertiary Chart: Errors */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6">
             <h3 className="text-lg font-bold text-slate-800">Error Frequency</h3>
             <p className="text-sm text-slate-500">Daily incorrect responses during tasks.</p>
          </div>
          <ErrorCountChart data={[...patient.history].reverse()} />
        </div>

      </section>
    </div>
  );
};
