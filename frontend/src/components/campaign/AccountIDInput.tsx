import { Plus, Trash2 } from "lucide-react";
import React from "react";

interface AccountIDInputProps {
  accountIDs: string[];
  newAccountID: string;
  onNewAccountIDChange: (value: string) => void;
  onAddAccountID: () => void;
  onRemoveAccountID: (index: number) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const AccountIDInput: React.FC<AccountIDInputProps> = ({
  accountIDs,
  newAccountID,
  onNewAccountIDChange,
  onAddAccountID,
  onRemoveAccountID,
  onKeyPress,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Account IDs - {accountIDs.length} added
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newAccountID}
          onChange={(e) => onNewAccountIDChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter account ID"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <button
          type="button"
          onClick={onAddAccountID}
          disabled={!newAccountID.trim()}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {accountIDs.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-50">
          {accountIDs.map((accountID, index) => (
            <div
              key={`account-${index}-${accountID}`}
              className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm"
            >
              <span className="flex-1 text-sm">{accountID}</span>
              <button
                type="button"
                onClick={() => onRemoveAccountID(index)}
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

export default AccountIDInput;
