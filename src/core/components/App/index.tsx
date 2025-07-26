import { LoadStores } from '@/core/components/LoadStores/LoadStores';
import { Router } from '@/core/components/Router';
import { NotificationControl } from '@/core/components/NotificationControl';
import { Toaster } from '@/core/components/ui/sonner';
import '@/core/styles/global.css';

export const App: React.FC = () => (
  <>
    <LoadStores />
    <Router />
    <Toaster />
    <NotificationControl />
  </>
);
