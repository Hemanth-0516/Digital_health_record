import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useOffline } from '../../contexts/OfflineContext';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationToast from './NotificationToast';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { notifications } = useApp();
  const { isOnline, syncStatus } = useOffline();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-yellow-500 text-white px-4 py-2 text-center">
            <span className="text-sm font-medium">
              Working offline. Data will sync when connection is restored.
            </span>
          </div>
        )}
        
        {/* Sync Status Banner */}
        {syncStatus === 'syncing' && (
          <div className="bg-blue-500 text-white px-4 py-2 text-center">
            <span className="text-sm font-medium">
              Syncing data...
            </span>
          </div>
        )}
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Layout;