import { last } from 'lodash';
import { useMemo } from 'react';
import { Link } from 'react-router';
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
import { useUserSettingsStore } from '@/stores/useUserStore';

interface DirectoryBreadcrumbsProps {
  pathnameDirectories: string[];
}

export const DirectoryBreadcrumbs: React.FC<DirectoryBreadcrumbsProps> = ({
  pathnameDirectories,
}) => {
  const { rootDirectoryName } = useUserSettingsStore();

  const { currentLink, hiddenElements, homeLink, prevLink } = useMemo(() => {
    const items = pathnameDirectories.reduce<{ link: string; title: string }[]>(
      (acc, path) => {
        acc.push({ link: `${last(acc)?.link}${path}/`, title: path });

        return acc;
      },
      [{ link: routerLinks.home(), title: rootDirectoryName }],
    );

    return {
      currentLink: items.pop(),
      prevLink: items.pop(),
      homeLink: items.shift(),
      hiddenElements: items,
    };
  }, [pathnameDirectories, rootDirectoryName]);

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
