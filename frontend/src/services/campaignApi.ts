import { API_CONFIG } from "../config/env";
import { Campaign, CreateCampaignRequest } from "../types/campaign";

export interface ApiCampaign {
  id?: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  leads?: string[];
  accountIDs?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class CampaignApiService {
  private baseUrl = API_CONFIG.BASE_URL;

  async getAllCampaigns(): Promise<Campaign[]> {
    console.log(this.baseUrl);
    const response = await fetch(`${this.baseUrl}/campaign`);

    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns: ${response.status}`);
    }

    const apiCampaigns: { data: ApiCampaign[] } = await response.json();
    return apiCampaigns.data.map(this.transformApiCampaign);
  }

  async getCampaignById(id: string): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/campaign/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status}`);
    }

    const apiCampaign: { data: ApiCampaign } = await response.json();
    return this.transformApiCampaign(apiCampaign.data);
  }

  async createCampaign(campaignData: CreateCampaignRequest): Promise<Campaign> {
    const apiPayload: Omit<ApiCampaign, "id" | "createdAt" | "updatedAt"> = {
      name: campaignData.name,
      description: campaignData.description,
      status: campaignData.status.toLowerCase() as "active" | "inactive",
      leads: [],
      accountIDs: [],
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

    const createdCampaign: { data: ApiCampaign } = await response.json();
    return this.transformApiCampaign(createdCampaign.data);
  }

  async updateCampaign(
    id: string,
    campaignData: CreateCampaignRequest
  ): Promise<Campaign> {
    const apiPayload: Omit<ApiCampaign, "id" | "createdAt" | "updatedAt"> = {
      name: campaignData.name,
      description: campaignData.description,
      status: campaignData.status.toLowerCase() as "active" | "inactive",
      leads: [],
      accountIDs: [],
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

    const updatedCampaign: { data: ApiCampaign } = await response.json();
    return this.transformApiCampaign(updatedCampaign.data);
  }

  async deleteCampaign(id: string): Promise<void> {
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
      createdAt: apiCampaign.createdAt || new Date().toISOString(),
      updatedAt: apiCampaign.updatedAt || new Date().toISOString(),
    };
  }
}

export const campaignApi = new CampaignApiService();
