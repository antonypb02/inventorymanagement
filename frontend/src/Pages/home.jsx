import React from 'react';
import { useAuth } from './auth';
import Login from './login';
import Dashboard from './dashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Login />;

  return children;
};

function Home() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

export default Home;
