import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { useTranslation } from 'react-i18next';

export const Folder: React.FC = () => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">{t('folder.label')}</Label>
      <p className="text-muted-foreground text-sm">{t('folder.desc')}</p>
      <div className="flex items-center gap-2">
        <Input placeholder={t('folder.placeholder')} disabled />
        <Button variant="outline">{t('folder.select')}</Button>
      </div>
    </div>
  );
};
