
import React, { useState } from 'react';
import { LinkedInProfile, MessageGenerationRequest } from '../types/campaign';
import { Send, Copy, Wand2, MessageSquare } from 'lucide-react';

const LinkedInMessageGenerator: React.FC = () => {
  const [profileData, setProfileData] = useState<LinkedInProfile>({
    name: 'John Doe',
    job_title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    summary: 'Experienced in AI & ML with 8+ years in full-stack development. Passionate about building scalable web applications.',
  });

  const [campaignType, setCampaignType] = useState('networking');
  const [tone, setTone] = useState('professional');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof LinkedInProfile, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const generateMessage = async () => {
    setIsGenerating(true);
    
    // Log the payload that would be sent to the API
    console.log('LinkedIn Profile Payload:', {
      name: profileData.name,
      job_title: profileData.job_title,
      company: profileData.company,
      location: profileData.location,
      summary: profileData.summary
    });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated message based on the input
    const messages = {
      networking: {
        professional: `Hi ${profileData.name.split(' ')[0]},

I noticed your impressive work as ${profileData.job_title} at ${profileData.company}. Your background in ${profileData.summary.toLowerCase()} particularly caught my attention.

As someone also passionate about innovation in tech, I'd love to connect and potentially explore collaboration opportunities.

Would you be open to connecting?

Best regards`,
        casual: `Hey ${profileData.name.split(' ')[0]}! 👋

Saw your profile - really impressive work as ${profileData.job_title} at ${profileData.company}! Your experience with ${profileData.summary.toLowerCase()} sounds fascinating.

Would love to connect with someone who shares similar interests!

Cheers`,
        formal: `Dear ${profileData.name},

I hope this message finds you well. I came across your profile and was impressed by your professional achievements as ${profileData.job_title} at ${profileData.company}.

Given your expertise described as "${profileData.summary}", I believe there could be valuable opportunities for professional collaboration.

I would be honored to connect with you on LinkedIn.

Respectfully yours`
      },
      sales: {
        professional: `Hi ${profileData.name.split(' ')[0]},

I've been following ${profileData.company}'s growth. Your role as ${profileData.job_title} caught my attention, especially given your background in ${profileData.summary.toLowerCase()}.

I work with companies like yours to streamline their processes and reduce costs by up to 30%. Given your expertise, I thought this might be relevant to your current initiatives.

Would you be interested in a brief 15-minute conversation to explore how this could benefit ${profileData.company}?

Best regards`,
        casual: `Hi ${profileData.name.split(' ')[0]}!

Love what you're doing at ${profileData.company}! Your background as ${profileData.job_title} really caught my attention.

I help companies boost their efficiency - thought you might find it interesting given your experience with ${profileData.summary.toLowerCase()}.

Quick 15-min chat? I promise it'll be worth your time! 😊`,
        formal: `Dear ${profileData.name},

I trust this message finds you in good health and spirits. I am reaching out regarding an opportunity that may be of significant interest to ${profileData.company}.

Our solutions have helped similar organizations achieve remarkable improvements in operational efficiency. Given your position as ${profileData.job_title} and expertise in ${profileData.summary.toLowerCase()}, I believe this could align well with your strategic objectives.

Would you consider scheduling a brief consultation to discuss potential synergies?

With utmost respect`
      }
    };

    const selectedMessage = messages[campaignType as keyof typeof messages]?.[tone as keyof typeof messages.networking] || 
                          messages.networking.professional;

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LinkedIn Message Generator</h1>
        <p className="text-gray-600">
          Generate personalized LinkedIn messages using AI based on prospect profiles
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
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              onChange={(e) => handleInputChange('job_title', e.target.value)}
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
              onChange={(e) => handleInputChange('company', e.target.value)}
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
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Type
              </label>
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="networking">Networking</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              value={profileData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
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
                <p className="text-sm">Fill in the profile data and click "Generate Message" to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInMessageGenerator;
