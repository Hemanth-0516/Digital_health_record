import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { offlineService } from '../../services/offlineService';
import Layout from '../layout/Layout';
import QRCodeDisplay from '../common/QRCodeDisplay';
import { User, Phone, MapPin, Calendar, Languages, Shield, FileText } from 'lucide-react';

interface Migrant {
  id: string;
  name: string;
  age: string;
  sex: string;
  phone: string;
  origin_state: string;
  current_address: string;
  languages: string[];
  employer?: string;
  qr_code: string;
  registration_date: string;
  consent_summary: {
    share_with_facility: boolean;
    share_for_surveillance: boolean;
    share_for_research: boolean;
  };
}

const MigrantProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [migrant, setMigrant] = useState<Migrant | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useApp();

  useEffect(() => {
    const loadMigrant = async () => {
      if (!id) return;
      
      try {
        const migrantData = await offlineService.getMigrant(id);
        if (migrantData) {
          setMigrant(migrantData);
        } else {
          addNotification({
            type: 'error',
            message: 'Migrant not found'
          });
        }
      } catch (error) {
        console.error('Error loading migrant:', error);
        addNotification({
          type: 'error',
          message: 'Failed to load migrant profile'
        });
      } finally {
        setLoading(false);
      }
    };

    loadMigrant();
  }, [id, addNotification]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!migrant) {
    return (
      <Layout>
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Migrant not found</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{migrant.name}</h1>
                <p className="text-sm text-gray-500">Migrant Worker Profile</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Registered</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(migrant.registration_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <p className="text-sm text-gray-900">{migrant.age} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sex</label>
                  <p className="text-sm text-gray-900">{migrant.sex}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Origin State</label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{migrant.origin_state}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Current Address</label>
                <p className="text-sm text-gray-900">{migrant.current_address}</p>
              </div>
              {migrant.employer && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Employer</label>
                  <p className="text-sm text-gray-900">{migrant.employer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Languages */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">Contact & Languages</h2>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{migrant.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Languages</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Languages className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {migrant.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <QRCodeDisplay value={migrant.qr_code} />
          </div>

          {/* Consent Status */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">Consent Status</h2>
              </div>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Share with Healthcare Facilities</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  migrant.consent_summary.share_with_facility
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {migrant.consent_summary.share_with_facility ? 'Granted' : 'Not Granted'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Share for Public Health Surveillance</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  migrant.consent_summary.share_for_surveillance
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {migrant.consent_summary.share_for_surveillance ? 'Granted' : 'Not Granted'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Share for Research (Anonymous)</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  migrant.consent_summary.share_for_research
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {migrant.consent_summary.share_for_research ? 'Granted' : 'Not Granted'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <FileText className="h-4 w-4 mr-2" />
                View Health Records
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Shield className="h-4 w-4 mr-2" />
                Manage Consent
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MigrantProfile;