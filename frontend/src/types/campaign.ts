export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  leads: string[];
  accountIDs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignRequest {
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  leads: string[];
  accountIDs: string[];
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface MessageGenerationRequest extends LinkedInProfile {
  campaignType?: string;
  tone?: string;
}

export interface MessageGenerationResponse {
  message: string;
  success: boolean;
}
