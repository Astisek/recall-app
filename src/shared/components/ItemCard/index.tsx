import { Card, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { useTranslation } from 'react-i18next';
import s from './styles.module.css';
import { cn } from '@/core/lib/utils';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/core/components/ui/button';
import { Pencil, Share2, Trash } from 'lucide-react';

interface ItemCardProps {
  title: string;
  directoryChildren?: IFileTreeNode[];
  isDirectory: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  directoryChildren = [],
  title,
  isDirectory,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('mainPage');

  const handleOpenCard = useCallback(
    () => navigate(`${location.pathname}${title}/`),
    [location.pathname, navigate, title],
  );

  const { directories, items } = useMemo(() => {
    return directoryChildren.reduce(
      (acc, item) => {
        const checkItem = (fileTree: IFileTreeNode) => {
          if (fileTree.isDirectory) {
            acc.directories++;
            fileTree.children?.forEach(checkItem);
          } else {
            acc.items++;
          }
        };
        checkItem(item);

        return acc;
      },
      { items: 0, directories: 0 },
    );
  }, [directoryChildren]);

  const itemsText = `${t('itemCard.tag', { count: directories })}, ${t('itemCard.item', { count: items })}`;

  return (
    <Card
      className={cn(
        'relative group overflow-hidden transition-shadow hover:shadow-primary',
        s.root,
        { 'cursor-pointer': isDirectory },
      )}
      onClick={isDirectory ? handleOpenCard : undefined}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardFooter>
        <p className="text-secondary">{isDirectory ? itemsText : ''}</p>
      </CardFooter>

      <div className={s.actions}>
        <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="destructive" onClick={(e) => e.stopPropagation()}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
