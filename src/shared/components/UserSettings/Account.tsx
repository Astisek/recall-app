import { useTranslation } from 'react-i18next';
import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';

export const Account: React.FC = () => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-2">
      <Label>{t('auth.auth')}</Label>
      <div className="flex gap-2">
        <Button disabled>{t('auth.signIn')}</Button>
        <Button disabled>{t('auth.signUp')}</Button>
      </div>
    </div>
  );
};
