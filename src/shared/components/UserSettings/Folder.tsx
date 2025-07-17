import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { ElectronEventEnum } from '@/electron/data/events';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useTranslation } from 'react-i18next';

export const Folder: React.FC = () => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { directoryPath, updateDirectoryPath } = useUserSettingsStore();
  const { t } = useTranslation('settings');

  const handleClickDirectoryPicker = async () => {
    try {
      const directoryPath: string = await window.ipcRenderer.invoke(
        ElectronEventEnum.SelectDirectory,
      );
      updateDirectoryPath(directoryPath);
      await window.ipcRenderer.invoke(ElectronEventEnum.SetDirectory, directoryPath);

      await updateDirectoryTree();
    } catch (e) {
      // TODO: Add something (noification)
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">{t('folder.label')}</Label>
      <p className="text-muted-foreground text-sm">{t('folder.desc')}</p>
      <div className="flex items-center gap-2">
        <Input placeholder={t('folder.placeholder')} disabled value={directoryPath} />
        <Button variant="outline" onClick={handleClickDirectoryPicker}>
          {t('folder.select')}
        </Button>
      </div>
    </div>
  );
};
