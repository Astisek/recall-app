import { Card, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { useTranslation } from 'react-i18next';
import s from './styles.module.css';
import { cn } from '@/core/lib/utils';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { parseFileTree } from '@/modules/HomePage/utils/parseFileTree';
import { CardActions } from '@/modules/HomePage/components/ItemCard/CardActions';
import { Folder, Music } from 'lucide-react';

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

  const itemsText = `${t('itemCard.tag', { count: directories })}, ${t('itemCard.item', { count: items })}`;

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
        <p className="text-secondary">{isDirectory ? itemsText : ''}</p>
      </CardFooter>

      <CardActions fileNode={treeItem} />
    </Card>
  );
};
