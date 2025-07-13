import { LoadStores } from '@/core/containers/LoadStores/LoadStores';
import { Router } from '@/core/containers/Router';
import '@/core/styles/global.css';

export const App: React.FC = () => {
  return (
    <>
      <LoadStores />
      <Router />
    </>
  );
};
