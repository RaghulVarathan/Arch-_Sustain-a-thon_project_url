import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { FactoriesPage } from './pages/FactoriesPage';
import { FactoryDetailPage } from './pages/FactoryDetailPage';
import { UploadPage } from './pages/UploadPage';
import { InvestigationsPage } from './pages/InvestigationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/factories" element={<FactoriesPage />} />
          <Route path="/factories/:id" element={<FactoryDetailPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/investigations" element={<InvestigationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
