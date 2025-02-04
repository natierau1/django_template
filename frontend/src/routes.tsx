import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SparkPage from './pages/spark';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<div>Home</div>} />
        <Route path="spark" element={<SparkPage />} />
        {/* Add other routes as needed */}
      </Route>
    </Routes>
  );
}