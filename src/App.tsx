import React, { useState } from 'react';
import { ApplicationLayout } from './components/ApplicationLayout';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <ApplicationLayout />;
}

