import { routerLinks } from '@/core/data/router';
import { HomePage } from '@/modules/HomePage/containers/HomePage';
import { HashRouter, Route, Routes } from 'react-router';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routerLinks.home} Component={HomePage} />
      </Routes>
    </HashRouter>
  );
};
