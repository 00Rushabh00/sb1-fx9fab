import React from 'react';
import { UserProfile } from '../types';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, setProfile }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <SettingsIcon className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">Bot Settings</h2>
      </div>

      {/* OpenAI Settings */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">OpenAI Configuration</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={profile.openAIKey}
            onChange={(e) =>
              setProfile({ ...profile, openAIKey: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="sk-..."
          />
          <p className="text-sm text-gray-500">
            Your API key will be stored securely in Chrome storage.
          </p>
        </div>
      </section>

      {/* Job Search Preferences */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">
          Job Search Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Job Types
            </label>
            <div className="space-y-2">
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{type}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Experience Level
            </label>
            <div className="space-y-2">
              {[
                'Internship',
                'Entry level',
                'Associate',
                'Mid-Senior level',
                'Director',
                'Executive'
              ].map((level) => (
                <label
                  key={level}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Location Preferences
            </label>
            <div className="space-y-2">
              {['Remote', 'Hybrid', 'On-site'].map((location) => (
                <label
                  key={location}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Apply Settings */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">
          Auto-Apply Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">
              Skip applications requiring additional documents
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">
              Skip applications with assessment tests
            </span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Daily Application Limit
            </label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;