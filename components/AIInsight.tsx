import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { generateCognitiveReport } from '../services/geminiService';
import { Patient } from '../types';

interface AIInsightProps {
  patient: Patient;
}

export const AIInsight: React.FC<AIInsightProps> = ({ patient }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await generateCognitiveReport(patient);
      setContent(report);
    } catch (err) {
      setError("Unable to generate analysis. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch insights automatically when patient changes
  useEffect(() => {
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.id]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-800">AI Caretakers Assessment</h2>
            </div>
            <button 
                onClick={fetchInsight} 
                disabled={loading}
                className="text-xs flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors disabled:opacity-50"
            >
                <RefreshCw className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Analyzing...' : 'Refresh Analysis'}
            </button>
        </div>

        <div className="relative z-10 min-h-[120px]">
            {loading ? (
                <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
                    <div className="h-4 bg-indigo-100 rounded w-full"></div>
                    <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
                </div>
            ) : error ? (
                <div className="flex items-center text-red-500 text-sm p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                </div>
            ) : (
                <div 
                    className="prose prose-sm prose-indigo max-w-none text-slate-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content || '' }} 
                />
            )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-indigo-50 flex items-center justify-between text-xs text-slate-400 relative z-10">
           <span>Powered by Gemini 2.5 Flash</span>
           <span>Based on last 14 days of activity</span>
        </div>
    </div>
  );
};
