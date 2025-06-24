import React from "react";
import { CreateCampaignRequest } from "../../types/campaign";

interface CampaignFormFieldsProps {
  formData: CreateCampaignRequest;
  onFormDataChange: (data: CreateCampaignRequest) => void;
}

const CampaignFormFields: React.FC<CampaignFormFieldsProps> = ({
  formData,
  onFormDataChange,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campaign Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            onFormDataChange({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            onFormDataChange({ ...formData, description: e.target.value })
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            onFormDataChange({
              ...formData,
              status: e.target.value.toUpperCase() as "ACTIVE" | "INACTIVE",
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="INACTIVE">Inactive</option>
          <option value="ACTIVE">Active</option>
        </select>
      </div>
    </>
  );
};

export default CampaignFormFields;
