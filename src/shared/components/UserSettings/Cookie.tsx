import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { ElectronEventEnum } from '@/electron/data/events';
import { useNotification } from '@/shared/hooks/useNotification';
import { NotificationCategoryEnum } from '@/shared/models/notification';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Cookie: React.FC = () => {
  const { cookie, setCookie } = useUserSettingsStore();
  const { t: settingsT } = useTranslation('settings');
  const { t: notificationT } = useTranslation('notification');
  const { showNotification } = useNotification();

  const [inputCookie, setInputCookie] = useState(cookie);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setCookie(inputCookie);
    await window.ipcRenderer.invoke(ElectronEventEnum.YoutubeSetCookie, inputCookie);

    showNotification({
      title: notificationT('settings.cookieSaved'),
      category: NotificationCategoryEnum.Success,
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-2 max-w-xl">
      <div className="flex items-center gap-2">
        <Label htmlFor="yt-cookie" className="text-base">
          {settingsT('cookie.label')}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-sm text-sm">
              <p>
                <strong>{settingsT('cookie.tooltipTitle')}</strong>
              </p>
              <ol className="list-decimal list-inside">
                <li>{settingsT('cookie.tooltipDesc1')}</li>
                <li>{settingsT('cookie.tooltipDesc2')}</li>
                <li>{settingsT('cookie.tooltipDesc3')}</li>
                <li>{settingsT('cookie.tooltipDesc4')}</li>
              </ol>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex gap-2">
        <Input
          id="yt-cookie"
          placeholder={settingsT('cookie.tooltipPlaceholder')}
          value={inputCookie}
          onChange={setInputCookie}
        />
        <Button onClick={handleSave} disabled={cookie === inputCookie} loading={isLoading}>
          {settingsT('cookie.save')}
        </Button>
      </div>
    </div>
  );
};
