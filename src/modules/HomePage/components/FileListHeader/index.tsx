import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { routerLinks } from '@/core/data/router';
import last from 'lodash/last';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface FileListHeaderProps {
  pathnameDirectories: string[];
}

export const FileListHeader: React.FC<FileListHeaderProps> = ({ pathnameDirectories }) => {
  const { t } = useTranslation('mainPage');

  const { currentLink, hiddenElements, homeLink, prevLink } = useMemo(() => {
    const items = pathnameDirectories.reduce(
      (acc, path) => {
        acc.push({ link: `${last(acc)?.link}${path}/`, title: path });

        return acc;
      },
      [{ link: routerLinks.home(), title: t('list.root') }],
    );

    return {
      currentLink: items.pop(),
      prevLink: items.pop(),
      homeLink: items.shift(),
      hiddenElements: items,
    };
  }, [pathnameDirectories, t]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!!homeLink && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={homeLink.link}>{homeLink.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {!!hiddenElements.length && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenElements.map(({ link, title }) => (
                    <DropdownMenuItem key={link} asChild>
                      <Link to={link}>{title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {!!prevLink && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={prevLink.link}>{prevLink.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {!!currentLink && (
          <BreadcrumbItem>
            <BreadcrumbPage>{currentLink.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
