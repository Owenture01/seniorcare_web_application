import React from 'react';
import { Patient } from '../types';

interface PatientProfileProps {
  patient: Patient;
  onOpenChat: (patientId: string) => void;
}

interface MoodData {
  emoji: string;
  label: string;
  description: string;
  color: string;
}

const moodMap: { [key: number]: MoodData } = {
  1: { emoji: '😢', label: 'Very Sad', description: 'Showing signs of distress', color: 'bg-red-100 text-red-800 border-red-200' },
  2: { emoji: '😟', label: 'Sad', description: 'Feeling down today', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  3: { emoji: '😐', label: 'Neutral', description: 'Stable mood', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  4: { emoji: '😊', label: 'Happy', description: 'In good spirits', color: 'bg-green-100 text-green-800 border-green-200' },
  5: { emoji: '😄', label: 'Very Happy', description: 'Excellent mood today', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  6: { emoji: '😠', label: 'Frustrated', description: 'Rapid interaction and left the game before completion', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  7: { emoji: '😰', label: 'Anxious', description: 'Showing signs of worry', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  8: { emoji: '😌', label: 'Calm', description: 'Relaxed and peaceful', color: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onOpenChat }) => {
  // Get the most recent mood score from history
  const latestMood = patient.history && patient.history.length > 0 
    ? patient.history[patient.history.length - 1].moodScore 
    : 5;
  
  const moodData = moodMap[latestMood] || moodMap[5];
  
  // Calculate last active time
  const lastActiveTime = '12 min ago';
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Profile</h2>
      </div>

      {/* Patient Info */}
      <div className="p-8">
        <div className="flex items-center gap-5 mb-8">
          <img 
            src={patient.avatarUrl} 
            alt={patient.name}
            className="w-32 h-32 rounded-2xl object-cover border-2 border-slate-200"
          />
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{patient.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-base text-slate-500">Last Active: {lastActiveTime}</span>
            </div>
          </div>
        </div>

        {/* Mood Trend Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700">Mood Trend</h3>
            <span className="text-sm text-slate-500">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </div>

          {/* Mood Display */}
          <div className="flex flex-col items-center py-8 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-8xl mb-4">{moodData.emoji}</div>
            <div className={`px-7 py-2.5 rounded-full font-semibold text-base border ${moodData.color}`}>
              {moodData.label}
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center px-4">{moodData.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full py-4 bg-indigo-600 text-white font-semibold text-base rounded-xl hover:bg-indigo-700 transition-colors">
            Call Now
          </button>
          <button 
            onClick={() => onOpenChat(patient.id)}
            className="w-full py-4 bg-indigo-100 text-indigo-700 font-semibold text-base rounded-xl hover:bg-indigo-200 transition-colors"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};
