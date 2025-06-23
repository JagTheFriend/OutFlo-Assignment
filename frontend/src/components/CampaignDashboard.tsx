import React, { useState } from 'react';
import { Campaign, CreateCampaignRequest } from '../types/campaign';
import CampaignCard from './CampaignCard';
import CampaignForm from './CampaignForm';
import { Plus, Target } from 'lucide-react';

const CampaignDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q4 Lead Generation',
      description: 'Targeted outreach for enterprise clients in the tech sector',
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Product Launch Outreach',
      description: 'Introducing our new SaaS platform to potential customers',
      status: 'INACTIVE',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
    },
    {
      id: '3',
      name: 'Partnership Development',
      description: 'Building strategic partnerships with industry leaders',
      status: 'ACTIVE',
      createdAt: '2024-01-05T09:15:00Z',
      updatedAt: '2024-01-05T09:15:00Z',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();

  const handleCreateCampaign = (data: CreateCampaignRequest) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCampaigns([newCampaign, ...campaigns]);
    setIsFormOpen(false);
  };

  const handleEditCampaign = (data: CreateCampaignRequest) => {
    if (editingCampaign) {
      setCampaigns(
        campaigns.map((campaign) =>
          campaign.id === editingCampaign.id
            ? { ...campaign, ...data, updatedAt: new Date().toISOString() }
            : campaign
        )
      );
      setEditingCampaign(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const handleToggleStatus = (id: string, status: 'ACTIVE' | 'INACTIVE') => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, status, updatedAt: new Date().toISOString() }
          : campaign
      )
    );
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCampaign(undefined);
  };

  const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE').length;
  const totalCampaigns = campaigns.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your marketing campaigns and track their performance
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors card-shadow hover-lift"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">{activeCampaigns}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCampaigns > 0 ? Math.round((activeCampaigns / totalCampaigns) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={handleEdit}
            onDelete={handleDeleteCampaign}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Target className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">No campaigns yet</p>
            <p className="text-sm">Create your first campaign to get started</p>
          </div>
        </div>
      )}

      <CampaignForm
        campaign={editingCampaign}
        onSubmit={editingCampaign ? handleEditCampaign : handleCreateCampaign}
        onCancel={handleCancel}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default CampaignDashboard;
