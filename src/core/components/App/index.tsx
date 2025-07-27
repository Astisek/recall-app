import { LoadStores } from '@/core/components/LoadStores/LoadStores';
import { NotificationControl } from '@/core/components/NotificationControl';
import { Router } from '@/core/components/Router';
import { ThemeProvider } from '@/core/components/ThemeProvider';
import { Toaster } from '@/core/components/ui/sonner';
import '@/core/styles/global.css';

export const App: React.FC = () => (
  <ThemeProvider>
    <LoadStores />
    <Router />
    <Toaster />
    <NotificationControl />
  </ThemeProvider>
);
