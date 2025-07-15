import { routerLinks } from '@/core/data/router';
import { HomePage } from '@/modules/HomePage/components/HomePage';
import { HashRouter, Navigate, Route, Routes } from 'react-router';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routerLinks.home('*')} Component={HomePage} />
        <Route path="*" element={<Navigate to={routerLinks.home()} replace />} />
      </Routes>
    </HashRouter>
  );
};
