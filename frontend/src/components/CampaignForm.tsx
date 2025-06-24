import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Campaign, CreateCampaignRequest } from "../types/campaign";
import AccountIDInput from "./campaign/AccountIDInput";
import CampaignFormFields from "./campaign/CampaignFormFields";
import LeadInput from "./campaign/LeadInput";

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (data: CreateCampaignRequest) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  onSubmit,
  onCancel,
  isOpen,
}) => {
  const [formData, setFormData] = useState<CreateCampaignRequest>({
    name: "",
    description: "",
    status: "INACTIVE",
    leads: [],
    accountIDs: [],
  });

  const [newLead, setNewLead] = useState("");
  const [newAccountID, setNewAccountID] = useState("");

  // Reset form when modal opens/closes or campaign changes
  useEffect(() => {
    if (isOpen) {
      if (campaign) {
        console.log("Editing campaign:", campaign);
        setFormData({
          name: campaign.name,
          description: campaign.description,
          status: campaign.status,
          leads: [...(campaign.leads || [])],
          accountIDs: [...(campaign.accountIDs || [])],
        });
      } else {
        console.log("Creating new campaign");
        setFormData({
          name: "",
          description: "",
          status: "INACTIVE",
          leads: [],
          accountIDs: [],
        });
      }
      // Reset input fields
      setNewLead("");
      setNewAccountID("");
    }
  }, [campaign, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting campaign data:", formData);
    onSubmit(formData);
  };

  const addLead = () => {
    const trimmedLead = newLead.trim();
    console.log("Adding lead:", trimmedLead);

    if (trimmedLead && !formData.leads.includes(trimmedLead)) {
      const updatedLeads = [...formData.leads, trimmedLead];
      setFormData((prev) => ({ ...prev, leads: updatedLeads }));
      setNewLead("");
      console.log("Updated leads:", updatedLeads);
    } else if (formData.leads.includes(trimmedLead)) {
      console.log("Lead already exists:", trimmedLead);
    }
  };

  const removeLead = (index: number) => {
    console.log("Removing lead at index:", index);
    const updatedLeads = formData.leads.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, leads: updatedLeads }));
    console.log("Updated leads after removal:", updatedLeads);
  };

  const addAccountID = () => {
    const trimmedAccountID = newAccountID.trim();
    console.log("Adding account ID:", trimmedAccountID);

    if (trimmedAccountID && !formData.accountIDs.includes(trimmedAccountID)) {
      const updatedAccountIDs = [...formData.accountIDs, trimmedAccountID];
      setFormData((prev) => ({ ...prev, accountIDs: updatedAccountIDs }));
      setNewAccountID("");
      console.log("Updated account IDs:", updatedAccountIDs);
    } else if (formData.accountIDs.includes(trimmedAccountID)) {
      console.log("Account ID already exists:", trimmedAccountID);
    }
  };

  const removeAccountID = (index: number) => {
    console.log("Removing account ID at index:", index);
    const updatedAccountIDs = formData.accountIDs.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, accountIDs: updatedAccountIDs }));
    console.log("Updated account IDs after removal:", updatedAccountIDs);
  };

  const handleLeadKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLead();
    }
  };

  const handleAccountIDKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAccountID();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {campaign ? "Edit Campaign" : "Create New Campaign"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <CampaignFormFields
            formData={formData}
            onFormDataChange={setFormData}
          />

          <LeadInput
            leads={formData.leads}
            newLead={newLead}
            onNewLeadChange={setNewLead}
            onAddLead={addLead}
            onRemoveLead={removeLead}
            onKeyPress={handleLeadKeyPress}
          />

          <AccountIDInput
            accountIDs={formData.accountIDs}
            newAccountID={newAccountID}
            onNewAccountIDChange={setNewAccountID}
            onAddAccountID={addAccountID}
            onRemoveAccountID={removeAccountID}
            onKeyPress={handleAccountIDKeyPress}
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {campaign ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
