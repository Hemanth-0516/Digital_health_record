import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import Layout from '../layout/Layout';
import { Users, FileText, Shield, Activity, Plus, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useApp();

  const stats = [
    {
      name: 'Total Migrants',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Recent Encounters',
      value: '89',
      change: '+23%',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      name: 'Pending Sync',
      value: '5',
      change: '-8%',
      icon: Activity,
      color: 'bg-yellow-500'
    },
    {
      name: 'Active Consents',
      value: '1,156',
      change: '+5%',
      icon: Shield,
      color: 'bg-purple-500'
    }
  ];

  const quickActions = [
    {
      name: 'Register Migrant',
      description: 'Register a new migrant worker',
      icon: Plus,
      href: '/register-migrant',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Scan QR Code',
      description: 'Access records via QR code',
      icon: QrCode,
      href: '/scan-qr',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Health Records',
      description: 'View and manage health records',
      icon: FileText,
      href: '/health-records',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Consent Management',
      description: 'Manage data sharing consent',
      icon: Shield,
      href: '/consent',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-6">
          <h1 className="text-2xl font-bold mb-2">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-blue-100">
            {user?.role === 'field_worker' && 'Manage migrant registrations and basic health records'}
            {user?.role === 'clinician' && 'Access comprehensive health records and create encounters'}
            {user?.role === 'admin' && 'Oversee system operations and manage user permissions'}
            {user?.role === 'employer' && 'View aggregated health metrics for your workforce'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-md p-3`}>
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`${action.color} text-white p-4 rounded-lg transition-colors group`}
                >
                  <action.icon className="h-8 w-8 mb-2" />
                  <h4 className="font-medium text-sm">{action.name}</h4>
                  <p className="text-xs opacity-90 mt-1">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {[
                  {
                    id: 1,
                    content: 'New migrant worker registered: Raju Kumar from Bihar',
                    target: 'Registration',
                    time: '2 hours ago'
                  },
                  {
                    id: 2,
                    content: 'Health encounter recorded for migrant ID: MH-2025-001',
                    target: 'Health Record',
                    time: '4 hours ago'
                  },
                  {
                    id: 3,
                    content: 'Consent updated for data sharing permissions',
                    target: 'Consent',
                    time: '6 hours ago'
                  }
                ].map((item, itemIdx) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {itemIdx !== 2 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <Activity className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{item.content}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              {item.target}
                            </span>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{item.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;