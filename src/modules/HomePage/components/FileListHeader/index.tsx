import { DirectoryActions } from '@/modules/HomePage/components/FileListHeader/DirectoryActions';
import { DirectoryBreadcrumbs } from '@/modules/HomePage/components/FileListHeader/DirectoryBreadcrumbs';

interface FileListHeaderProps {
  pathnameDirectories: string[];
}

export const FileListHeader: React.FC<FileListHeaderProps> = ({ pathnameDirectories }) => (
  <div className="flex justify-between items-center">
    <DirectoryBreadcrumbs pathnameDirectories={pathnameDirectories} />
    <DirectoryActions pathnameDirectories={pathnameDirectories} />
  </div>
);
