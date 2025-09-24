import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useOffline } from '../../contexts/OfflineContext';
import { LogOut, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useApp();
  const { isOnline, syncStatus, pendingChanges, sync } = useOffline();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Kerala Migrant Health System
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              {pendingChanges > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {pendingChanges} pending
                </span>
              )}
            </div>
            
            {/* Sync Button */}
            {isOnline && (
              <button
                onClick={sync}
                disabled={syncStatus === 'syncing'}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              </button>
            )}
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500 capitalize">{user?.role.replace('_', ' ')}</div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                title={t('nav.logout')}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;