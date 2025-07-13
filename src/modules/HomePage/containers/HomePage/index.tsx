import { Header } from '@/core/containers/Header';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { FileList } from '@/modules/HomePage/components/FileList';
import { useFileTreeStore } from '@/stores/useFileTreeStore';

export const HomePage: React.FC = () => {
  const { tree } = useFileTreeStore();

  return (
    <div className="px-10 py-5 flex flex-col gap-5 h-dvh">
      <Header />

      <ScrollArea className="flex-1 h-1 ">
        <div className="flex flex-wrap gap-4 my-2">
          <FileList list={tree} />
        </div>
      </ScrollArea>

      <div className="h-2"></div>
    </div>
  );
};
