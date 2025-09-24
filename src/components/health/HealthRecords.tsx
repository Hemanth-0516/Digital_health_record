import React from 'react';
import Layout from '../layout/Layout';
import { FileText, Plus, Filter, Download } from 'lucide-react';

const HealthRecords: React.FC = () => {
  // Mock health records data
  const records = [
    {
      id: 'rec-001',
      migrant_name: 'Raju Kumar',
      encounter_date: '2025-01-10',
      chief_complaint: 'Fever and cough for 3 days',
      diagnosis: 'Upper Respiratory Tract Infection',
      facility: 'PHC Kochi',
      provider: 'Dr. Priya Nair'
    },
    {
      id: 'rec-002',
      migrant_name: 'Amit Singh',
      encounter_date: '2025-01-09',
      chief_complaint: 'Back pain from work injury',
      diagnosis: 'Lumbar strain',
      facility: 'District Hospital Ernakulam',
      provider: 'Dr. Rajesh Kumar'
    },
    {
      id: 'rec-003',
      migrant_name: 'Sunita Devi',
      encounter_date: '2025-01-08',
      chief_complaint: 'Routine antenatal checkup',
      diagnosis: 'Normal pregnancy - 28 weeks',
      facility: 'CHC Alappuzha',
      provider: 'Dr. Maya Joseph'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
            <p className="text-gray-600">View and manage migrant worker health records</p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Record
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Records
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      1,247
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      This Month
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      89
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Review
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      12
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Health Records
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Latest health encounters and medical records
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {records.map((record) => (
              <li key={record.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-10 w-10 text-blue-600 bg-blue-100 rounded-full p-2" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {record.migrant_name}
                        </p>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {record.facility}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {record.chief_complaint}
                      </p>
                      <p className="text-xs text-gray-400">
                        {record.provider} • {new Date(record.encounter_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {record.diagnosis}
                    </p>
                    <p className="text-sm text-gray-500">
                      Record ID: {record.id}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Load More */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
              Load more records
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthRecords;