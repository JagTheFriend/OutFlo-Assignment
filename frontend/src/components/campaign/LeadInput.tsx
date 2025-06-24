import { Plus, Trash2 } from "lucide-react";
import React from "react";

interface LeadInputProps {
  leads: string[];
  newLead: string;
  onNewLeadChange: (value: string) => void;
  onAddLead: () => void;
  onRemoveLead: (index: number) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const LeadInput: React.FC<LeadInputProps> = ({
  leads,
  newLead,
  onNewLeadChange,
  onAddLead,
  onRemoveLead,
  onKeyPress,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        LinkedIn URLs (Leads) - {leads.length} added
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="url"
          value={newLead}
          onChange={(e) => onNewLeadChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="https://linkedin.com/in/username"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <button
          type="button"
          onClick={onAddLead}
          disabled={!newLead.trim()}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {leads.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-50">
          {leads.map((lead, index) => (
            <div
              key={`lead-${index}-${lead}`}
              className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm"
            >
              <span className="flex-1 text-sm truncate" title={lead}>
                {lead}
              </span>
              <button
                type="button"
                onClick={() => onRemoveLead(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadInput;
