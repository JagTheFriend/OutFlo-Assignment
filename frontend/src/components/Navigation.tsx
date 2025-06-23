
import React from 'react';
import { MessageSquare, Target } from 'lucide-react';

interface NavigationProps {
  activeTab: 'campaigns' | 'generator';
  onTabChange: (tab: 'campaigns' | 'generator') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
                Campaign Manager
              </h1>
            </div>
            <div className="ml-6 flex space-x-8">
              <button
                onClick={() => onTabChange('campaigns')}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activeTab === 'campaigns'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-200`}
              >
                <Target className="w-4 h-4 mr-2" />
                Campaigns
              </button>
              <button
                onClick={() => onTabChange('generator')}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  activeTab === 'generator'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-200`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Generator
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
