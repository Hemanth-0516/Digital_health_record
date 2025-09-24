import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import {
  LayoutDashboard,
  UserPlus,
  FileText,
  Shield,
  Activity,
  Users,
  Settings,
  Building2
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { t } = useApp();

  const navigation = [
    {
      name: t('nav.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['field_worker', 'clinician', 'admin', 'employer']
    },
    {
      name: t('nav.register'),
      href: '/register-migrant',
      icon: UserPlus,
      roles: ['field_worker', 'clinician']
    },
    {
      name: t('nav.records'),
      href: '/health-records',
      icon: FileText,
      roles: ['field_worker', 'clinician', 'admin']
    },
    {
      name: t('nav.consent'),
      href: '/consent',
      icon: Shield,
      roles: ['field_worker', 'clinician', 'admin']
    },
    {
      name: t('nav.clinic'),
      href: '/clinic',
      icon: Activity,
      roles: ['clinician']
    },
    {
      name: 'Employer Portal',
      href: '/employer',
      icon: Building2,
      roles: ['employer']
    },
    {
      name: t('nav.admin'),
      href: '/admin',
      icon: Settings,
      roles: ['admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* User Role Badge */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 capitalize">
                {user?.role.replace('_', ' ')}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.organization}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;