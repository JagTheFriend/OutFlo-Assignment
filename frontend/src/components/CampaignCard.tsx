
import React from 'react';
import { Campaign } from '../types/campaign';
import { Edit, Trash2 } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover-lift p-6 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
          <div className="flex items-center space-x-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                campaign.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {campaign.status}
            </span>
            <span className="text-xs text-gray-500">
              Created: {new Date(campaign.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(campaign)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(campaign.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            onToggleStatus(
              campaign.id,
              campaign.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
            )
          }
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            campaign.status === 'ACTIVE'
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {campaign.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
