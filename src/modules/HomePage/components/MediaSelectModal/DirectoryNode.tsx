import { Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/core/lib/utils';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useMediaSelectStore } from '@/stores/useMediaSelectStore';

interface DirectoryNodeProps {
  node: IFileTreeNode;
  level?: number;
}

export const DirectoryNode: React.FC<DirectoryNodeProps> = ({ node, level = 0 }) => {
  const { setSelectedTree, selectedTree } = useMediaSelectStore();
  const [expanded, setExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedTree?.path === node.path;

  const directoryChildren = node.children?.filter(({ isDirectory }) => isDirectory);

  const handleSelectDirectory = () => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
    }
    setSelectedTree(node);
  };

  return (
    <div className="ml-4">
      <div
        className={cn(
          'flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted hover:text-background',
          isSelected && 'bg-muted text-background',
        )}
        onClick={handleSelectDirectory}
      >
        {expanded ? <FolderOpen size={16} /> : <Folder size={16} />}
        <span>{node.name}</span>
      </div>
      {expanded && (
        <div className="pl-4">
          {directoryChildren?.map((child) => (
            <DirectoryNode key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
