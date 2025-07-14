import { Card, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss';
import { cn } from '@/core/lib/utils';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

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
      className={cn('justify-between hover:shadow-primary transition-shadow', s.root, {
        ['cursor-pointer']: isDirectory,
      })}
      onClick={isDirectory ? handleOpenCard : undefined}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardAction className={s.actions}>
          <Button variant="ghost">
            <CrossIcon />
          </Button>
        </CardAction> */}
      </CardHeader>
      <CardFooter>
        <p className="text-secondary">{isDirectory ? itemsText : ''}</p>
      </CardFooter>
    </Card>
  );
};
