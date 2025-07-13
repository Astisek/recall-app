import { IFileTreeNode } from '@/electron/models/fileTree';
import { ItemCard } from '@/shared/components/ItemCard';

interface FileListProps {
  list: IFileTreeNode[];
}

export const FileList: React.FC<FileListProps> = ({ list }) => {
  return (
    <>
      {list.map(({ name, isDirectory, children }) => (
        <ItemCard title={name} directoryChildren={children} isDirectory={isDirectory} />
      ))}
    </>
  );
};
