import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { offlineService } from '../services/offlineService';
import { useApp } from './AppContext';

interface OfflineContextType {
  isOnline: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  pendingChanges: number;
  sync: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [pendingChanges, setPendingChanges] = useState(0);
  const { setOfflineStatus, addNotification } = useApp();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOfflineStatus(false);
      addNotification({
        type: 'success',
        message: 'Connection restored. Syncing data...'
      });
      sync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOfflineStatus(true);
      addNotification({
        type: 'warning',
        message: 'Working offline. Data will sync when connection is restored.'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial online status
    setOfflineStatus(!navigator.onLine);

    // Check for pending changes
    updatePendingChanges();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOfflineStatus, addNotification]);

  const updatePendingChanges = async () => {
    try {
      const count = await offlineService.getPendingChangesCount();
      setPendingChanges(count);
    } catch (error) {
      console.error('Error getting pending changes count:', error);
    }
  };

  const sync = async () => {
    if (!isOnline || syncStatus === 'syncing') return;

    setSyncStatus('syncing');
    try {
      await offlineService.syncPendingChanges();
      setSyncStatus('success');
      await updatePendingChanges();
      addNotification({
        type: 'success',
        message: 'Data synchronized successfully'
      });
    } catch (error) {
      setSyncStatus('error');
      addNotification({
        type: 'error',
        message: 'Sync failed. Will retry automatically.'
      });
      console.error('Sync error:', error);
    }
  };

  const value: OfflineContextType = {
    isOnline,
    syncStatus,
    pendingChanges,
    sync
  };

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
};

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};