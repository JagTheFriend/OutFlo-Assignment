import { Copy, MessageSquare, Send, Wand2 } from "lucide-react";
import React, { useState } from "react";
import { LinkedInProfile } from "../types/campaign";

const LinkedInMessageGenerator: React.FC = () => {
  const [profileData, setProfileData] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });

  const [campaignType, setCampaignType] = useState("networking");
  const [tone, setTone] = useState("professional");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof LinkedInProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const generateMessage = async () => {
    setIsGenerating(true);

    // Log the payload that would be sent to the API
    console.log("LinkedIn Profile Payload:", {
      name: profileData.name,
      job_title: profileData.job_title,
      company: profileData.company,
      location: profileData.location,
      summary: profileData.summary,
    });

    const data = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/personalized-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileData.name,
          job_title: profileData.job_title,
          company: profileData.company,
          location: profileData.location,
          summary: profileData.summary,
        }),
      }
    );
    const selectedMessage = (await data.json()).data;
    setGeneratedMessage(selectedMessage);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          LinkedIn Message Generator
        </h1>
        <p className="text-gray-600">
          Generate personalized LinkedIn messages using AI based on prospect
          profiles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">LinkedIn Profile Data</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={profileData.job_title}
              onChange={(e) => handleInputChange("job_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              value={profileData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              value={profileData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={generateMessage}
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Message
              </>
            )}
          </button>
        </div>

        {/* Generated Message */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Generated Message</h2>
            {generatedMessage && (
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
            )}
          </div>

          {generatedMessage ? (
            <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                {generatedMessage}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg mb-2">No message generated yet</p>
                <p className="text-sm">
                  Fill in the profile data and click "Generate Message" to get
                  started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInMessageGenerator;
