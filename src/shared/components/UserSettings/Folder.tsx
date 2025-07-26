import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/core/components/ui/tooltip';
import { ElectronEventEnum } from '@/electron/data/events';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useTranslation } from 'react-i18next';

export const Folder: React.FC = () => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { directoryPath, setDirectoryPath } = useUserSettingsStore();
  const { t } = useTranslation('settings');

  const handleOpenDirectory = () =>
    window.ipcRenderer.invoke(ElectronEventEnum.OpenDirectory, directoryPath);

  const handleClickDirectoryPicker = async () => {
    const directoryPath: string = await window.ipcRenderer.invoke(
      ElectronEventEnum.SelectDirectory,
    );
    if (!directoryPath) return;

    setDirectoryPath(directoryPath);
    await window.ipcRenderer.invoke(ElectronEventEnum.SetDirectory, directoryPath);

    await updateDirectoryTree(directoryPath);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">{t('folder.label')}</Label>
      <p className="text-muted-foreground text-sm">{t('folder.desc')}</p>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Input placeholder={t('folder.placeholder')} disabled value={directoryPath} />
          </TooltipTrigger>
          <TooltipContent>{directoryPath}</TooltipContent>
        </Tooltip>

        <Button variant="outline" onClick={handleClickDirectoryPicker}>
          {t('folder.select')}
        </Button>
      </div>
      {!!directoryPath && (
        <div className="mt-1">
          <Button onClick={handleOpenDirectory} variant="outline">
            {t('folder.openDirectory')}
          </Button>
        </div>
      )}
    </div>
  );
};
