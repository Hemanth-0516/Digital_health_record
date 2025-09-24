import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Search, QrCode, UserCheck, Activity, FileText, Plus } from 'lucide-react';

const ClinicPortal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'qr' | 'phone' | 'name'>('qr');

  const recentPatients = [
    {
      id: '1',
      name: 'Raju Kumar',
      qr_code: 'KL-MH-2025-001',
      last_visit: '2025-01-10',
      condition: 'URTI'
    },
    {
      id: '2',
      name: 'Sunita Devi',
      qr_code: 'KL-MH-2025-002',
      last_visit: '2025-01-08',
      condition: 'Antenatal Care'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Clinic Portal</h1>
          <p className="text-green-100">
            Access migrant worker health records and create new encounters
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Today's Patients
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Cases
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">156</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Records Created
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">89</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <QrCode className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      QR Scans
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">234</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Search */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Find Patient</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex space-x-3">
                <button
                  onClick={() => setSearchType('qr')}
                  className={`px-3 py-2 text-sm rounded-md ${
                    searchType === 'qr'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  QR Code
                </button>
                <button
                  onClick={() => setSearchType('phone')}
                  className={`px-3 py-2 text-sm rounded-md ${
                    searchType === 'phone'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Phone
                </button>
                <button
                  onClick={() => setSearchType('name')}
                  className={`px-3 py-2 text-sm rounded-md ${
                    searchType === 'name'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Name
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={
                    searchType === 'qr' ? 'Enter QR code...' :
                    searchType === 'phone' ? 'Enter phone number...' :
                    'Enter patient name...'
                  }
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Search Patient
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  <QrCode className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">New Encounter</span>
                </div>
                <span className="text-xs text-gray-500">Create health record</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Lab Results</span>
                </div>
                <span className="text-xs text-gray-500">View recent results</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Referrals</span>
                </div>
                <span className="text-xs text-gray-500">Manage referrals</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Patients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">ID: {patient.qr_code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{patient.condition}</p>
                    <p className="text-sm text-gray-500">
                      Last visit: {new Date(patient.last_visit).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClinicPortal;