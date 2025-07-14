import { IFileTreeNode } from '@/electron/models/fileTree';
import { ItemCard } from '@/shared/components/ItemCard';

interface FileListProps {
  list: IFileTreeNode[];
}

export const FileList: React.FC<FileListProps> = ({ list }) => {
  return (
    <div className="grid grid-cols-4 gap-4 my-2 mx-1">
      {list.map(({ name, isDirectory, children, path }) => (
        <ItemCard title={name} directoryChildren={children} isDirectory={isDirectory} key={path} />
      ))}
    </div>
  );
};
