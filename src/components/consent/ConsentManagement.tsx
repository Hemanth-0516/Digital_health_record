import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Shield, Check, X, AlertCircle, Info } from 'lucide-react';

interface ConsentItem {
  id: string;
  title: string;
  description: string;
  granted: boolean;
  required: boolean;
  lastUpdated: string;
}

const ConsentManagement: React.FC = () => {
  const [consents, setConsents] = useState<ConsentItem[]>([
    {
      id: 'facility_sharing',
      title: 'Share with Healthcare Facilities',
      description: 'Allow healthcare providers to access your health records for treatment purposes',
      granted: true,
      required: false,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'surveillance',
      title: 'Public Health Surveillance',
      description: 'Share anonymized health data for disease surveillance and public health monitoring',
      granted: true,
      required: true,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'research',
      title: 'Research Participation',
      description: 'Use anonymized health data for medical research and health system improvement',
      granted: false,
      required: false,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'emergency',
      title: 'Emergency Access',
      description: 'Allow emergency healthcare providers to access your records in medical emergencies',
      granted: true,
      required: false,
      lastUpdated: '2025-01-10'
    }
  ]);

  const handleConsentToggle = (consentId: string) => {
    setConsents(prev => prev.map(consent => {
      if (consent.id === consentId && !consent.required) {
        return {
          ...consent,
          granted: !consent.granted,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return consent;
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold mb-2">Consent Management</h1>
              <p className="text-blue-100">
                Control how your health data is shared and used
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Your Privacy Rights</p>
              <p>
                You have control over how your health information is shared. You can grant or revoke 
                consent at any time, except for legally required public health surveillance. 
                All data sharing is logged and auditable.
              </p>
            </div>
          </div>
        </div>

        {/* Consent Cards */}
        <div className="space-y-4">
          {consents.map((consent) => (
            <div key={consent.id} className="bg-white shadow rounded-lg border border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {consent.title}
                      </h3>
                      {consent.required && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {consent.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(consent.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="ml-6 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      {consent.granted ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Check className="h-5 w-5" />
                          <span className="text-sm font-medium">Granted</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-red-600">
                          <X className="h-5 w-5" />
                          <span className="text-sm font-medium">Not Granted</span>
                        </div>
                      )}
                      
                      {!consent.required && (
                        <button
                          onClick={() => handleConsentToggle(consent.id)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            consent.granted
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {consent.granted ? 'Revoke' : 'Grant'}
                        </button>
                      )}
                      
                      {consent.required && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs">Cannot change</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Log Preview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Consent Activity</h2>
            <p className="text-sm text-gray-500">Track changes to your consent preferences</p>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                action: 'Granted consent for healthcare facility sharing',
                timestamp: '2025-01-10 10:30 AM',
                user: 'Self'
              },
              {
                id: 2,
                action: 'Revoked consent for research participation',
                timestamp: '2025-01-09 02:15 PM',
                user: 'Self'
              },
              {
                id: 3,
                action: 'Initial consent preferences set during registration',
                timestamp: '2025-01-08 09:45 AM',
                user: 'Field Worker (Priya Nair)'
              }
            ].map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By: {activity.user}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Legal Information</h3>
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              • Your personal health information is protected under applicable privacy laws and regulations.
            </p>
            <p>
              • You have the right to access, correct, or request deletion of your personal data.
            </p>
            <p>
              • Public health surveillance may require certain data sharing for legal compliance.
            </p>
            <p>
              • Emergency access allows healthcare providers to access your records in life-threatening situations.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConsentManagement;