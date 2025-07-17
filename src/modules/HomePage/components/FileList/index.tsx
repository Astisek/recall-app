import { IFileTreeNode } from '@/electron/models/fileTree';
import { ItemCard } from '@/modules/HomePage/components/ItemCard';

interface FileListProps {
  list: IFileTreeNode[];
}

export const FileList: React.FC<FileListProps> = ({ list }) => (
  <div className="grid grid-cols-4 gap-4 my-2 mx-1">
    {list.map((treeItem) => (
      <ItemCard treeItem={treeItem} key={treeItem.path} />
    ))}
  </div>
);
