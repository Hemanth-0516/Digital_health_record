import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { translations } from '../utils/translations';

interface AppState {
  language: string;
  theme: 'light' | 'dark';
  notifications: Notification[];
  isOffline: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

interface AppContextType extends AppState {
  setLanguage: (language: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  t: (key: string) => string;
  setOfflineStatus: (isOffline: boolean) => void;
}

type AppAction = 
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_OFFLINE_STATUS'; payload: boolean };

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return { ...state, language: action.payload };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    case 'SET_OFFLINE_STATUS':
      return { ...state, isOffline: action.payload };
    default:
      return state;
  }
};

const initialState: AppState = {
  language: localStorage.getItem('language') || 'en',
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  notifications: [],
  isOffline: false
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLanguage = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: newNotification.id });
    }, 5000);
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const setOfflineStatus = (isOffline: boolean) => {
    dispatch({ type: 'SET_OFFLINE_STATUS', payload: isOffline });
  };

  const t = (key: string): string => {
    return translations[state.language]?.[key] || translations.en[key] || key;
  };

  const value: AppContextType = {
    ...state,
    setLanguage,
    setTheme,
    addNotification,
    removeNotification,
    setOfflineStatus,
    t
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};