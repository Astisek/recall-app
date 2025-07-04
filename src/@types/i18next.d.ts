import 'i18next';
import { resources } from '@/content/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
