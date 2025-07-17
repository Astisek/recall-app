import { LoadStores } from '@/core/components/LoadStores/LoadStores';
import { Router } from '@/core/components/Router';
import '@/core/styles/global.css';

export const App: React.FC = () => (
  <>
    <LoadStores />
    <Router />
  </>
);
