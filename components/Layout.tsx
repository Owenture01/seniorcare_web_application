import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, Bell, Menu, X, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_PATIENTS } from '../services/dataService';
import { Patient } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const { logout, user } = useAuth();

  // Determine current page from URL
  const currentPage = useMemo(() => {
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    if (location.pathname.startsWith('/chat')) return 'chat';
    if (location.pathname.startsWith('/settings')) return 'settings';
    return 'dashboard';
  }, [location.pathname]);

  // Find current patient from URL
  const selectedPatient = useMemo(() => {
    if (patientId) {
      const found = MOCK_PATIENTS.find(
        p => p.id === patientId || p.name.toLowerCase().replace(/\s+/g, '-') === patientId.toLowerCase()
      );
      return found || MOCK_PATIENTS[0];
    }
    return MOCK_PATIENTS[0];
  }, [patientId]);

  const handleSelectPatient = (patient: Patient) => {
    const patientSlug = patient.name.toLowerCase().replace(/\s+/g, '-');
    if (currentPage === 'chat') {
      navigate(`/chat/${patientSlug}`);
    } else if (currentPage === 'dashboard') {
      navigate(`/dashboard/${patientSlug}`);
    }
    setIsSidebarOpen(false);
  };

  const handleNavigate = (page: string) => {
    const patientSlug = selectedPatient.name.toLowerCase().replace(/\s+/g, '-');
    if (page === 'dashboard') {
      navigate(`/dashboard/${patientSlug}`);
    } else if (page === 'chat') {
      navigate(`/chat/${patientSlug}`);
    } else if (page === 'settings') {
      navigate('/settings');
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Activity className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-slate-900">SeniorCare+</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Patients
            </h3>
            <div className="space-y-1">
              {MOCK_PATIENTS.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedPatient.id === patient.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <img 
                    src={patient.avatarUrl} 
                    alt={patient.name}
                    className="w-8 h-8 rounded-full object-cover mr-3 ring-2 ring-white" 
                  />
                  <div className="text-left">
                    <p className="truncate">{patient.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Menu
            </h3>
            <nav className="space-y-1">
              <button 
                onClick={() => handleNavigate('dashboard')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'dashboard' ? 'text-slate-700 bg-slate-100' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className={`w-5 h-5 mr-3 ${currentPage === 'dashboard' ? 'text-slate-500' : 'text-slate-400'}`} />
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigate('chat')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'chat' ? 'text-slate-700 bg-slate-100' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <MessageCircle className={`w-5 h-5 mr-3 ${currentPage === 'chat' ? 'text-slate-500' : 'text-slate-400'}`} />
                Chats
              </button>
              <button 
                onClick={() => handleNavigate('settings')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'settings' ? 'text-slate-700 bg-slate-100' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Settings className={`w-5 h-5 mr-3 ${currentPage === 'settings' ? 'text-slate-500' : 'text-slate-400'}`} />
                Settings
              </button>
            </nav>
          </div>
        </div>
        
        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-end lg:justify-between items-center">
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-slate-800">
                {selectedPatient.name}'s Overview
              </h1>
              <p className="text-sm text-slate-500">Last updated: Just now</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
