
import { useState, useEffect } from 'react';
import { Campaign, CreateCampaignRequest } from '../types/campaign';
import { campaignApi } from '../services/campaignApi';
import { toast } from 'sonner';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedCampaigns = await campaignApi.getAllCampaigns();
      setCampaigns(fetchedCampaigns);
      console.log('Campaigns fetched successfully:', fetchedCampaigns);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campaigns';
      setError(errorMessage);
      toast.error('Failed to load campaigns', {
        description: errorMessage
      });
      console.error('Error fetching campaigns:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (campaignData: CreateCampaignRequest): Promise<boolean> => {
    try {
      const newCampaign = await campaignApi.createCampaign(campaignData);
      setCampaigns(prev => [newCampaign, ...prev]);
      toast.success('Campaign created successfully', {
        description: `"${newCampaign.name}" has been created`
      });
      console.log('Campaign created:', newCampaign);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create campaign';
      toast.error('Failed to create campaign', {
        description: errorMessage
      });
      console.error('Error creating campaign:', err);
      return false;
    }
  };

  const updateCampaign = async (id: string, campaignData: CreateCampaignRequest): Promise<boolean> => {
    try {
      const updatedCampaign = await campaignApi.updateCampaign(id, campaignData);
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id ? updatedCampaign : campaign
        )
      );
      toast.success('Campaign updated successfully', {
        description: `"${updatedCampaign.name}" has been updated`
      });
      console.log('Campaign updated:', updatedCampaign);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update campaign';
      toast.error('Failed to update campaign', {
        description: errorMessage
      });
      console.error('Error updating campaign:', err);
      return false;
    }
  };

  const deleteCampaign = async (id: string): Promise<boolean> => {
    try {
      await campaignApi.deleteCampaign(id);
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
      toast.success('Campaign deleted successfully');
      console.log('Campaign deleted:', id);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete campaign';
      toast.error('Failed to delete campaign', {
        description: errorMessage
      });
      console.error('Error deleting campaign:', err);
      return false;
    }
  };

  const toggleCampaignStatus = async (id: string, newStatus: 'ACTIVE' | 'INACTIVE'): Promise<boolean> => {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return false;

    const updateData: CreateCampaignRequest = {
      name: campaign.name,
      description: campaign.description,
      status: newStatus
    };

    return await updateCampaign(id, updateData);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    isLoading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    toggleCampaignStatus
  };
};
