
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import CampaignDashboard from '../components/CampaignDashboard';
import LinkedInMessageGenerator from '../components/LinkedInMessageGenerator';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'generator'>('campaigns');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === 'campaigns' ? (
          <CampaignDashboard />
        ) : (
          <LinkedInMessageGenerator />
        )}
      </main>
    </div>
  );
};

export default Index;
