import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { OfflineProvider } from './contexts/OfflineContext';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppProvider>
          <AuthProvider>
            <OfflineProvider>
              <AppRoutes />
            </OfflineProvider>
          </AuthProvider>
        </AppProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;