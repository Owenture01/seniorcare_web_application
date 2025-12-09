import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, X } from 'lucide-react';
import { Patient } from '../types';

interface CallProps {
  patient: Patient;
  onEndCall: () => void;
}

export const Call: React.FC<CallProps> = ({ patient, onEndCall }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'ringing' | 'connected'>('connecting');

  useEffect(() => {
    // Simulate call connection
    const connectTimer = setTimeout(() => {
      setCallStatus('ringing');
    }, 1000);

    const answerTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 3000);

    return () => {
      clearTimeout(connectTimer);
      clearTimeout(answerTimer);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'ringing':
        return 'Ringing...';
      case 'connected':
        return formatDuration(callDuration);
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onEndCall}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="w-full max-w-md px-6">
        {/* Patient Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className={`absolute inset-0 rounded-full ${callStatus === 'ringing' ? 'animate-ping' : ''} bg-indigo-400 opacity-30`}></div>
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
            />
            {callStatus === 'connected' && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-indigo-900"></div>
            )}
          </div>

          {/* Patient Name */}
          <h1 className="text-4xl font-bold text-white mb-2">{patient.name}</h1>
          <p className="text-indigo-200 text-lg mb-1">{patient.role}</p>

          {/* Call Status */}
          <div className="flex items-center gap-2 mt-4">
            {callStatus !== 'connected' && (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <p className="text-indigo-100 text-xl font-medium">{getStatusText()}</p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="flex justify-center items-center gap-6">
            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-5 rounded-full transition-all transform hover:scale-110 ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              disabled={callStatus !== 'connected'}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            {/* End Call Button */}
            <button
              onClick={onEndCall}
              className="p-6 bg-red-500 hover:bg-red-600 rounded-full transition-all transform hover:scale-110 shadow-lg"
            >
              <PhoneOff className="w-8 h-8 text-white" />
            </button>

            {/* Video Button */}
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-5 rounded-full transition-all transform hover:scale-110 ${
                isVideoOn 
                  ? 'bg-white/20 hover:bg-white/30' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              disabled={callStatus !== 'connected'}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Additional Controls */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-center items-center gap-4">
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all">
                <Volume2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Call Info */}
        {callStatus === 'connected' && (
          <div className="mt-6 text-center">
            <p className="text-indigo-200 text-sm">
              {isMuted && '🔇 Microphone is muted'}
              {isVideoOn && ' • 📹 Video is on'}
            </p>
          </div>
        )}
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};
