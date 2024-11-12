import React, { useState, useEffect } from 'react';
import { Save, Play, Settings, Briefcase } from 'lucide-react';
import { UserProfile } from './types';
import ProfileForm from './components/ProfileForm';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isRunning, setIsRunning] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: [],
    education: [],
    skills: [],
    openAIKey: ''
  });

  useEffect(() => {
    // Load saved profile from Chrome storage
    chrome.storage.local.get(['profile'], (result) => {
      if (result.profile) {
        setProfile(result.profile);
      }
    });
  }, []);

  const handleStartBot = async () => {
    setIsRunning(true);
    // Send message to background script to start the automation
    chrome.runtime.sendMessage({ type: 'START_BOT', profile });
  };

  const handleSaveProfile = async () => {
    await chrome.storage.local.set({ profile });
    alert('Profile saved successfully!');
  };

  return (
    <div className="w-[400px] min-h-[600px] bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6" />
          <h1 className="text-xl font-bold">LinkedIn Auto Apply</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 px-4 ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-3 px-4 ${
            activeTab === 'settings'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Settings
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-4">
        {activeTab === 'profile' ? (
          <ProfileForm profile={profile} setProfile={setProfile} />
        ) : (
          <Settings profile={profile} setProfile={setProfile} />
        )}
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <button
            onClick={handleSaveProfile}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </button>
          <button
            onClick={handleStartBot}
            disabled={isRunning}
            className={`flex items-center px-4 py-2 ${
              isRunning
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg`}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Start Bot'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;