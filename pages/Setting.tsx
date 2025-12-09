import React, { useState } from 'react';
import { User, Mail, Phone, Building, Award, Clock, Bell, Save, X } from 'lucide-react';
import { CAREGIVER_PROFILE, CaregiverProfile } from '../services/dataService';

export const Setting: React.FC = () => {
  const [profile, setProfile] = useState<CaregiverProfile>(CAREGIVER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CaregiverProfile>(CAREGIVER_PROFILE);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would save to backend here
    console.log('Saved profile:', editedProfile);
  };

  const handleChange = (field: keyof CaregiverProfile, value: string | number | boolean) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleNotificationChange = (type: 'email' | 'sms' | 'push', value: boolean) => {
    setEditedProfile({
      ...editedProfile,
      notifications: { ...editedProfile.notifications, [type]: value }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your profile and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <User className="w-5 h-5 text-slate-400" />
              Full Name
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Mail className="w-5 h-5 text-slate-400" />
              Email Address
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Phone className="w-5 h-5 text-slate-400" />
              Phone Number
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.phone}</p>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Phone className="w-5 h-5 text-slate-400" />
              Emergency Contact
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.emergencyContact}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Professional Details</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Role */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Award className="w-5 h-5 text-slate-400" />
              Role
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.role}</p>
              )}
            </div>
          </div>

          {/* Organization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Building className="w-5 h-5 text-slate-400" />
              Organization
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.organization}</p>
              )}
            </div>
          </div>

          {/* Specialization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Award className="w-5 h-5 text-slate-400" />
              Specialization
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.specialization}</p>
              )}
            </div>
          </div>

          {/* Years of Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="flex items-center gap-2 text-slate-700 font-medium">
              <Clock className="w-5 h-5 text-slate-400" />
              Years of Experience
            </label>
            <div className="md:col-span-2">
              {isEditing ? (
                <input
                  type="number"
                  value={editedProfile.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 text-lg">{profile.yearsOfExperience} years</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </h2>
        </div>

        <div className="p-8 space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-800">Email Notifications</h3>
              <p className="text-sm text-slate-500">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEditing ? editedProfile.notifications.email : profile.notifications.email}
                onChange={(e) => isEditing && handleNotificationChange('email', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${!isEditing && 'opacity-50 cursor-not-allowed'}`}></div>
            </label>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-800">SMS Notifications</h3>
              <p className="text-sm text-slate-500">Receive alerts via text message</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEditing ? editedProfile.notifications.sms : profile.notifications.sms}
                onChange={(e) => isEditing && handleNotificationChange('sms', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${!isEditing && 'opacity-50 cursor-not-allowed'}`}></div>
            </label>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-semibold text-slate-800">Push Notifications</h3>
              <p className="text-sm text-slate-500">Receive alerts in the app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEditing ? editedProfile.notifications.push : profile.notifications.push}
                onChange={(e) => isEditing && handleNotificationChange('push', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${!isEditing && 'opacity-50 cursor-not-allowed'}`}></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
