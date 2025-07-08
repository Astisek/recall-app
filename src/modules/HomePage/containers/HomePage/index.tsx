import { Header } from '@/core/containers/Header';
import { ItemCard } from '@/shared/components/ItemCard';
import { ScrollArea } from '@/core/components/ui/scroll-area';

export const HomePage: React.FC = () => {
  return (
    <div className="px-10 py-5 flex flex-col gap-5 h-dvh">
      <Header />

      <ScrollArea className="flex-1 h-1">
        <div className="flex flex-wrap gap-4">
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard
            itemsCount={61}
            tagsCount={22}
            title="Playlist name Playlist name Playlist name Playlist name Playlist name Playlist name Playlist name Playlist name"
          />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
          <ItemCard itemsCount={61} tagsCount={22} title="Playlist name" />
        </div>
      </ScrollArea>

      <div className="h-2"></div>
    </div>
  );
};
