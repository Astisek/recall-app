import { Card, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss';
import { cn } from '@/core/lib/utils';

interface ItemCardProps {
  title: string;
  tagsCount: number;
  itemsCount: number;
}

export const ItemCard: React.FC<ItemCardProps> = ({ itemsCount, tagsCount, title }) => {
  const { t } = useTranslation('mainPage');

  const itemsText = `${t('itemCard.tag', { count: tagsCount })}, ${t('itemCard.item', { count: itemsCount })}`;

  return (
    <Card
      className={cn(
        'cursor-pointer justify-between hover:shadow-primary transition-shadow',
        s.root,
      )}
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
        <p className="text-secondary">{itemsText}</p>
      </CardFooter>
    </Card>
  );
};
