import { Folder, Music } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import s from './styles.module.css';
import { Card, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { CardActions } from '@/modules/HomePage/components/ItemCard/CardActions';
import { parseFileTree } from '@/modules/HomePage/utils/parseFileTree';

interface ItemCardProps {
  treeItem: IFileTreeNode;
}

export const ItemCard: React.FC<ItemCardProps> = ({ treeItem }) => {
  const { isDirectory, children = [], name } = treeItem;

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('mainPage');

  const handleOpenCard = useCallback(
    () => navigate(`${location.pathname}${name}/`),
    [location.pathname, navigate, name],
  );

  const { directories, items } = useMemo(() => parseFileTree(children), [children]);

  const itemsText = useMemo(() => {
    const textsData: string[] = [];
    if (directories) {
      textsData.push(t('itemCard.tag', { count: directories }));
    }
    if (items) {
      textsData.push(t('itemCard.item', { count: items }));
    }

    return textsData.join(', ');
  }, [directories, items, t]);

  return (
    <Card
      className={cn(
        'relative group overflow-hidden transition-shadow hover:shadow-primary justify-between',
        s.root,
        { 'cursor-pointer': isDirectory },
      )}
      onClick={isDirectory ? handleOpenCard : undefined}
    >
      <CardHeader>
        <CardTitle className="flex gap-2">
          <div className="-mt-0.5">
            {isDirectory ? <Folder className="w-5 " /> : <Music className="w-5" />}
          </div>
          <p>{name}</p>
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <p className="text-secondary">{itemsText}</p>
      </CardFooter>

      <CardActions fileNode={treeItem} />
    </Card>
  );
};
