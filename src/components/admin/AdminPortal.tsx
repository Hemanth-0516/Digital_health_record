import React from 'react';
import Layout from '../layout/Layout';
import { 
  Users, 
  Activity, 
  Shield, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  MapPin
} from 'lucide-react';

const AdminPortal: React.FC = () => {
  const systemStats = {
    totalMigrants: 12470,
    activeUsers: 245,
    systemHealth: 99.2,
    syncStatus: 'Good'
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'outbreak',
      message: 'Potential fever cluster detected in Ernakulam district',
      time: '2 hours ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'sync',
      message: 'Sync failed for 3 devices in Alappuzha',
      time: '4 hours ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'capacity',
      message: 'PHC Kochi approaching capacity limits',
      time: '6 hours ago',
      severity: 'medium'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white p-6">
          <h1 className="text-2xl font-bold mb-2">System Administration</h1>
          <p className="text-purple-100">
            Monitor system health, manage users, and oversee operations
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Migrants
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {systemStats.totalMigrants.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        12%
                      </div>
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
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Users
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {systemStats.activeUsers}
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
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      System Health
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {systemStats.systemHealth}%
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
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sync Status
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {systemStats.syncStatus}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">System Alerts</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  3 Active
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.severity === 'high' ? 'text-red-500' :
                        alert.severity === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {alert.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Overview */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">District Overview</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {[
                  { name: 'Ernakulam', migrants: 3245, facilities: 45, color: 'bg-blue-500' },
                  { name: 'Thrissur', migrants: 2890, facilities: 38, color: 'bg-green-500' },
                  { name: 'Alappuzha', migrants: 2156, facilities: 32, color: 'bg-purple-500' },
                  { name: 'Kottayam', migrants: 1876, facilities: 28, color: 'bg-orange-500' }
                ].map((district) => (
                  <div key={district.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${district.color}`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{district.name}</p>
                        <p className="text-xs text-gray-500">{district.facilities} facilities</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {district.migrants.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">migrants</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Management Actions</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">User Management</p>
                  <p className="text-xs text-gray-500">Manage user accounts & roles</p>
                </div>
              </button>

              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Analytics</p>
                  <p className="text-xs text-gray-500">View system analytics</p>
                </div>
              </button>

              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="text-center">
                  <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">System Settings</p>
                  <p className="text-xs text-gray-500">Configure system parameters</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPortal;