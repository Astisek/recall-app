import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { EventEnum } from '@/electron/data/events';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useTranslation } from 'react-i18next';

export const Folder: React.FC = () => {
  const { folderPath, updateFolderPath } = useUserSettingsStore();
  const { setTree } = useFileTreeStore();
  const { t } = useTranslation('settings');

  const handleClickDirectoryPicker = async () => {
    try {
      const { directory, tree } = (await window.ipcRenderer.invoke(EventEnum.SelectDirectory)) as {
        directory: string;
        tree: IFileTreeNode[];
      };
      updateFolderPath(directory);
      setTree(tree);
    } catch (e) {
      // TODO: Add something (noification)
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">{t('folder.label')}</Label>
      <p className="text-muted-foreground text-sm">{t('folder.desc')}</p>
      <div className="flex items-center gap-2">
        <Input placeholder={t('folder.placeholder')} disabled value={folderPath} />
        <Button variant="outline" onClick={handleClickDirectoryPicker}>
          {t('folder.select')}
        </Button>
      </div>
    </div>
  );
};
