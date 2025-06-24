import { API_CONFIG } from "../config/env";
import { Campaign, CreateCampaignRequest } from "../types/campaign";

export interface ApiCampaign {
  id?: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  leads: string[];
  accountIDs: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class CampaignApiService {
  private baseUrl = API_CONFIG.BASE_URL;

  async getAllCampaigns(): Promise<Campaign[]> {
    console.log("Fetching campaigns from:", `${this.baseUrl}/campaign`);

    const response = await fetch(`${this.baseUrl}/campaign`);

    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns: ${response.status}`);
    }

    const apiCampaigns: ApiCampaign[] = (await response.json()).data;
    return apiCampaigns.map(this.transformApiCampaign);
  }

  async getCampaignById(id: string): Promise<Campaign> {
    console.log("Fetching campaign by ID:", id);

    const response = await fetch(`${this.baseUrl}/campaign/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status}`);
    }

    const apiCampaign: ApiCampaign = (await response.json()).data;
    return this.transformApiCampaign(apiCampaign);
  }

  async createCampaign(campaignData: CreateCampaignRequest): Promise<Campaign> {
    console.log("Creating campaign:", campaignData);

    const apiPayload: Omit<ApiCampaign, "id" | "createdAt" | "updatedAt"> = {
      name: campaignData.name,
      description: campaignData.description,
      status: campaignData.status.toUpperCase() as "ACTIVE" | "INACTIVE",
      leads: campaignData.leads,
      accountIDs: campaignData.accountIDs,
    };

    const response = await fetch(`${this.baseUrl}/campaign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create campaign: ${response.status}`);
    }

    const createdCampaign: ApiCampaign = (await response.json()).data;
    return this.transformApiCampaign(createdCampaign);
  }

  async updateCampaign(
    id: string,
    campaignData: CreateCampaignRequest
  ): Promise<Campaign> {
    console.log("Updating campaign:", id, campaignData);

    const apiPayload: Omit<ApiCampaign, "id" | "createdAt" | "updatedAt"> = {
      name: campaignData.name,
      description: campaignData.description,
      status: campaignData.status.toUpperCase() as "ACTIVE" | "INACTIVE",
      leads: campaignData.leads,
      accountIDs: campaignData.accountIDs,
    };

    const response = await fetch(`${this.baseUrl}/campaign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update campaign: ${response.status}`);
    }

    const updatedCampaign: ApiCampaign = (await response.json()).data;
    return this.transformApiCampaign(updatedCampaign);
  }

  async deleteCampaign(id: string): Promise<void> {
    console.log("Deleting campaign:", id);

    const response = await fetch(`${this.baseUrl}/campaign/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete campaign: ${response.status}`);
    }
  }

  private transformApiCampaign(apiCampaign: ApiCampaign): Campaign {
    return {
      id: apiCampaign.id || "",
      name: apiCampaign.name,
      description: apiCampaign.description,
      status: apiCampaign.status.toUpperCase() as "ACTIVE" | "INACTIVE",
      leads: apiCampaign.leads || [],
      accountIDs: apiCampaign.accountIDs || [],
      createdAt: apiCampaign.createdAt || new Date().toISOString(),
      updatedAt: apiCampaign.updatedAt || new Date().toISOString(),
    };
  }
}

export const campaignApi = new CampaignApiService();
