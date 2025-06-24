import { Plus, RefreshCw, Target } from "lucide-react";
import React, { useState } from "react";
import { useCampaigns } from "../hooks/useCampaigns";
import { Campaign, CreateCampaignRequest } from "../types/campaign";
import CampaignCard from "./CampaignCard";
import CampaignForm from "./CampaignForm";

const CampaignDashboard: React.FC = () => {
  const {
    campaigns,
    isLoading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    toggleCampaignStatus,
  } = useCampaigns();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<
    Campaign | undefined
  >();

  const handleCreateCampaign = async (data: CreateCampaignRequest) => {
    const success = await createCampaign(data);
    if (success) {
      setIsFormOpen(false);
    }
  };

  const handleEditCampaign = async (data: CreateCampaignRequest) => {
    if (editingCampaign) {
      const success = await updateCampaign(editingCampaign.id, data);
      if (success) {
        setEditingCampaign(undefined);
        setIsFormOpen(false);
      }
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    await deleteCampaign(id);
  };

  const handleToggleStatus = async (
    id: string,
    status: "ACTIVE" | "INACTIVE"
  ) => {
    await toggleCampaignStatus(id, status);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCampaign(undefined);
  };

  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;
  const totalCampaigns = campaigns.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Campaign Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your marketing campaigns and track their performance
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchCampaigns}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors card-shadow hover-lift"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Total Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCampaigns}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {activeCampaigns}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCampaigns > 0
                    ? Math.round((activeCampaigns / totalCampaigns) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            <span>Loading campaigns...</span>
          </div>
        </div>
      )}

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

      {campaigns.length === 0 && !isLoading && (
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
